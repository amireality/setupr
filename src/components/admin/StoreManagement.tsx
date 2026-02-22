import { useState } from "react";
import { useAllStoreProducts, useUpdateStoreProduct, type StoreProduct, formatStorePrice } from "@/hooks/useStoreProducts";
import { useAllStoreCategories, type StoreCategory } from "@/hooks/useStoreCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, RefreshCw, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const StoreManagement = () => {
  const { data: products = [], isLoading: loadingProducts } = useAllStoreProducts();
  const { data: categories = [] } = useAllStoreCategories();
  const updateProduct = useUpdateStoreProduct();
  const { toast } = useToast();
  const [editProduct, setEditProduct] = useState<StoreProduct | null>(null);
  const qc = useQueryClient();

  const syncMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("sync-ingram-catalog");
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({ title: "Sync complete", description: JSON.stringify(data) });
      qc.invalidateQueries({ queryKey: ["store-products"] });
    },
    onError: (err: Error) => {
      toast({ title: "Sync failed", description: err.message, variant: "destructive" });
    },
  });

  const toggleActive = async (product: StoreProduct) => {
    try {
      await updateProduct.mutateAsync({ id: product.id, is_active: !product.is_active });
      toast({ title: `Product ${product.is_active ? "hidden" : "activated"}` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const toggleFeatured = async (product: StoreProduct) => {
    try {
      await updateProduct.mutateAsync({ id: product.id, is_featured: !product.is_featured });
      toast({ title: `Product ${product.is_featured ? "unfeatured" : "featured"}` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Sync Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Store Products ({products.length})</h2>
          <p className="text-sm text-muted-foreground">Manage products synced from Ingram Micro</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? "animate-spin" : ""}`} />
          Sync Catalog
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Categories ({categories.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground"
            >
              {cat.name} {!cat.is_active && "(hidden)"}
            </span>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted-foreground">No categories yet. Add via database.</p>
          )}
        </div>
      </div>

      {/* Products */}
      {loadingProducts ? (
        <div className="text-muted-foreground">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No products yet. Use "Sync Catalog" or add manually via database.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {products.map((product) => (
            <div key={product.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{product.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {product.vendor}
                  </span>
                  {!product.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive">Hidden</span>
                  )}
                  {product.is_featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Featured</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  ₹{formatStorePrice(product.base_price_inr)} • {product.billing_cycle} • {product.product_type}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground">Active</Label>
                  <Switch checked={product.is_active} onCheckedChange={() => toggleActive(product)} />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground">Featured</Label>
                  <Switch checked={product.is_featured} onCheckedChange={() => toggleFeatured(product)} />
                </div>
                <Button variant="ghost" size="sm" onClick={() => setEditProduct(product)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editProduct} onOpenChange={(open) => !open && setEditProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                try {
                  await updateProduct.mutateAsync({
                    id: editProduct.id,
                    name: fd.get("name") as string,
                    short_description: fd.get("short_description") as string,
                    base_price_inr: parseFloat(fd.get("base_price_inr") as string),
                  });
                  toast({ title: "Product updated" });
                  setEditProduct(null);
                } catch (err: any) {
                  toast({ title: "Error", description: err.message, variant: "destructive" });
                }
              }}
              className="space-y-4"
            >
              <div>
                <Label>Name</Label>
                <Input name="name" defaultValue={editProduct.name} required />
              </div>
              <div>
                <Label>Short Description</Label>
                <Input name="short_description" defaultValue={editProduct.short_description} />
              </div>
              <div>
                <Label>Base Price (INR)</Label>
                <Input name="base_price_inr" type="number" defaultValue={editProduct.base_price_inr} />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
