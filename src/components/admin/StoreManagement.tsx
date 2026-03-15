import { useState, useEffect } from "react";
import { useAllStoreProducts, useUpdateStoreProduct, type StoreProduct, formatStorePrice } from "@/hooks/useStoreProducts";
import { useAllStoreCategories } from "@/hooks/useStoreCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, RefreshCw, Package, CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface SyncResult {
  success?: boolean;
  total?: number;
  synced?: number;
  skipped?: number;
  markup_percentage?: number;
  synced_at?: string;
  dry_run?: boolean;
  preview?: Array<{ sku: string; name: string; vendor: string; price: number; markedUpPrice: number; type: string }>;
  error?: string;
}

export const StoreManagement = () => {
  const { data: products = [], isLoading: loadingProducts } = useAllStoreProducts();
  const { data: categories = [] } = useAllStoreCategories();
  const updateProduct = useUpdateStoreProduct();
  const { toast } = useToast();
  const [editProduct, setEditProduct] = useState<StoreProduct | null>(null);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const qc = useQueryClient();

  // Load last sync info and markup from site_settings
  const { data: settings = [] } = useQuery({
    queryKey: ["store-admin-settings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["store_last_sync", "store_markup_percentage"]);
      return data || [];
    },
  });

  const lastSync = settings.find((s) => s.key === "store_last_sync");
  const markupSetting = settings.find((s) => s.key === "store_markup_percentage");
  const [markupValue, setMarkupValue] = useState("15");

  useEffect(() => {
    if (markupSetting) setMarkupValue(markupSetting.value);
  }, [markupSetting]);

  let lastSyncData: SyncResult | null = null;
  try {
    if (lastSync?.value) lastSyncData = JSON.parse(lastSync.value);
  } catch { /* ignore */ }

  const syncMutation = useMutation({
    mutationFn: async (dryRun: boolean) => {
      const { data, error } = await supabase.functions.invoke("sync-ingram-catalog", {
        body: { dry_run: dryRun },
      });
      if (error) throw error;
      return data as SyncResult;
    },
    onSuccess: (data) => {
      setSyncResult(data);
      if (!data.dry_run) {
        toast({ title: "Sync complete", description: `${data.synced} synced, ${data.skipped} skipped` });
        qc.invalidateQueries({ queryKey: ["store-products"] });
        qc.invalidateQueries({ queryKey: ["store-admin-settings"] });
      }
    },
    onError: (err: Error) => {
      toast({ title: "Sync failed", description: err.message, variant: "destructive" });
    },
  });

  const saveMarkup = async () => {
    const { error } = await supabase
      .from("site_settings")
      .update({ value: markupValue })
      .eq("key", "store_markup_percentage");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Markup updated to " + markupValue + "%" });
      qc.invalidateQueries({ queryKey: ["store-admin-settings"] });
    }
  };

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
      {/* Sync & Markup Controls */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Ingram Micro Sync</h2>
            <p className="text-sm text-muted-foreground">
              {lastSyncData?.synced_at
                ? `Last synced: ${new Date(lastSyncData.synced_at).toLocaleString()} | ${lastSyncData.synced} products synced`
                : "Never synced"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => syncMutation.mutate(true)}
              disabled={syncMutation.isPending}
            >
              <Eye className="w-4 h-4 mr-2" />
              Dry Run
            </Button>
            <Button
              size="sm"
              onClick={() => syncMutation.mutate(false)}
              disabled={syncMutation.isPending}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? "animate-spin" : ""}`} />
              Sync Now
            </Button>
          </div>
        </div>

        {/* Markup Setting */}
        <div className="flex items-end gap-3 pt-2 border-t border-border/50">
          <div className="flex-1 max-w-[200px]">
            <Label className="text-xs text-muted-foreground">Default Markup %</Label>
            <Input
              type="number"
              value={markupValue}
              onChange={(e) => setMarkupValue(e.target.value)}
              min="0"
              max="100"
              className="mt-1"
            />
          </div>
          <Button size="sm" variant="outline" onClick={saveMarkup}>
            Save
          </Button>
          <span className="text-xs text-muted-foreground pb-2">
            Applied to Ingram prices during sync (unless manually overridden)
          </span>
        </div>

        {/* Sync Result */}
        {syncResult && (
          <div className={`rounded-xl p-4 ${syncResult.dry_run ? "bg-secondary" : syncResult.success ? "bg-primary/10" : "bg-destructive/10"}`}>
            {syncResult.dry_run ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Dry Run Preview | {syncResult.total} products found</span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {syncResult.preview?.map((p, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex justify-between">
                      <span>{p.vendor} — {p.name}</span>
                      <span>₹{p.price.toLocaleString("en-IN")} → ₹{p.markedUpPrice.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : syncResult.success ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">
                  Synced {syncResult.synced} of {syncResult.total} products ({syncResult.skipped} skipped) at {markupValue}% markup
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">{syncResult.error || "Sync failed"}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Products Header */}
      <div>
        <h2 className="font-display text-lg font-semibold">Store Products ({products.length})</h2>
        <p className="text-sm text-muted-foreground">Manage products synced from Ingram Micro</p>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Categories ({categories.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span key={cat.id} className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground">
              {cat.name} {!cat.is_active && "(hidden)"}
            </span>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted-foreground">No categories yet.</p>
          )}
        </div>
      </div>

      {/* Products */}
      {loadingProducts ? (
        <div className="text-muted-foreground">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No products yet. Use "Sync Catalog" or add manually.</p>
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
                    price_override: true, // Mark as manually set
                  });
                  toast({ title: "Product updated (price override enabled)" });
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
                <Label>Customer Price (INR)</Label>
                <Input name="base_price_inr" type="number" defaultValue={editProduct.base_price_inr} />
                <p className="text-xs text-muted-foreground mt-1">
                  Editing the price enables manual override — future syncs won't change it.
                </p>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
