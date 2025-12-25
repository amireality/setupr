import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const adminEmail = Deno.env.get("ADMIN_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubmissionNotification {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  currentStage: string;
  workTypes: string[];
  selectedServices: string[];
  existingSetup: string[];
  timeline: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const submission: SubmissionNotification = await req.json();
    
    console.log("Received submission notification request:", submission);

    if (!adminEmail) {
      console.error("ADMIN_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: "Admin email not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Resend API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a2e;">New Business Setup Request</h1>
        
        <h2 style="color: #4a4a68; border-bottom: 1px solid #eee; padding-bottom: 8px;">Contact Details</h2>
        <p><strong>Name:</strong> ${submission.fullName}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Phone:</strong> ${submission.phone}</p>
        <p><strong>City:</strong> ${submission.city}</p>
        
        <h2 style="color: #4a4a68; border-bottom: 1px solid #eee; padding-bottom: 8px;">Business Information</h2>
        <p><strong>Current Stage:</strong> ${submission.currentStage}</p>
        <p><strong>Work Types:</strong> ${submission.workTypes.join(", ") || "Not specified"}</p>
        <p><strong>Selected Services:</strong> ${submission.selectedServices.join(", ") || "None"}</p>
        <p><strong>Existing Setup:</strong> ${submission.existingSetup.join(", ") || "None"}</p>
        <p><strong>Timeline:</strong> ${submission.timeline}</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">This is an automated notification from your Business Setup Platform.</p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Business Setup <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Business Setup Request from ${submission.fullName}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-admin function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
