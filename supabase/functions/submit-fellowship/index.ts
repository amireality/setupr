import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get webhook URL from environment secret
    const POWER_AUTOMATE_WEBHOOK_URL = Deno.env.get("POWER_AUTOMATE_WEBHOOK_URL");
    
    if (!POWER_AUTOMATE_WEBHOOK_URL) {
      console.error("POWER_AUTOMATE_WEBHOOK_URL not configured");
      return new Response(
        JSON.stringify({ success: false, message: "Webhook not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const formData = await req.json();
    console.log("Received fellowship application:", formData.email);

    // Forward to Power Automate
    const response = await fetch(POWER_AUTOMATE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Power Automate response status:", response.status);

    // Check if Power Automate accepted the request
    if (response.ok || response.status === 202) {
      console.log("Successfully sent to Power Automate");
      return new Response(
        JSON.stringify({ success: true, message: "Application submitted successfully" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    } else {
      const errorText = await response.text();
      console.error("Power Automate error:", response.status, errorText);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to submit to Power Automate", error: errorText }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in submit-fellowship:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error", error: String(error) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
