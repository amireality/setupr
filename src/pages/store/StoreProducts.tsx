import StoreNavbar from "@/components/store/StoreNavbar";
import { Helmet } from "react-helmet-async";
import StoreFooter from "@/components/store/StoreFooter";
import StoreProductGrid from "@/components/store/StoreProductGrid";

const StoreProducts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>All Products | Setupr Cloud Marketplace</title>
        <meta name="description" content="Browse our complete catalog of cloud software and business tools." />
        <link rel="canonical" href="https://setupr.com/store/products" />
      </Helmet>
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
