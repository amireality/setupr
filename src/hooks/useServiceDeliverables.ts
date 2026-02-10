import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceDeliverable {
  id: string;
  service_id: string;
  label: string;
  sort_order: number;
}

export const useServiceDeliverables = (serviceId: string) => {
  return useQuery({
    queryKey: ["service-deliverables", serviceId],
    queryFn: async (): Promise<ServiceDeliverable[]> => {
      const { data, error } = await supabase
        .from("service_deliverables")
        .select("*")
        .eq("service_id", serviceId)
        .order("sort_order");

      if (error) throw error;
      return data || [];
    },
    enabled: !!serviceId,
  });
};
