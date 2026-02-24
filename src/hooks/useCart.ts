import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  plan_id: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    vendor: string;
    vendor_logo_url: string | null;
    featured_image_url: string | null;
    base_price_inr: number;
    billing_cycle: string;
    product_type: string;
  };
  plan?: {
    id: string;
    plan_name: string;
    price_inr: number;
    billing_cycle: string;
  } | null;
}

export const useCart = () => {
  const { user } = useStoreAuth();
  const qc = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["store-cart", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_cart_items")
        .select(`
          *,
          product:store_products!product_id(id, name, slug, vendor, vendor_logo_url, featured_image_url, base_price_inr, billing_cycle, product_type),
          plan:store_product_plans!plan_id(id, plan_name, price_inr, billing_cycle)
        `)
        .eq("user_id", user!.id)
        .order("created_at");
      if (error) throw error;
      return (data || []) as CartItem[];
    },
    enabled: !!user,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, planId, quantity = 1 }: { productId: string; planId?: string; quantity?: number }) => {
      if (!user) throw new Error("Please sign in to add items to cart");
      const { error } = await supabase
        .from("store_cart_items")
        .upsert(
          { user_id: user.id, product_id: productId, plan_id: planId || null, quantity },
          { onConflict: "user_id,product_id,plan_id" }
        );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-cart"] });
      toast({ title: "Added to cart" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity <= 0) {
        const { error } = await supabase.from("store_cart_items").delete().eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("store_cart_items").update({ quantity }).eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["store-cart"] }),
  });

  const removeFromCart = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("store_cart_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-cart"] });
      toast({ title: "Removed from cart" });
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from("store_cart_items").delete().eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["store-cart"] }),
  });

  const items = cartQuery.data || [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = item.plan?.price_inr ?? item.product?.base_price_inr ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return {
    items,
    itemCount,
    subtotal,
    isLoading: cartQuery.isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
