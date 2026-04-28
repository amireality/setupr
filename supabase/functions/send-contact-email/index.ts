import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { renderEmail, escapeHtml, htmlToText } from "../_shared/email-template.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, message }: ContactFormRequest = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (firstName.length > 100 || lastName.length > 100 || email.length > 255 || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Input exceeds maximum length" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const safeFirstName = escapeHtml(firstName.trim());
    const safeLastName = escapeHtml(lastName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml((phone || "Not provided").trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    const fromEmail = Deno.env.get("FROM_EMAIL") || "noreply@setupr.com";
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@setupr.com";

    // Admin notification (branded)
    const adminHtml = renderEmail({
      preheader: `New contact form submission from ${safeFirstName} ${safeLastName}`,
      heading: "New contact form submission",
      bodyHtml: `
        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#f97316; text-decoration:none;">${safeEmail}</a></p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p style="margin-top:18px;"><strong>Message:</strong></p>
        <p style="background:#f9fafb; padding:14px 16px; border-radius:8px; white-space:pre-wrap;">${safeMessage}</p>
      `,
    });

    await resend.emails.send({
      from: `Setupr Contact <${fromEmail}>`,
      to: [adminEmail],
      subject: `New Contact Form Submission from ${safeFirstName} ${safeLastName}`,
      html: adminHtml,
      text: htmlToText(adminHtml),
    });

    // User auto-reply (branded)
    const userHtml = renderEmail({
      preheader: "Thanks for reaching out to Setupr",
      heading: `Thanks for getting in touch, ${safeFirstName}.`,
      bodyHtml: `
        <p>We have received your message and will get back to you within 24 to 48 hours.</p>
        <p style="margin-top:14px;"><strong>Your message:</strong></p>
        <p style="background:#f9fafb; padding:14px 16px; border-radius:8px; white-space:pre-wrap;">${safeMessage}</p>
        <p style="margin-top:14px;">In the meantime, you can browse our services or read our latest articles.</p>
      `,
      ctaLabel: "Browse services",
      ctaUrl: "https://setupr.com/services",
    });

    await resend.emails.send({
      from: `Setupr <${fromEmail}>`,
      to: [email],
      subject: "We received your message. Setupr.",
      html: userHtml,
      text: htmlToText(userHtml),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
