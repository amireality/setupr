import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import StoreProductGrid from "@/components/store/StoreProductGrid";

const StoreProducts = () => {
  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">
              Browse our complete catalog of cloud software and business tools.
            </p>
          </div>
          <StoreProductGrid />
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

export default StoreProducts;
