import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { renderEmail, escapeHtml, htmlToText } from "../_shared/email-template.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CustomEmailRequest {
  to: string;
  subject: string;
  heading: string;
  bodyHtml: string; // sanitized rich-text from the composer
  ctaLabel?: string;
  ctaUrl?: string;
  templateType?: string;
  testMode?: boolean; // if true, sends to admin only
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Allow only a small set of safe HTML tags from the composer
function sanitizeHtml(input: string): string {
  if (!input) return "";
  // Strip script/style/iframe and event handlers
  let s = input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
  return s;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify caller is authenticated admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Invalid auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as CustomEmailRequest;

    if (!body.to || !body.subject || !body.heading || !body.bodyHtml) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@setupr.com";
    const recipient = body.testMode ? adminEmail : body.to.trim();

    if (!isValidEmail(recipient)) {
      return new Response(JSON.stringify({ error: "Invalid recipient email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.subject.length > 200 || body.heading.length > 200 || body.bodyHtml.length > 50000) {
      return new Response(JSON.stringify({ error: "Field too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.ctaUrl && !/^https?:\/\//i.test(body.ctaUrl)) {
      return new Response(JSON.stringify({ error: "CTA URL must be http/https" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sanitizedBody = sanitizeHtml(body.bodyHtml);
    const subject = body.testMode ? `[TEST] ${body.subject}` : body.subject;

    const html = renderEmail({
      preheader: body.subject,
      heading: body.heading,
      bodyHtml: sanitizedBody,
      ctaLabel: body.ctaLabel,
      ctaUrl: body.ctaUrl,
    });

    const fromEmail = Deno.env.get("FROM_EMAIL") || "noreply@setupr.com";
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Setupr <${fromEmail}>`,
        to: [recipient],
        subject,
        html,
        text: htmlToText(sanitizedBody),
      }),
    });

    const result = await resp.json();
    const success = resp.ok;

    // Log
    await supabase.from("email_log").insert({
      recipient,
      subject,
      body_preview: htmlToText(sanitizedBody).slice(0, 500),
      template_type: body.templateType || "custom",
      status: success ? "sent" : "failed",
      error_message: success ? null : JSON.stringify(result).slice(0, 500),
      sent_by: userData.user.id,
    });

    if (!success) {
      console.error("Resend error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("send-custom-email error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
