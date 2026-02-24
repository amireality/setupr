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
      authors: {
        Row: {
          avatar_initials: string
          bio: string
          created_at: string
          id: string
          is_active: boolean
          linkedin_url: string | null
          name: string
          slug: string
          sort_order: number
          title: string
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          avatar_initials?: string
          bio?: string
          created_at?: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          name: string
          slug: string
          sort_order?: number
          title?: string
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          avatar_initials?: string
          bio?: string
          created_at?: string
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          name?: string
          slug?: string
          sort_order?: number
          title?: string
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
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
      customer_profiles: {
        Row: {
          billing_address: string | null
          company_name: string
          created_at: string
          gstin: string | null
          id: string
          is_verified: boolean
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_address?: string | null
          company_name?: string
          created_at?: string
          gstin?: string | null
          id?: string
          is_verified?: boolean
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_address?: string | null
          company_name?: string
          created_at?: string
          gstin?: string | null
          id?: string
          is_verified?: boolean
          phone?: string | null
          updated_at?: string
          user_id?: string
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
      service_deliverables: {
        Row: {
          created_at: string
          id: string
          label: string
          service_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          service_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          service_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      service_faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          service_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          service_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          service_id?: string
          sort_order?: number
          updated_at?: string
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
      site_settings: {
        Row: {
          category: string
          created_at: string
          description: string
          field_type: string
          id: string
          key: string
          label: string
          sort_order: number
          updated_at: string
          value: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string
          field_type?: string
          id?: string
          key: string
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          field_type?: string
          id?: string
          key?: string
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      store_cart_items: {
        Row: {
          created_at: string
          id: string
          plan_id: string | null
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          plan_id?: string | null
          product_id: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          plan_id?: string | null
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_cart_items_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "store_product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      store_categories: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      store_order_items: {
        Row: {
          created_at: string
          id: string
          ingram_sku: string | null
          license_key: string | null
          order_id: string
          plan_id: string | null
          product_id: string | null
          product_name: string
          quantity: number
          total_inr: number
          unit_price_inr: number
        }
        Insert: {
          created_at?: string
          id?: string
          ingram_sku?: string | null
          license_key?: string | null
          order_id: string
          plan_id?: string | null
          product_id?: string | null
          product_name: string
          quantity?: number
          total_inr?: number
          unit_price_inr?: number
        }
        Update: {
          created_at?: string
          id?: string
          ingram_sku?: string | null
          license_key?: string | null
          order_id?: string
          plan_id?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          total_inr?: number
          unit_price_inr?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "store_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_order_items_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "store_product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      store_orders: {
        Row: {
          billing_address: string | null
          company_name: string | null
          created_at: string
          gstin: string | null
          id: string
          ingram_order_id: string | null
          order_number: string
          payment_id: string | null
          payment_provider: string | null
          payment_status: string | null
          status: string
          subtotal_inr: number
          tax_inr: number
          total_inr: number
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_address?: string | null
          company_name?: string | null
          created_at?: string
          gstin?: string | null
          id?: string
          ingram_order_id?: string | null
          order_number: string
          payment_id?: string | null
          payment_provider?: string | null
          payment_status?: string | null
          status?: string
          subtotal_inr?: number
          tax_inr?: number
          total_inr?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_address?: string | null
          company_name?: string | null
          created_at?: string
          gstin?: string | null
          id?: string
          ingram_order_id?: string | null
          order_number?: string
          payment_id?: string | null
          payment_provider?: string | null
          payment_status?: string | null
          status?: string
          subtotal_inr?: number
          tax_inr?: number
          total_inr?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      store_product_plans: {
        Row: {
          billing_cycle: string
          created_at: string
          features: Json
          id: string
          ingram_sku: string | null
          is_active: boolean
          plan_name: string
          price_inr: number
          product_id: string
          seat_maximum: number | null
          seat_minimum: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          billing_cycle?: string
          created_at?: string
          features?: Json
          id?: string
          ingram_sku?: string | null
          is_active?: boolean
          plan_name: string
          price_inr?: number
          product_id: string
          seat_maximum?: number | null
          seat_minimum?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          billing_cycle?: string
          created_at?: string
          features?: Json
          id?: string
          ingram_sku?: string | null
          is_active?: boolean
          plan_name?: string
          price_inr?: number
          product_id?: string
          seat_maximum?: number | null
          seat_minimum?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_product_plans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      store_products: {
        Row: {
          base_price_inr: number
          billing_cycle: string
          category_id: string | null
          created_at: string
          featured_image_url: string | null
          id: string
          ingram_metadata: Json | null
          ingram_sku: string | null
          is_active: boolean
          is_featured: boolean
          long_description: string
          name: string
          price_override: boolean
          product_type: string
          short_description: string
          slug: string
          sort_order: number
          updated_at: string
          vendor: string
          vendor_logo_url: string | null
        }
        Insert: {
          base_price_inr?: number
          billing_cycle?: string
          category_id?: string | null
          created_at?: string
          featured_image_url?: string | null
          id?: string
          ingram_metadata?: Json | null
          ingram_sku?: string | null
          is_active?: boolean
          is_featured?: boolean
          long_description?: string
          name: string
          price_override?: boolean
          product_type?: string
          short_description?: string
          slug: string
          sort_order?: number
          updated_at?: string
          vendor?: string
          vendor_logo_url?: string | null
        }
        Update: {
          base_price_inr?: number
          billing_cycle?: string
          category_id?: string | null
          created_at?: string
          featured_image_url?: string | null
          id?: string
          ingram_metadata?: Json | null
          ingram_sku?: string | null
          is_active?: boolean
          is_featured?: boolean
          long_description?: string
          name?: string
          price_override?: boolean
          product_type?: string
          short_description?: string
          slug?: string
          sort_order?: number
          updated_at?: string
          vendor?: string
          vendor_logo_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "store_categories"
            referencedColumns: ["id"]
          },
        ]
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
