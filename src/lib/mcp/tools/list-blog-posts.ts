/// <reference path="../env.d.ts" />
import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_blog_posts",
  title: "List Setupr blog posts",
  description:
    "List published Setupr blog posts (title, slug, excerpt, category, author, published date, read time, featured image). Returns most recently published first.",
  inputSchema: {
    category: z.string().optional().describe("Optional category filter."),
    limit: z
      .number()
      .int()
      .optional()
      .describe("Max number of posts to return. Defaults to 20, capped at 50."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const cap = Math.min(Math.max(limit ?? 20, 1), 50);
    let query = supabase
      .from("blog_posts")
      .select(
        "title, slug, excerpt, category, author_name, published_at, read_time_minutes, featured_image_url",
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(cap);

    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
