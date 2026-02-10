import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceFaq {
  id: string;
  service_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export const useServiceFaqs = (serviceId: string) => {
  return useQuery({
    queryKey: ["service-faqs", serviceId],
    queryFn: async (): Promise<ServiceFaq[]> => {
      const { data, error } = await supabase
        .from("service_faqs")
        .select("*")
        .eq("service_id", serviceId)
        .order("sort_order");

      if (error) throw error;
      return data || [];
    },
    enabled: !!serviceId,
  });
};
