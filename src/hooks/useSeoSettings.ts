import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SeoSettings {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

const defaultSeo: Record<string, SeoSettings> = {
  homepage: { 
    title: "Setupr | Tech Ecosystem, AI Tools, Custom Websites & Business Setup", 
    description: "Setupr is a technology ecosystem building autonomous AI tools, custom web engineering, feature integrations, and turnkey business setup for global founders." 
  },
  lab: {
    title: "Setupr Lab | Open-Source AI Tools, MCP Servers & Extensions",
    description: "Explore Setupr Lab: creator of Blew by Setupr (social media autopilot for AI agents), Model Context Protocol (MCP) servers, and developer toolkits."
  },
  about: { 
    title: "About Setupr | The Technology Ecosystem for Modern Founders", 
    description: "Learn about Setupr's mission: engineering open-source AI tools, bespoke digital infrastructure, and global business setup for modern founders worldwide." 
  },
  blog: { 
    title: "Setupr Engineering & Insights | AI Agents, Web & Startup Architecture", 
    description: "Engineering guides, AI agent architecture, developer insights, and business infrastructure strategies for founders worldwide." 
  },
  services: { 
    title: "Setupr Services | Web Engineering, Integrations, Automations & Setup", 
    description: "Explore Setupr solutions: custom website development, payment & WhatsApp integrations, AI automations, and turnkey business formation worldwide." 
  },
  team: { 
    title: "Meet the Setupr Team | Builders & Engineers", 
    description: "The engineers, builders, and operators behind the Setupr technology ecosystem." 
  },
  career: { 
    title: "Careers at Setupr | Join Our Engineering & Growth Team", 
    description: "Explore opportunities at Setupr. Work on cutting-edge open-source AI tools, developer products, and high-impact digital platforms." 
  },
  contact: { 
    title: "Contact Setupr | Get in Touch with Our Team", 
    description: "Have questions about Setupr Lab products, custom engineering services, or business setup? Reach out to our team." 
  },
  guides: { 
    title: "Founder & Developer Guides | Setupr", 
    description: "Comprehensive guides on launching digital products, configuring AI agents, building web infrastructure, and legal business formation." 
  },
};

export const useSeoSettings = (page: string) => {
  return useQuery({
    queryKey: ["seo-settings", page],
    queryFn: async (): Promise<SeoSettings> => {
      const keys = [`seo_${page}_title`, `seo_${page}_description`, `seo_${page}_og_title`, `seo_${page}_og_description`];
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", keys);

      if (error) throw error;

      const fallback = defaultSeo[page] || { title: "Setupr", description: "" };
      const map = Object.fromEntries((data || []).map(r => [r.key, r.value]));

      return {
        title: map[`seo_${page}_title`] || fallback.title,
        description: map[`seo_${page}_description`] || fallback.description,
        ogTitle: map[`seo_${page}_og_title`] || map[`seo_${page}_title`] || fallback.title,
        ogDescription: map[`seo_${page}_og_description`] || map[`seo_${page}_description`] || fallback.description,
      };
    },
  });
};
