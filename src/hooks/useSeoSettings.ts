import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SeoSettings {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

const defaultSeo: Record<string, SeoSettings> = {
  homepage: { title: "Setupr | Business Registration & Setup Services in India", description: "Company registration, GST, MSME, website, and compliance. All handled for freelancers, consultants, and startups in India." },
  about: { title: "About Setupr | Our Mission & Values", description: "Learn about Setupr's mission to simplify business registration and compliance for Indian entrepreneurs." },
  blog: { title: "Business Guides & Resources | Setupr Blog", description: "Expert guides on company registration, GST, MSME, compliance, and building credibility for freelancers, consultants, and startup founders in India." },
  services: { title: "Business Setup Services | Registration, GST, Website & More | Setupr", description: "Explore all business setup services: company registration, GST, MSME, website development, compliance, and more." },
  team: { title: "Meet the Setupr Team", description: "The experts behind Setupr. Experienced professionals in business registration, compliance, and digital setup." },
  career: { title: "Careers at Setupr | Join Our Team", description: "Explore fellowship and career opportunities at Setupr. Work directly with founders on real business challenges." },
  contact: { title: "Contact Setupr | Get in Touch", description: "Have questions about business registration or our services? Reach out to the Setupr team." },
  guides: { title: "Business Guides | Starting & Registering Your Business in India", description: "Step-by-step guides for starting, registering, and growing your business in India." },
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
