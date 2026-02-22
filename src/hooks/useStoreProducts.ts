import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface StoreProduct {
  id: string;
  ingram_sku: string | null;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  category_id: string | null;
  product_type: string;
  vendor: string;
  vendor_logo_url: string | null;
  featured_image_url: string | null;
  base_price_inr: number;
  billing_cycle: string;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  ingram_metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface StoreProductPlan {
  id: string;
  product_id: string;
  plan_name: string;
  ingram_sku: string | null;
  price_inr: number;
  billing_cycle: string;
  seat_minimum: number;
  seat_maximum: number | null;
  features: string[];
  sort_order: number;
  is_active: boolean;
}

export const useStoreProducts = (filters?: { categoryId?: string; search?: string; featured?: boolean }) => {
  return useQuery({
    queryKey: ["store-products", filters],
    queryFn: async () => {
      let query = supabase
        .from("store_products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (filters?.categoryId) {
        query = query.eq("category_id", filters.categoryId);
      }
      if (filters?.featured) {
        query = query.eq("is_featured", true);
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,vendor.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as StoreProduct[];
    },
  });
};

export const useStoreProduct = (slug: string) => {
  return useQuery({
    queryKey: ["store-product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data as StoreProduct;
    },
    enabled: !!slug,
  });
};

export const useStoreProductPlans = (productId: string) => {
  return useQuery({
    queryKey: ["store-product-plans", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_product_plans")
        .select("*")
        .eq("product_id", productId)
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as StoreProductPlan[];
    },
    enabled: !!productId,
  });
};

export const useAllStoreProducts = () => {
  return useQuery({
    queryKey: ["store-products-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_products")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as StoreProduct[];
    },
  });
};

export const useUpdateStoreProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Record<string, unknown>) => {
      const { error } = await supabase.from("store_products").update(updates as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-products"] });
    },
  });
};

export const formatStorePrice = (price: number) => {
  return new Intl.NumberFormat("en-IN").format(price);
};
