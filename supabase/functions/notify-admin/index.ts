import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const adminEmail = Deno.env.get("ADMIN_EMAIL");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Rate limiting: max submissions per email within time window
const RATE_LIMIT_WINDOW_MINUTES = 60;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// Allowed origins for CORS
const allowedOrigins = [
  "https://setupr.com",
  "https://www.setupr.com",
  "http://localhost:5173",
  "http://localhost:8080",
];

// Check if origin is from Lovable preview
function isLovablePreview(origin: string): boolean {
  return origin.includes(".lovableproject.com") || origin.includes(".lovable.app");
}

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin) || isLovablePreview(origin);
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

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

// Input validation
function validateSubmission(data: unknown): { valid: boolean; error?: string; submission?: SubmissionNotification } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const submission = data as Record<string, unknown>;

  // Required string fields
  const requiredStrings = ['fullName', 'email', 'phone', 'city', 'currentStage', 'timeline'];
  for (const field of requiredStrings) {
    if (typeof submission[field] !== 'string' || submission[field].length === 0) {
      return { valid: false, error: `Missing or invalid field: ${field}` };
    }
    if ((submission[field] as string).length > 500) {
      return { valid: false, error: `Field too long: ${field}` };
    }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(submission.email as string)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Required array fields
  const requiredArrays = ['workTypes', 'selectedServices', 'existingSetup'];
  for (const field of requiredArrays) {
    if (!Array.isArray(submission[field])) {
      return { valid: false, error: `Missing or invalid field: ${field}` };
    }
    // Validate array contents
    for (const item of submission[field] as unknown[]) {
      if (typeof item !== 'string' || item.length > 200) {
        return { valid: false, error: `Invalid item in ${field}` };
      }
    }
  }

  return { 
    valid: true, 
    submission: {
      fullName: (submission.fullName as string).trim().slice(0, 200),
      email: (submission.email as string).trim().toLowerCase().slice(0, 255),
      phone: (submission.phone as string).trim().slice(0, 50),
      city: (submission.city as string).trim().slice(0, 100),
      currentStage: (submission.currentStage as string).trim().slice(0, 100),
      timeline: (submission.timeline as string).trim().slice(0, 100),
      workTypes: (submission.workTypes as string[]).map(s => s.trim().slice(0, 100)),
      selectedServices: (submission.selectedServices as string[]).map(s => s.trim().slice(0, 100)),
      existingSetup: (submission.existingSetup as string[]).map(s => s.trim().slice(0, 100)),
    }
  };
}

// Escape HTML to prevent XSS in email
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Check rate limit using database
async function checkRateLimit(supabaseUrl: string, supabaseKey: string, email: string): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
  
  const { count, error } = await supabase
    .from('intake_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('email', email.toLowerCase())
    .gte('created_at', windowStart);

  if (error) {
    console.error("Rate limit check error:", error.message);
    // Allow on error to not block legitimate users
    return { allowed: true, remaining: MAX_SUBMISSIONS_PER_WINDOW };
  }

  const currentCount = count || 0;
  const remaining = Math.max(0, MAX_SUBMISSIONS_PER_WINDOW - currentCount);
  
  return { 
    allowed: currentCount < MAX_SUBMISSIONS_PER_WINDOW,
    remaining 
  };
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Validate origin (defense in depth for browser-based attacks)
  const origin = req.headers.get("origin") || "";
  const isValidOrigin = allowedOrigins.includes(origin) || isLovablePreview(origin);
  if (origin && !isValidOrigin) {
    console.error("Request from unauthorized origin:", origin);
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const validation = validateSubmission(rawData);
    if (!validation.valid || !validation.submission) {
      console.error("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const submission = validation.submission;

    // Check rate limit
    const rateLimit = await checkRateLimit(supabaseUrl, supabaseServiceKey, submission.email);
    if (!rateLimit.allowed) {
      console.log("Rate limit exceeded for email:", submission.email);
      return new Response(
        JSON.stringify({ 
          error: "Too many submissions. Please try again later.",
          retryAfter: RATE_LIMIT_WINDOW_MINUTES * 60
        }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(RATE_LIMIT_WINDOW_MINUTES * 60),
            ...corsHeaders 
          } 
        }
      );
    }

    console.log("Processing submission notification for:", submission.email);

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
        <p><strong>Name:</strong> ${escapeHtml(submission.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
        <p><strong>City:</strong> ${escapeHtml(submission.city)}</p>
        
        <h2 style="color: #4a4a68; border-bottom: 1px solid #eee; padding-bottom: 8px;">Business Information</h2>
        <p><strong>Current Stage:</strong> ${escapeHtml(submission.currentStage)}</p>
        <p><strong>Work Types:</strong> ${submission.workTypes.map(escapeHtml).join(", ") || "Not specified"}</p>
        <p><strong>Selected Services:</strong> ${submission.selectedServices.map(escapeHtml).join(", ") || "None"}</p>
        <p><strong>Existing Setup:</strong> ${submission.existingSetup.map(escapeHtml).join(", ") || "None"}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(submission.timeline)}</p>
        
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
        subject: `New Business Setup Request from ${escapeHtml(submission.fullName)}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email notification sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-admin function:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
