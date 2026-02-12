import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
  label: string;
  field_type: string;
  sort_order: number;
  description: string;
  created_at: string;
  updated_at: string;
}

// Fetch all settings
export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async (): Promise<SiteSetting[]> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("key");

      if (error) throw error;
      return data || [];
    },
  });
};

// Fetch a specific setting by key
export const useSiteSetting = (key: string) => {
  return useQuery({
    queryKey: ["site-setting", key],
    queryFn: async (): Promise<SiteSetting | null> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", key)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!key,
  });
};

// Fetch settings by category
export const useSiteSettingsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["site-settings-category", category],
    queryFn: async (): Promise<SiteSetting[]> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("category", category)
        .order("key");

      if (error) throw error;
      return data || [];
    },
    enabled: !!category,
  });
};

// Update a setting
export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      key,
      value,
    }: {
      key: string;
      value: string;
    }): Promise<SiteSetting> => {
      // First check if setting exists
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", key)
        .single();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from("site_settings")
          .update({ value, updated_at: new Date().toISOString() })
          .eq("key", key)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new
        const category = key.includes("_content") ? "legal" : "content";
        const { data, error } = await supabase
          .from("site_settings")
          .insert({ key, value, category })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-setting", data.key] });
      queryClient.invalidateQueries({
        queryKey: ["site-settings-category", data.category],
      });
      toast({
        title: "Setting updated",
        description: "Your changes have been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Bulk update settings
export const useBulkUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (
      settings: Array<{ key: string; value: string }>
    ): Promise<void> => {
      for (const setting of settings) {
        const { data: existing } = await supabase
          .from("site_settings")
          .select("id")
          .eq("key", setting.key)
          .single();

        if (existing) {
          await supabase
            .from("site_settings")
            .update({ value: setting.value, updated_at: new Date().toISOString() })
            .eq("key", setting.key);
        } else {
          const category = setting.key.includes("_content") ? "legal" : "content";
          await supabase
            .from("site_settings")
            .insert({ key: setting.key, value: setting.value, category });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({
        title: "Settings updated",
        description: "All changes have been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
