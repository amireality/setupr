import { useState, useMemo } from "react";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { useStoreCategories } from "@/hooks/useStoreCategories";
import StoreProductCard from "./StoreProductCard";
import StoreSearchBar from "./StoreSearchBar";
import StoreCategoryFilter from "./StoreCategoryFilter";
import { Package } from "lucide-react";

const StoreProductGrid = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories = [] } = useStoreCategories();
  const { data: products = [], isLoading } = useStoreProducts({
    categoryId: selectedCategory || undefined,
    search: search || undefined,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <StoreSearchBar value={search} onChange={setSearch} />
        <StoreCategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-semibold mb-2">No products found</h3>
          <p className="text-sm text-muted-foreground">
            {search ? "Try a different search term" : "Products will appear here once added"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <StoreProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreProductGrid;
