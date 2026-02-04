import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface IntakeSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  current_stage: string;
  work_types: string[];
  selected_services: string[];
  existing_setup: string[];
  timeline: string;
  status: string;
  created_at: string;
}

// Fetch all intake submissions for admin
export const useAdminIntakeSubmissions = () => {
  return useQuery({
    queryKey: ["admin-intake-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("intake_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as IntakeSubmission[];
    },
  });
};

// Update submission status
export const useUpdateIntakeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("intake_submissions")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-intake-submissions"] });
    },
  });
};

// Delete submission
export const useDeleteIntakeSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("intake_submissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-intake-submissions"] });
    },
  });
};
