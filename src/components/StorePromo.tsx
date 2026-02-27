import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const vendorLogos = [
  { name: "Microsoft", url: "/images/vendors/microsoft.svg" },
  { name: "Google", url: "/images/vendors/google.svg" },
  { name: "Adobe", url: "/images/vendors/adobe.svg" },
  { name: "AWS", url: "/images/vendors/amazon.svg" },
  { name: "Zoho", url: "/images/vendors/zoho.svg" },
];

const StorePromo = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <ShoppingBag className="w-4 h-4" />
                Cloud Marketplace
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Software & cloud <span className="text-primary">licenses</span>,{" "}
                instantly delivered
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-6">
                Microsoft 365, Google Workspace, Adobe Creative Cloud, AWS credits, and more — all at competitive reseller pricing with instant activation.
              </p>
              <Button variant="hero" size="lg" asChild className="shadow-glow group">
                <Link to="/store">
                  Browse Store
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Vendor logos grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
              {vendorLogos.map((vendor) => (
                <motion.div
                  key={vendor.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center p-2.5 border border-border/30"
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={vendor.url}
                    alt={vendor.name}
                    className="w-full h-full object-contain opacity-70"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorePromo;
