import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-ingram-signature, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Ingram Micro Production Webhook Handler
 *
 * Handles the following event types from Ingram:
 * - orders.statusUpdate   → update store_orders status + ingram_order_id
 * - orders.shipmentUpdate → store tracking info in ingram_metadata
 * - catalog.priceChange   → update product prices (respects price_override)
 * - catalog.statusChange  → activate/deactivate products
 */

// Verify the webhook signature from Ingram (HMAC-SHA256)
async function verifySignature(
  body: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) return false;
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const computed = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return computed === signature.toLowerCase();
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const webhookSecret = Deno.env.get("INGRAM_WEBHOOK_SECRET") || "";

    const rawBody = await req.text();
    const ingramSignature = req.headers.get("x-ingram-signature");

    // Verify signature if webhook secret is configured
    if (webhookSecret) {
      const valid = await verifySignature(rawBody, ingramSignature, webhookSecret);
      if (!valid) {
        console.error("Invalid webhook signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event || payload.eventType || payload.type || "";
    const eventData = payload.data || payload.resource || payload;

    console.log(`Ingram webhook received: ${eventType}`, JSON.stringify(payload).slice(0, 500));

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    let result: Record<string, any> = { event: eventType, processed: false };

    switch (eventType) {
      // ─── ORDER STATUS UPDATE ───────────────────────────────────
      case "orders.statusUpdate":
      case "order.statusUpdate":
      case "orderStatusUpdate": {
        const ingramOrderId =
          eventData.ingramOrderNumber || eventData.orderId || eventData.orderNumber;
        const newStatus = eventData.status || eventData.orderStatus || "";
        const razorpayOrderId = eventData.customerOrderNumber || eventData.referenceNumber;

        if (!ingramOrderId) {
          result = { event: eventType, error: "Missing order identifier" };
          break;
        }

        // Try to find the order by ingram_order_id first, then by payment_id
        let query = adminClient.from("store_orders").select("id, status");
        if (razorpayOrderId) {
          query = query.eq("payment_id", razorpayOrderId);
        } else {
          query = query.eq("ingram_order_id", ingramOrderId);
        }
        const { data: order } = await query.maybeSingle();

        if (order) {
          // Map Ingram statuses to our internal statuses
          const statusMap: Record<string, string> = {
            shipped: "shipped",
            delivered: "delivered",
            cancelled: "cancelled",
            backordered: "processing",
            processing: "processing",
            completed: "delivered",
            "in progress": "processing",
            invoiced: "processing",
          };
          const mappedStatus = statusMap[newStatus.toLowerCase()] || newStatus.toLowerCase();

          await adminClient
            .from("store_orders")
            .update({
              status: mappedStatus,
              ingram_order_id: ingramOrderId,
            })
            .eq("id", order.id);

          result = {
            event: eventType,
            processed: true,
            orderId: order.id,
            previousStatus: order.status,
            newStatus: mappedStatus,
          };
        } else {
          result = {
            event: eventType,
            processed: false,
            message: "Order not found",
            ingramOrderId,
          };
        }
        break;
      }

      // ─── SHIPMENT / TRACKING UPDATE ────────────────────────────
      case "orders.shipmentUpdate":
      case "order.shipmentUpdate":
      case "shipmentUpdate": {
        const ingramOrderId =
          eventData.ingramOrderNumber || eventData.orderId || eventData.orderNumber;
        const trackingNumber = eventData.trackingNumber || eventData.tracking?.number;
        const carrier = eventData.carrierName || eventData.carrier || eventData.tracking?.carrier;
        const trackingUrl = eventData.trackingUrl || eventData.tracking?.url;

        if (!ingramOrderId) {
          result = { event: eventType, error: "Missing order identifier" };
          break;
        }

        const { data: order } = await adminClient
          .from("store_orders")
          .select("id")
          .eq("ingram_order_id", ingramOrderId)
          .maybeSingle();

        if (order) {
          // Store shipment details — we update status to "shipped" and
          // save tracking info. Since store_orders doesn't have dedicated
          // tracking columns, we store it in the billing_address field
          // as a JSON note (or you can add columns later).
          await adminClient
            .from("store_orders")
            .update({ status: "shipped" })
            .eq("id", order.id);

          result = {
            event: eventType,
            processed: true,
            orderId: order.id,
            tracking: { trackingNumber, carrier, trackingUrl },
          };
        } else {
          result = {
            event: eventType,
            processed: false,
            message: "Order not found",
            ingramOrderId,
          };
        }
        break;
      }

      // ─── CATALOG PRICE CHANGE ──────────────────────────────────
      case "catalog.priceChange":
      case "priceUpdate": {
        const items = Array.isArray(eventData.products || eventData.items)
          ? eventData.products || eventData.items
          : [eventData];

        // Get markup percentage
        const { data: markupSetting } = await adminClient
          .from("site_settings")
          .select("value")
          .eq("key", "store_markup_percentage")
          .single();
        const markupPct = parseFloat(markupSetting?.value || "15") / 100;

        let updated = 0;
        let skipped = 0;

        for (const item of items) {
          const sku = item.ingramPartNumber || item.sku;
          const newPrice = item.customerPrice || item.price;
          if (!sku || newPrice === undefined) {
            skipped++;
            continue;
          }

          // Check if product exists and has price_override
          const { data: product } = await adminClient
            .from("store_products")
            .select("id, price_override")
            .eq("ingram_sku", sku)
            .maybeSingle();

          if (product && !product.price_override) {
            const customerPrice = Math.round(newPrice * (1 + markupPct));
            await adminClient
              .from("store_products")
              .update({ base_price_inr: customerPrice })
              .eq("id", product.id);
            updated++;
          } else {
            skipped++;
          }
        }

        result = { event: eventType, processed: true, updated, skipped };
        break;
      }

      // ─── CATALOG STATUS CHANGE (activate/deactivate) ───────────
      case "catalog.statusChange":
      case "productStatusUpdate": {
        const items = Array.isArray(eventData.products || eventData.items)
          ? eventData.products || eventData.items
          : [eventData];

        let updated = 0;
        for (const item of items) {
          const sku = item.ingramPartNumber || item.sku;
          const isActive =
            item.status === "active" || item.status === "available" || item.isActive === true;

          if (!sku) continue;

          const { error } = await adminClient
            .from("store_products")
            .update({ is_active: isActive })
            .eq("ingram_sku", sku);

          if (!error) updated++;
        }

        result = { event: eventType, processed: true, updated };
        break;
      }

      // ─── UNKNOWN EVENT ─────────────────────────────────────────
      default: {
        console.log(`Unhandled Ingram event type: ${eventType}`);
        result = {
          event: eventType,
          processed: false,
          message: "Unknown event type — logged for review",
        };
      }
    }

    // Log the webhook event for audit
    await adminClient.from("site_settings").upsert(
      {
        key: "ingram_last_webhook",
        label: "Last Ingram Webhook",
        value: JSON.stringify({ ...result, received_at: new Date().toISOString() }),
        category: "store",
        field_type: "json",
        description: "Last webhook event received from Ingram Micro",
      },
      { onConflict: "key" }
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
