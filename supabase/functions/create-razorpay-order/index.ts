import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub;

    const { companyName, gstin, billingAddress, phone } = await req.json();

    // Fetch cart items
    const { data: cartItems, error: cartError } = await supabase
      .from("store_cart_items")
      .select(`
        *,
        product:store_products!product_id(id, name, base_price_inr),
        plan:store_product_plans!plan_id(id, plan_name, price_inr)
      `)
      .eq("user_id", userId);

    if (cartError) throw cartError;
    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum: number, item: any) => {
      const price = item.plan?.price_inr ?? item.product?.base_price_inr ?? 0;
      return sum + Number(price) * item.quantity;
    }, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    // Create order in DB using service role to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order, error: orderError } = await supabaseAdmin
      .from("store_orders")
      .insert({
        user_id: userId,
        order_number: "TEMP", // trigger will generate
        subtotal_inr: subtotal,
        tax_inr: tax,
        total_inr: total,
        company_name: companyName || null,
        gstin: gstin || null,
        billing_address: billingAddress || null,
        status: "pending",
        payment_provider: "razorpay",
        payment_status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      plan_id: item.plan_id,
      product_name: item.product?.name || "Unknown",
      quantity: item.quantity,
      unit_price_inr: Number(item.plan?.price_inr ?? item.product?.base_price_inr ?? 0),
      total_inr: Number(item.plan?.price_inr ?? item.product?.base_price_inr ?? 0) * item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("store_order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Create Razorpay order
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${razorpayKeyId}:${razorpayKeySecret}`),
      },
      body: JSON.stringify({
        amount: total * 100, // paise
        currency: "INR",
        receipt: order.order_number,
        notes: {
          order_id: order.id,
          user_id: userId,
        },
      }),
    });

    const razorpayOrder = await razorpayRes.json();

    if (!razorpayRes.ok) {
      console.error("Razorpay error:", razorpayOrder);
      throw new Error("Failed to create Razorpay order");
    }

    // Update our order with Razorpay order ID
    await supabaseAdmin
      .from("store_orders")
      .update({ payment_id: razorpayOrder.id })
      .eq("id", order.id);

    // Get user email for prefill
    const { data: userData } = await supabase.auth.getUser();

    return new Response(
      JSON.stringify({
        razorpayOrderId: razorpayOrder.id,
        amount: total * 100,
        currency: "INR",
        orderId: order.id,
        orderNumber: order.order_number,
        keyId: razorpayKeyId,
        prefill: {
          email: userData?.user?.email || "",
          contact: phone || "",
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
