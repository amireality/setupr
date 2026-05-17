import StoreNavbar from "@/components/store/StoreNavbar";
import { Helmet } from "react-helmet-async";
import StoreHero from "@/components/store/StoreHero";
import StoreFooter from "@/components/store/StoreFooter";
import StoreProductCard from "@/components/store/StoreProductCard";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { useStoreCategories } from "@/hooks/useStoreCategories";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const StoreLanding = () => {
  const { data: featuredProducts = [] } = useStoreProducts({ featured: true });
  const { data: categories = [] } = useStoreCategories();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Setupr Cloud Marketplace | SaaS & Business Tools</title>
        <meta name="description" content="Shop official cloud software, email services, and business tools for your startup." />
        <link rel="canonical" href="https://setupr.com/store" />
      </Helmet>
      <StoreNavbar />
      <StoreHero />

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/store/products?category=${cat.id}`}
                    className="glass-card glass-card-hover rounded-xl p-6 text-center block hover-lift transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{cat.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Button variant="ghost" size="sm" asChild className="group">
                <Link to="/store/products">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product, i) => (
                <StoreProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {featuredProducts.length === 0 && categories.length === 0 && (
        <section className="py-24">
          <div className="container px-4 md:px-6 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="font-display text-2xl font-bold mb-3">Store Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We're adding products to the marketplace. Check back soon for Microsoft 365, Adobe, AWS, and more.
            </p>
            <Button asChild>
              <Link to="/contact">Get Notified</Link>
            </Button>
          </div>
        </section>
      )}

      <StoreFooter />
    </div>
  );
};

export default StoreLanding;
