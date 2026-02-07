import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to sanitize inputs before forwarding
function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize string by trimming and limiting length
function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format (basic check - allows common formats)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+()]{7,20}$/;
  return phoneRegex.test(phone);
}

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

    const rawData = await req.json();

    // Validate required fields
    if (!rawData.full_name || !rawData.email || !rawData.phone) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields: full_name, email, and phone are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Sanitize and validate email
    const email = sanitizeString(rawData.email, 255);
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Sanitize and validate phone
    const phone = sanitizeString(rawData.phone, 20);
    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid phone format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Sanitize all input fields with appropriate length limits
    const sanitizedData = {
      full_name: escapeHtml(sanitizeString(rawData.full_name, 100)),
      email: email, // Already validated, no HTML escaping needed for email
      phone: phone,
      city_state: escapeHtml(sanitizeString(rawData.city_state, 100)),
      current_status: escapeHtml(sanitizeString(rawData.current_status, 50)),
      education_background: escapeHtml(sanitizeString(rawData.education_background, 500)),
      social_profile: sanitizeString(rawData.social_profile, 500), // URL, no HTML escape
      resume_link: sanitizeString(rawData.resume_link, 500), // URL, no HTML escape
      preferred_tracks: escapeHtml(sanitizeString(rawData.preferred_tracks, 500)),
      track_interest_reason: escapeHtml(sanitizeString(rawData.track_interest_reason, 1000)),
      business_perspective: escapeHtml(sanitizeString(rawData.business_perspective, 1000)),
      learning_goals: escapeHtml(sanitizeString(rawData.learning_goals, 500)),
      unpaid_comfort: escapeHtml(sanitizeString(rawData.unpaid_comfort, 10)),
      curiosity_proof: escapeHtml(sanitizeString(rawData.curiosity_proof, 1000)),
      hours_per_week: escapeHtml(sanitizeString(rawData.hours_per_week, 20)),
      additional_notes: escapeHtml(sanitizeString(rawData.additional_notes, 1000)),
      declaration_mentorship: rawData.declaration_mentorship === "Yes" ? "Yes" : "No",
      declaration_voluntary: rawData.declaration_voluntary === "Yes" ? "Yes" : "No",
      declaration_genuine: rawData.declaration_genuine === "Yes" ? "Yes" : "No",
      submitted_at: new Date().toISOString(),
    };

    console.log("Received validated fellowship application:", sanitizedData.email);

    // Forward to Power Automate
    const response = await fetch(POWER_AUTOMATE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedData),
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
        JSON.stringify({ success: false, message: "Failed to submit application" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in submit-fellowship:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
