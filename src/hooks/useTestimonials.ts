import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  client_name: string;
  business_type: string;
  service_used: string;
  quote: string;
  rating: number;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export const useTestimonials = (featuredOnly = false) => {
  return useQuery({
    queryKey: ["testimonials", featuredOnly],
    queryFn: async () => {
      let query = supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });

      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Testimonial[];
    },
  });
};
