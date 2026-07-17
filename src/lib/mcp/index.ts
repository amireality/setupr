import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import listBlogPostsTool from "./tools/list-blog-posts";
import getBlogPostTool from "./tools/get-blog-post";

export default defineMcp({
  name: "setupr-mcp",
  title: "Setupr",
  version: "0.1.0",
  instructions:
    "Public read-only tools for Setupr — the global digital services platform for business registration, websites & integrations, and automations & AI. Use `list_services` to browse the services catalog, `list_blog_posts` to browse published articles, and `get_blog_post` to read a full post by slug.",
  tools: [listServicesTool, listBlogPostsTool, getBlogPostTool],
});
