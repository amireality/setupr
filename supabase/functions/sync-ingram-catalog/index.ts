import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

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
    // Verify admin role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify user is admin
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: hasRole } = await adminClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (!hasRole) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Ingram Micro API credentials
    const ingramApiKey = Deno.env.get("INGRAM_API_KEY");
    const ingramApiSecret = Deno.env.get("INGRAM_API_SECRET");
    const ingramCustomerNumber = Deno.env.get("INGRAM_CUSTOMER_NUMBER");
    const ingramBaseUrl = Deno.env.get("INGRAM_SANDBOX_URL") || "https://api.ingrammicro.com";

    if (!ingramApiKey || !ingramApiSecret || !ingramCustomerNumber) {
      return new Response(
        JSON.stringify({
          error: "Ingram Micro API credentials not configured",
          details: "Please add INGRAM_API_KEY, INGRAM_API_SECRET, and INGRAM_CUSTOMER_NUMBER secrets",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Step 1: Get access token
    const tokenResponse = await fetch(`${ingramBaseUrl}/oauth/oauth20/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: ingramApiKey,
        client_secret: ingramApiSecret,
      }),
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      return new Response(
        JSON.stringify({ error: "Failed to authenticate with Ingram Micro", details: tokenError }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { access_token } = await tokenResponse.json();

    // Step 2: Fetch product catalog
    const catalogResponse = await fetch(
      `${ingramBaseUrl}/resellers/v6/catalog?pageSize=100&customerNumber=${ingramCustomerNumber}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "IM-CustomerNumber": ingramCustomerNumber,
          "IM-CorrelationID": crypto.randomUUID(),
          "IM-CountryCode": "IN",
          Accept: "application/json",
        },
      }
    );

    if (!catalogResponse.ok) {
      const catalogError = await catalogResponse.text();
      return new Response(
        JSON.stringify({ error: "Failed to fetch Ingram catalog", details: catalogError }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const catalogData = await catalogResponse.json();
    const products = catalogData.catalog || catalogData.products || [];

    let synced = 0;
    let skipped = 0;

    for (const item of products) {
      const sku = item.ingramPartNumber || item.sku || "";
      if (!sku) {
        skipped++;
        continue;
      }

      const slug = sku.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const { error: upsertError } = await adminClient
        .from("store_products")
        .upsert(
          {
            ingram_sku: sku,
            slug,
            name: item.description || item.productName || sku,
            short_description: item.productDescription || item.description || "",
            vendor: item.vendorName || item.vendor || "Unknown",
            base_price_inr: item.customerPrice || item.price || 0,
            billing_cycle: item.billingPeriod || "one-time",
            product_type: item.productType === "physical" ? "physical" : "subscription",
            ingram_metadata: item,
            is_active: true,
          },
          { onConflict: "slug" }
        );

      if (upsertError) {
        console.error(`Failed to upsert ${sku}:`, upsertError);
        skipped++;
      } else {
        synced++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total: products.length,
        synced,
        skipped,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
