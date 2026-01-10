export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string | null
          excerpt: string
          featured_image_url: string | null
          id: string
          is_published: boolean
          published_at: string | null
          read_time_minutes: number
          slug: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          read_time_minutes?: number
          slug: string
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          read_time_minutes?: number
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bundles: {
        Row: {
          bundle_id: string
          bundle_name: string
          bundle_setupr_fee: number
          created_at: string | null
          govt_fee_note: string
          gradient: string
          icon: string
          id: string
          included_service_ids: string[]
          sort_order: number
          updated_at: string | null
          who_its_for: string
        }
        Insert: {
          bundle_id: string
          bundle_name: string
          bundle_setupr_fee: number
          created_at?: string | null
          govt_fee_note?: string
          gradient?: string
          icon?: string
          id?: string
          included_service_ids?: string[]
          sort_order?: number
          updated_at?: string | null
          who_its_for: string
        }
        Update: {
          bundle_id?: string
          bundle_name?: string
          bundle_setupr_fee?: number
          created_at?: string | null
          govt_fee_note?: string
          gradient?: string
          icon?: string
          id?: string
          included_service_ids?: string[]
          sort_order?: number
          updated_at?: string | null
          who_its_for?: string
        }
        Relationships: []
      }
      intake_submissions: {
        Row: {
          city: string
          created_at: string
          current_stage: string
          email: string
          existing_setup: string[]
          full_name: string
          id: string
          phone: string
          selected_services: string[]
          status: string
          timeline: string
          work_types: string[]
        }
        Insert: {
          city: string
          created_at?: string
          current_stage: string
          email: string
          existing_setup?: string[]
          full_name: string
          id?: string
          phone: string
          selected_services?: string[]
          status?: string
          timeline: string
          work_types?: string[]
        }
        Update: {
          city?: string
          created_at?: string
          current_stage?: string
          email?: string
          existing_setup?: string[]
          full_name?: string
          id?: string
          phone?: string
          selected_services?: string[]
          status?: string
          timeline?: string
          work_types?: string[]
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          category_id: string
          created_at: string | null
          gradient: string
          icon: string
          id: string
          intro: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          gradient?: string
          icon?: string
          id?: string
          intro: string
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          gradient?: string
          icon?: string
          id?: string
          intro?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          created_at: string | null
          default_selected: boolean
          delivery_type: string
          description_short: string
          govt_or_third_party_fee: string
          id: string
          service_id: string
          service_name: string
          setupr_fee_inr: number
          sort_order: number
          sub_category: string
          updated_at: string | null
          visibility: string
          who_its_for: string
        }
        Insert: {
          category: string
          created_at?: string | null
          default_selected?: boolean
          delivery_type: string
          description_short: string
          govt_or_third_party_fee?: string
          id?: string
          service_id: string
          service_name: string
          setupr_fee_inr: number
          sort_order?: number
          sub_category: string
          updated_at?: string | null
          visibility?: string
          who_its_for: string
        }
        Update: {
          category?: string
          created_at?: string | null
          default_selected?: boolean
          delivery_type?: string
          description_short?: string
          govt_or_third_party_fee?: string
          id?: string
          service_id?: string
          service_name?: string
          setupr_fee_inr?: number
          sort_order?: number
          sub_category?: string
          updated_at?: string | null
          visibility?: string
          who_its_for?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          business_type: string
          client_name: string
          created_at: string | null
          id: string
          is_featured: boolean
          quote: string
          rating: number
          service_used: string
          sort_order: number
        }
        Insert: {
          business_type: string
          client_name: string
          created_at?: string | null
          id?: string
          is_featured?: boolean
          quote: string
          rating?: number
          service_used: string
          sort_order?: number
        }
        Update: {
          business_type?: string
          client_name?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean
          quote?: string
          rating?: number
          service_used?: string
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
