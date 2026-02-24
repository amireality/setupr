import { useParams, Link } from "react-router-dom";
import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import StorePlanTable from "@/components/store/StorePlanTable";
import { useStoreProduct, useStoreProductPlans, formatStorePrice } from "@/hooks/useStoreProducts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cloud, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { getVendorLogo } from "@/lib/vendorLogos";

const StoreProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useStoreProduct(slug || "");
  const { data: plans = [] } = useStoreProductPlans(product?.id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <StoreNavbar />
        <div className="pt-24 pb-16 container px-4 md:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="h-12 w-96 bg-secondary rounded" />
            <div className="h-24 w-full max-w-2xl bg-secondary rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <StoreNavbar />
        <div className="pt-24 pb-16 container px-4 md:px-6 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/store/products">Browse Products</Link>
          </Button>
        </div>
        <StoreFooter />
      </div>
    );
  }

  const billingLabel = product.billing_cycle === "monthly" ? "/mo" : product.billing_cycle === "annual" ? "/yr" : "";

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <Link
            to="/store/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-4 mb-4">
                {(() => {
                  const logoUrl = getVendorLogo(product.vendor, product.vendor_logo_url);
                  return logoUrl ? (
                    <img src={logoUrl} alt={product.vendor} className="w-14 h-14 rounded-xl object-contain bg-secondary p-2" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                      {product.vendor.charAt(0)}
                    </div>
                  );
                })()}
                <div>
                  <span className="text-sm text-muted-foreground">{product.vendor}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize">
                    {product.product_type}
                  </span>
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-8">{product.short_description}</p>

              {product.long_description && (
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-muted-foreground whitespace-pre-wrap">{product.long_description}</p>
                </div>
              )}

              {/* Plans */}
              {plans.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-bold mb-6">Available Plans</h2>
                  <StorePlanTable plans={plans} />
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">₹{formatStorePrice(product.base_price_inr)}</span>
                    <span className="text-muted-foreground">{billingLabel}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">+ 18% GST</span>
                </div>

                <Button className="w-full mb-4" disabled>
                  Buy Now — Coming Soon
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>

                <div className="mt-6 space-y-3 pt-6 border-t border-border/50">
                  {[
                    { icon: Shield, text: "Authorized Reseller" },
                    { icon: Cloud, text: "Instant License Delivery" },
                    { icon: Headphones, text: "Dedicated Support" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

export default StoreProductDetail;
