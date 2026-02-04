import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar_initials: string;
  twitter_url: string | null;
  linkedin_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Fetch all active authors (public)
export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Author[];
    },
  });
};

// Fetch single author by slug (public)
export const useAuthor = (slug: string) => {
  return useQuery({
    queryKey: ["author", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as Author;
    },
    enabled: !!slug,
  });
};

// Fetch author by name (for blog posts linking)
export const useAuthorByName = (name: string) => {
  return useQuery({
    queryKey: ["author-by-name", name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("slug, name, avatar_initials")
        .eq("name", name)
        .eq("is_active", true)
        .single();

      if (error) return null;
      return data as Pick<Author, "slug" | "name" | "avatar_initials">;
    },
    enabled: !!name,
  });
};

// Admin: Fetch all authors (including inactive)
export const useAdminAuthors = () => {
  return useQuery({
    queryKey: ["admin-authors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Author[];
    },
  });
};

// Admin: Create author
export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (author: Omit<Author, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("authors")
        .insert([author])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
    },
  });
};

// Admin: Update author
export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Author> & { id: string }) => {
      const { data, error } = await supabase
        .from("authors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
    },
  });
};

// Admin: Delete author
export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("authors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
    },
  });
};
