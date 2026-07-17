/// <reference path="../env.d.ts" />
import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_blog_post",
  title: "Get a Setupr blog post",
  description:
    "Fetch the full content of a single published Setupr blog post by slug (markdown content, title, excerpt, author, category, published date, featured image).",
  inputSchema: {
    slug: z.string().min(1).describe("The blog post slug, e.g. 'starting-a-business-in-india'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "title, slug, excerpt, content, category, author_name, published_at, read_time_minutes, featured_image_url",
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    if (!data) {
      return { content: [{ type: "text", text: `No published post found for slug '${slug}'.` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { post: data },
    };
  },
});
