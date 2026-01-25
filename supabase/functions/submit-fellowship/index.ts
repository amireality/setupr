import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const POWER_AUTOMATE_WEBHOOK_URL = "https://default3eadbd7f1fe143198a39f6b70f729b.76.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/8d7074f85691414cb9ed550f0e7fd4c3/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WBpnjHNMI45UU-d8D7Fk7NiFWIWFCfdZ88MSDQVCe3U";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
