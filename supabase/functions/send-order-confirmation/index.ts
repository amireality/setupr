import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";
import { renderEmail, htmlToText } from "../_shared/email-template.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require service role authentication — internal use only
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!token || token !== serviceKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { orderId } = await req.json();
    if (!orderId) {
      return new Response(JSON.stringify({ error: "Missing orderId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);

    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from("store_orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("Order fetch error:", orderError);
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch authoritative recipient email from auth.users (never trust caller-provided email)
    const { data: userData, error: userErr } = await supabase.auth.admin.getUserById(order.user_id);
    if (userErr || !userData?.user?.email) {
      console.error("Failed to resolve user email:", userErr);
      return new Response(JSON.stringify({ error: "User email not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userEmail = userData.user.email;

    // Fetch order items
    const { data: items } = await supabase
      .from("store_order_items")
      .select("*")
      .eq("order_id", orderId);

    const orderItems = items || [];

    // Build items HTML
    const itemsHtml = orderItems
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151;">${escapeHtml(item.product_name)}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: right;">₹${formatCurrency(Number(item.unit_price_inr))}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: right;">₹${formatCurrency(Number(item.total_inr))}</td>
        </tr>`
      )
      .join("");

    const innerBody = `
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:18px; text-align:center; margin-bottom:20px;">
        <div style="font-size:32px; line-height:1; margin-bottom:6px;">✅</div>
        <h2 style="font-size:18px; font-weight:600; color:#166534; margin:0 0 4px 0;">Payment Successful</h2>
        <p style="font-size:13px; color:#15803d; margin:0;">Order <strong>${escapeHtml(order.order_number)}</strong> has been confirmed.</p>
      </div>

      <div style="background:#f9fafb; border-radius:10px; padding:16px 18px; margin-bottom:18px;">
        <h3 style="font-size:14px; font-weight:600; color:#111827; margin:0 0 10px 0;">Order Details</h3>
        <table style="width:100%; font-size:13px; color:#6b7280;">
          <tr><td style="padding:3px 0;">Order Number</td><td style="text-align:right; font-weight:600; color:#111827;">${escapeHtml(order.order_number)}</td></tr>
          <tr><td style="padding:3px 0;">Date</td><td style="text-align:right;">${new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
          ${order.company_name ? `<tr><td style="padding:3px 0;">Company</td><td style="text-align:right;">${escapeHtml(order.company_name)}</td></tr>` : ""}
          ${order.gstin ? `<tr><td style="padding:3px 0;">GSTIN</td><td style="text-align:right;">${escapeHtml(order.gstin)}</td></tr>` : ""}
        </table>
      </div>

      <table style="width:100%; border-collapse:collapse; margin-bottom:18px;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="padding:10px 12px; text-align:left; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase;">Item</th>
            <th style="padding:10px 12px; text-align:center; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase;">Qty</th>
            <th style="padding:10px 12px; text-align:right; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase;">Price</th>
            <th style="padding:10px 12px; text-align:right; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase;">Total</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <div style="background:#f9fafb; border-radius:10px; padding:14px 18px;">
        <table style="width:100%; font-size:14px;">
          <tr><td style="padding:3px 0; color:#6b7280;">Subtotal</td><td style="text-align:right; color:#374151;">₹${formatCurrency(Number(order.subtotal_inr))}</td></tr>
          <tr><td style="padding:3px 0; color:#6b7280;">GST (18%)</td><td style="text-align:right; color:#374151;">₹${formatCurrency(Number(order.tax_inr))}</td></tr>
          <tr><td style="padding:8px 0 0; font-weight:700; font-size:17px; color:#111827; border-top:2px solid #e5e7eb;">Total</td><td style="text-align:right; padding:8px 0 0; font-weight:700; font-size:17px; color:#111827; border-top:2px solid #e5e7eb;">₹${formatCurrency(Number(order.total_inr))}</td></tr>
        </table>
      </div>
    `;

    const emailHtml = renderEmail({
      preheader: `Order ${order.order_number} confirmed`,
      heading: "Your order is confirmed",
      bodyHtml: innerBody,
      ctaLabel: "View your dashboard",
      ctaUrl: "https://setupr.com/store/dashboard",
    });

    // Send emails
    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
    const fromEmail = Deno.env.get("FROM_EMAIL") || "noreply@setupr.com";
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@setupr.com";

    // Customer email
    await resend.emails.send({
      from: `Setupr Store <${fromEmail}>`,
      to: [userEmail],
      subject: `Order Confirmed | ${order.order_number}`,
      html: emailHtml,
      text: htmlToText(emailHtml),
    });

    // Admin notification (branded)
    const adminHtml = renderEmail({
      preheader: `New order ${order.order_number}`,
      heading: "New order received",
      bodyHtml: `
        <p><strong>Order:</strong> ${escapeHtml(order.order_number)}</p>
        <p><strong>Customer:</strong> ${escapeHtml(userEmail)}</p>
        <p><strong>Company:</strong> ${escapeHtml(order.company_name || "N/A")}</p>
        <p><strong>Total:</strong> ₹${formatCurrency(Number(order.total_inr))}</p>
        <p><strong>Items:</strong> ${orderItems.map((i: any) => escapeHtml(i.product_name)).join(", ")}</p>
      `,
    });
    await resend.emails.send({
      from: `Setupr Store <${fromEmail}>`,
      to: [adminEmail],
      subject: `New Order: ${order.order_number} | ₹${formatCurrency(Number(order.total_inr))}`,
      html: adminHtml,
      text: htmlToText(adminHtml),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending order confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
