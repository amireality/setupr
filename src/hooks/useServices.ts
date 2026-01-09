import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ServiceId } from "@/data/services";

// Types matching database schema
export interface DbService {
  id: string;
  service_id: string;
  category: string;
  sub_category: string;
  service_name: string;
  description_short: string;
  who_its_for: string;
  setupr_fee_inr: number;
  govt_or_third_party_fee: string;
  delivery_type: "coordination" | "done-for-you";
  visibility: "public" | "add-on" | "bundle-only";
  default_selected: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbCategory {
  id: string;
  category_id: string;
  title: string;
  intro: string;
  icon: string;
  gradient: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbBundle {
  id: string;
  bundle_id: string;
  bundle_name: string;
  who_its_for: string;
  included_service_ids: string[];
  bundle_setupr_fee: number;
  govt_fee_note: string;
  icon: string;
  gradient: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Fetch all services from database
export const useDbServices = () => {
  return useQuery({
    queryKey: ["db-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data as DbService[];
    },
  });
};

// Fetch all categories from database
export const useDbCategories = () => {
  return useQuery({
    queryKey: ["db-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data as DbCategory[];
    },
  });
};

// Fetch all bundles from database
export const useDbBundles = () => {
  return useQuery({
    queryKey: ["db-bundles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bundles")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data as DbBundle[];
    },
  });
};

// Helper function to get services by category
export const getDbServicesByCategory = (services: DbService[], categoryId: string) => {
  return services.filter(s => s.category === categoryId && s.visibility === "public");
};

// Helper function to get service by ID
export const getDbServiceById = (services: DbService[], serviceId: ServiceId) => {
  return services.find(s => s.service_id === serviceId);
};

// Calculate total for selected services
export const calculateDbTotal = (services: DbService[], serviceIds: ServiceId[]) => {
  return serviceIds.reduce((sum, id) => {
    const service = services.find(s => s.service_id === id);
    return sum + (service?.setupr_fee_inr || 0);
  }, 0);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN").format(price);
};

// Admin mutations
export const useCreateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (service: Omit<DbService, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("services")
        .insert(service)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbService> & { id: string }) => {
      const { data, error } = await supabase
        .from("services")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-services"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-services"] });
    },
  });
};

export const useCreateBundle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bundle: Omit<DbBundle, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("bundles")
        .insert(bundle)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-bundles"] });
    },
  });
};

export const useUpdateBundle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbBundle> & { id: string }) => {
      const { data, error } = await supabase
        .from("bundles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-bundles"] });
    },
  });
};

export const useDeleteBundle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("bundles")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-bundles"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: Omit<DbCategory, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("service_categories")
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbCategory> & { id: string }) => {
      const { data, error } = await supabase
        .from("service_categories")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-categories"] });
    },
  });
};
