import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "./useBlogPosts";

// Fetch all posts (including drafts) for admin
export const useAdminBlogPosts = () => {
  return useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

// Create blog post
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert([post])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

// Update blog post
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

// Delete blog post
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

// Publish/Unpublish blog post
export const useTogglePublishBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const updates: Partial<BlogPost> = { is_published };
      if (is_published) {
        updates.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};

// Generate blog content via edge function
export const useGenerateBlogContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      category,
      topicFocus,
      includeRegulatory = true,
      includeSeo = true,
    }: {
      category: string;
      topicFocus?: string;
      includeRegulatory?: boolean;
      includeSeo?: boolean;
    }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      if (!accessToken) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ category, topicFocus, includeRegulatory, includeSeo }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to generate content: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
    },
  });
};

// Get unique categories from existing posts
export const useAdminBlogCategories = () => {
  return useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("category");

      if (error) throw error;

      const categories = [...new Set(data.map((p) => p.category))];
      
      // Add default categories if not present
      const defaultCategories = [
        "Business Formation",
        "Digital Presence",
        "Founder Insights",
        "Compliance",
        "Trust and Compliance",
      ];

      const allCategories = [...new Set([...categories, ...defaultCategories])];
      return allCategories.sort();
    },
  });
};
