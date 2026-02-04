import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GenerateRequest {
  category: string;
  topicFocus?: string;
  includeRegulatory?: boolean;
  includeSeo?: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user is admin
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claims.claims.sub as string;
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const { category, topicFocus, includeRegulatory = true, includeSeo = true }: GenerateRequest = await req.json();

    if (!category) {
      return new Response(JSON.stringify({ error: "Category is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get API keys
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build research prompt for Gemini
    const researchPrompt = buildResearchPrompt(category, topicFocus, includeRegulatory);

    // Step 1: Call Gemini for research with search grounding
    console.log("Calling Gemini for research...");
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: researchPrompt }] }],
          tools: [{ google_search: {} }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const researchContent = extractGeminiContent(geminiData);
    console.log("Research gathered, length:", researchContent.length);

    // Step 2: Call Lovable AI to write the blog post
    console.log("Calling Lovable AI for content creation...");
    const writingPrompt = buildWritingPrompt(category, topicFocus, researchContent, includeSeo);

    const lovableResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert content writer for Setupr, a business registration and compliance service in India. 
You write professional, engaging blog posts that help founders understand business setup processes.
Always write in a professional yet approachable tone. Use proper markdown formatting.
Author all posts as "Amir Khan".`,
          },
          { role: "user", content: writingPrompt },
        ],
        temperature: 0.7,
        max_tokens: 8192,
      }),
    });

    if (!lovableResponse.ok) {
      if (lovableResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a few minutes." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (lovableResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await lovableResponse.text();
      console.error("Lovable AI error:", lovableResponse.status, errorText);
      throw new Error(`Lovable AI error: ${lovableResponse.status}`);
    }

    const lovableData = await lovableResponse.json();
    const blogContent = lovableData.choices?.[0]?.message?.content;

    if (!blogContent) {
      throw new Error("No content generated by Lovable AI");
    }

    console.log("Blog content generated, length:", blogContent.length);

    // Parse the generated content
    const { title, excerpt, content, readTimeMinutes } = parseGeneratedContent(blogContent);
    const slug = generateSlug(title);

    // Get next sort_order
    const { data: lastPost } = await supabase
      .from("blog_posts")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .single();

    const nextSortOrder = (lastPost?.sort_order || 0) + 1;

    // Insert as draft
    const { data: newPost, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt,
        content,
        category,
        author_name: "Amir Khan",
        read_time_minutes: readTimeMinutes,
        is_published: false,
        sort_order: nextSortOrder,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to save blog post: ${insertError.message}`);
    }

    console.log("Draft saved with ID:", newPost.id);

    return new Response(
      JSON.stringify({
        success: true,
        post: newPost,
        message: "Blog post draft created successfully",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("generate-blog-content error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function buildResearchPrompt(category: string, topicFocus?: string, includeRegulatory?: boolean): string {
  const topic = topicFocus || getCategoryTopics(category);
  
  let prompt = `Research the following topic for Indian business context:

Topic: ${topic}
Category: ${category}

Please gather:
1. Latest statistics and facts (2024-2025)
2. Key benefits and considerations
3. Step-by-step process overview
4. Cost estimates (government fees, timelines)
5. Common mistakes to avoid`;

  if (includeRegulatory) {
    prompt += `
6. Recent regulatory updates or changes
7. Any new government initiatives or deadlines`;
  }

  prompt += `

Focus on practical, actionable information for founders in India.
Include specific numbers, dates, and official sources where possible.`;

  return prompt;
}

function getCategoryTopics(category: string): string {
  const topics: Record<string, string> = {
    "Business Formation": "company registration options in India - Private Limited, LLP, OPC comparison",
    "Digital Presence": "digital setup essentials for new businesses in India",
    "Founder Insights": "tips for first-time founders in India",
    "Compliance": "business compliance requirements in India",
    "Trust and Compliance": "building business credibility and trust in India",
    "Digital Setup": "technology and digital tools for startups",
    "Expert Help": "when to hire professionals for your business",
    "Visibility": "marketing and visibility strategies for new businesses",
  };
  return topics[category] || "business registration and compliance in India";
}

function extractGeminiContent(data: any): string {
  try {
    const parts = data.candidates?.[0]?.content?.parts || [];
    return parts.map((p: any) => p.text || "").join("\n");
  } catch {
    return "";
  }
}

function buildWritingPrompt(
  category: string,
  topicFocus: string | undefined,
  research: string,
  includeSeo: boolean
): string {
  return `Write a comprehensive blog post for Setupr based on this research:

CATEGORY: ${category}
${topicFocus ? `TOPIC FOCUS: ${topicFocus}` : ""}

RESEARCH DATA:
${research}

REQUIREMENTS:
1. Write 1500-2500 words in professional, narrative style
2. Use markdown formatting:
   - ## for main headings
   - ### for subheadings
   - **bold** for emphasis
   - Tables for comparisons (use proper markdown table syntax)
   - > blockquotes for key takeaways
   - Numbered and bullet lists where appropriate
3. Structure:
   - Compelling introduction that hooks the reader
   - Clear sections with proper headings
   - Practical examples and real scenarios
   - Conclusion with call-to-action mentioning Setupr services
4. Include internal links to Setupr services where relevant (use format [text](/services))
5. Write for Indian founders - use relevant examples and INR for costs
${includeSeo ? "6. Create an SEO-optimized title (under 60 chars) and compelling excerpt (under 160 chars)" : ""}

OUTPUT FORMAT:
---
TITLE: [Your SEO-optimized title here]
EXCERPT: [Your compelling meta description here]
---

[Full blog post content in markdown]`;
}

function parseGeneratedContent(content: string): {
  title: string;
  excerpt: string;
  content: string;
  readTimeMinutes: number;
} {
  let title = "Untitled Post";
  let excerpt = "";
  let mainContent = content;

  // Try to extract title and excerpt from frontmatter
  const frontmatterMatch = content.match(/---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/TITLE:\s*(.+)/i);
    const excerptMatch = frontmatter.match(/EXCERPT:\s*(.+)/i);
    
    if (titleMatch) title = titleMatch[1].trim();
    if (excerptMatch) excerpt = excerptMatch[1].trim();
    
    mainContent = content.replace(/---\s*\n[\s\S]*?\n---\s*\n?/, "").trim();
  }

  // Fallback: extract title from first heading
  if (title === "Untitled Post") {
    const headingMatch = mainContent.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      title = headingMatch[1].trim();
      mainContent = mainContent.replace(/^#\s+.+\n?/, "").trim();
    }
  }

  // Generate excerpt if not provided
  if (!excerpt) {
    const plainText = mainContent.replace(/[#*>\[\]`]/g, "").trim();
    excerpt = plainText.substring(0, 155).trim() + "...";
  }

  // Calculate read time (average 200 words per minute)
  const wordCount = mainContent.split(/\s+/).length;
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 200));

  return { title, excerpt, content: mainContent, readTimeMinutes };
}

function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50)
    .replace(/-$/, "");
  
  return `${baseSlug}-${timestamp}`;
}
