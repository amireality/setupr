/// <reference path="../env.d.ts" />
import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_services",
  title: "List Setupr services",
  description:
    "List Setupr's public services catalog (business registration, websites & integrations, automations & AI). Returns service id, name, category, short description, who it's for, Setupr fee (INR), delivery type, and regional availability.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe(
        "Optional category filter: 'business-registration', 'websites-integrations', 'automations-ai', etc.",
      ),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    let query = supabase
      .from("services")
      .select(
        "service_id, service_name, category, sub_category, description_short, who_its_for, setupr_fee_inr, govt_or_third_party_fee, delivery_type, available_regions, is_regional",
      )
      .eq("visibility", "public")
      .order("sort_order");

    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { services: data ?? [] },
    };
  },
});
