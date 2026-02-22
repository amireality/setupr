import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface StoreCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

export const useStoreCategories = () => {
  return useQuery({
    queryKey: ["store-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as StoreCategory[];
    },
  });
};

export const useAllStoreCategories = () => {
  return useQuery({
    queryKey: ["store-categories-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as StoreCategory[];
    },
  });
};
