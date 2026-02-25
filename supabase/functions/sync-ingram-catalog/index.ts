import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Vendor logo mapping
const VENDOR_LOGOS: Record<string, string> = {
  microsoft: "https://logo.clearbit.com/microsoft.com",
  google: "https://logo.clearbit.com/google.com",
  adobe: "https://logo.clearbit.com/adobe.com",
  amazon: "https://logo.clearbit.com/aws.amazon.com",
  aws: "https://logo.clearbit.com/aws.amazon.com",
  zoho: "https://logo.clearbit.com/zoho.com",
  dropbox: "https://logo.clearbit.com/dropbox.com",
  slack: "https://logo.clearbit.com/slack.com",
  salesforce: "https://logo.clearbit.com/salesforce.com",
  hubspot: "https://logo.clearbit.com/hubspot.com",
  atlassian: "https://logo.clearbit.com/atlassian.com",
  oracle: "https://logo.clearbit.com/oracle.com",
  cisco: "https://logo.clearbit.com/cisco.com",
  dell: "https://logo.clearbit.com/dell.com",
  hp: "https://logo.clearbit.com/hp.com",
  lenovo: "https://logo.clearbit.com/lenovo.com",
  autodesk: "https://logo.clearbit.com/autodesk.com",
  freshworks: "https://logo.clearbit.com/freshworks.com",
  cloudflare: "https://logo.clearbit.com/cloudflare.com",
  vmware: "https://logo.clearbit.com/vmware.com",
  fortinet: "https://logo.clearbit.com/fortinet.com",
  crowdstrike: "https://logo.clearbit.com/crowdstrike.com",
  intuit: "https://logo.clearbit.com/intuit.com",
  sap: "https://logo.clearbit.com/sap.com",
  ibm: "https://logo.clearbit.com/ibm.com",
  paloaltonetworks: "https://logo.clearbit.com/paloaltonetworks.com",
};

function getVendorLogo(vendor: string): string | null {
  const key = vendor.toLowerCase().replace(/\s+/g, "");
  return VENDOR_LOGOS[key] || null;
}

// Category auto-assignment based on vendor/product keywords
function guessCategory(
  vendor: string,
  productName: string,
  productType: string,
  categoryMap: Record<string, string>
): string | null {
  const v = vendor.toLowerCase();
  const n = productName.toLowerCase();

  if (productType === "physical") return categoryMap["hardware"] || null;
  if (["crowdstrike", "fortinet", "paloaltonetworks"].some((k) => v.includes(k)) || n.includes("security") || n.includes("defender"))
    return categoryMap["security"] || null;
  if (["aws", "amazon", "cloudflare", "vmware"].some((k) => v.includes(k)) || n.includes("cloud") || n.includes("hosting"))
    return categoryMap["cloud-infrastructure"] || null;
  if (["adobe", "autodesk"].some((k) => v.includes(k)) || n.includes("creative"))
    return categoryMap["creative-tools"] || null;
  // Default to productivity
  return categoryMap["productivity"] || null;
}

// Extract product image URL from Ingram API response
function extractProductImage(item: any): string | null {
  // Check links array for image type
  if (item.links && Array.isArray(item.links)) {
    const imageLink = item.links.find((l: any) =>
      l.type === "image" || l.type === "productImage" || l.topic === "image"
    );
    if (imageLink?.href || imageLink?.uri) return imageLink.href || imageLink.uri;
  }
  // Direct image fields
  if (item.productImage) return item.productImage;
  if (item.imageUrl) return item.imageUrl;
  if (item.productImageUrl) return item.productImageUrl;
  // Check extraDescription for image URLs
  if (item.extraDescription && typeof item.extraDescription === "string") {
    const match = item.extraDescription.match(/https?:\/\/[^\s"']+\.(jpg|jpeg|png|webp|svg)/i);
    if (match) return match[0];
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: hasRole } = await adminClient.rpc("has_role", { _user_id: user.id, _role: "admin" });
    if (!hasRole) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body for options
    let dryRun = false;
    try {
      const body = await req.json();
      dryRun = body?.dry_run === true;
    } catch { /* no body is fine */ }

    // Ingram Micro API credentials
    const ingramApiKey = Deno.env.get("INGRAM_API_KEY");
    const ingramApiSecret = Deno.env.get("INGRAM_API_SECRET");
    const ingramCustomerNumber = Deno.env.get("INGRAM_CUSTOMER_NUMBER");
    const ingramBaseUrl = Deno.env.get("INGRAM_SANDBOX_URL") || "https://api.ingrammicro.com";

    if (!ingramApiKey || !ingramApiSecret || !ingramCustomerNumber) {
      return new Response(
        JSON.stringify({ error: "Ingram Micro API credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get markup percentage from site_settings
    const { data: markupSetting } = await adminClient
      .from("site_settings")
      .select("value")
      .eq("key", "store_markup_percentage")
      .single();
    const markupPct = parseFloat(markupSetting?.value || "15") / 100;

    // Load category slug->id map
    const { data: cats } = await adminClient.from("store_categories").select("id, slug");
    const categoryMap: Record<string, string> = {};
    for (const c of cats || []) categoryMap[c.slug] = c.id;

    // Step 1: Get access token
    const tokenResponse = await fetch(`${ingramBaseUrl}/oauth/oauth20/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

    // Step 2: Fetch product catalog with pagination
    let allProducts: any[] = [];
    let page = 1;
    const pageSize = 100;
    let hasMore = true;

    while (hasMore) {
      const catalogResponse = await fetch(
        `${ingramBaseUrl}/resellers/v6/catalog?pageSize=${pageSize}&pageNumber=${page}&customerNumber=${ingramCustomerNumber}`,
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
        // If first page fails, return error; otherwise break
        if (page === 1) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch Ingram catalog", details: catalogError }),
            { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        break;
      }

      const catalogData = await catalogResponse.json();
      const products = catalogData.catalog || catalogData.products || [];
      allProducts = allProducts.concat(products);

      // Check if there are more pages
      const totalRecords = catalogData.recordsFound || catalogData.totalCount || 0;
      hasMore = allProducts.length < totalRecords && products.length === pageSize;
      page++;

      // Safety: max 20 pages (2000 products)
      if (page > 20) break;
    }

    // If dry run, return preview without writing
    if (dryRun) {
      const preview = allProducts.slice(0, 50).map((item: any) => ({
        sku: item.ingramPartNumber || item.sku || "",
        name: item.description || item.productName || "",
        vendor: item.vendorName || item.vendor || "Unknown",
        price: item.customerPrice || item.price || 0,
        markedUpPrice: Math.round((item.customerPrice || item.price || 0) * (1 + markupPct)),
        type: item.productType === "physical" ? "physical" : "subscription",
      }));

      return new Response(
        JSON.stringify({ dry_run: true, total: allProducts.length, preview }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 3: Upsert products
    let synced = 0;
    let skipped = 0;

    for (const item of allProducts) {
      const sku = item.ingramPartNumber || item.sku || "";
      if (!sku) { skipped++; continue; }

      const slug = sku.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const vendor = item.vendorName || item.vendor || "Unknown";
      const productType = item.productType === "physical" ? "physical" : "subscription";
      const productName = item.description || item.productName || sku;
      const ingramPrice = item.customerPrice || item.price || 0;
      const customerPrice = Math.round(ingramPrice * (1 + markupPct));

      // Check if product exists and has price_override
      const { data: existing } = await adminClient
        .from("store_products")
        .select("id, price_override")
        .eq("ingram_sku", sku)
        .maybeSingle();

      const upsertData: Record<string, any> = {
        ingram_sku: sku,
        slug,
        name: productName,
        short_description: item.productDescription || item.description || "",
        vendor,
        vendor_logo_url: getVendorLogo(vendor),
        billing_cycle: item.billingPeriod || "one-time",
        product_type: productType,
        category_id: guessCategory(vendor, productName, productType, categoryMap),
        ingram_metadata: item,
        is_active: true,
      };

      // Extract product image from Ingram API response
      const imageUrl = extractProductImage(item);
      if (imageUrl) {
        upsertData.featured_image_url = imageUrl;
      }

      // Only update price if not manually overridden
      if (!existing?.price_override) {
        upsertData.base_price_inr = customerPrice;
      }

      const { error: upsertError } = await adminClient
        .from("store_products")
        .upsert(upsertData, { onConflict: "slug" });

      if (upsertError) {
        console.error(`Failed to upsert ${sku}:`, upsertError);
        skipped++;
      } else {
        synced++;
      }
    }

    const result = {
      success: true,
      total: allProducts.length,
      synced,
      skipped,
      markup_percentage: Math.round(markupPct * 100),
      synced_at: new Date().toISOString(),
    };

    // Save last sync result to site_settings
    await adminClient.from("site_settings").upsert(
      {
        key: "store_last_sync",
        label: "Last Store Sync",
        value: JSON.stringify(result),
        category: "store",
        field_type: "json",
        description: "Last Ingram Micro sync result",
      },
      { onConflict: "key" }
    );

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
