// Types for the Deno runtime globals used inside MCP tool handlers.
// These files are bundled into a Supabase Edge Function at build time.
declare const process: { env: Record<string, string | undefined> };
