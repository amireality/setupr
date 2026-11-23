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
    <section className="py-20 md:py-28 relative border-t border-white/[0.06] bg-black/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/[0.08] bg-[#0c0d12]/80 p-8 md:p-12 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-mono mb-4">
                <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                <span>Cloud Marketplace</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Enterprise Cloud &amp; SaaS Provisioning
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-lg mb-6 leading-relaxed">
                Direct provisioning for Microsoft 365, Google Workspace, Adobe Creative Cloud, AWS cloud credits, and Zoho One. Localized billing, corporate tax compliance, and instant onboarding.
              </p>
              <Button variant="hero" size="lg" asChild className="rounded-xl px-7 shadow-sm group">
                <Link to="/store" className="inline-flex items-center gap-2">
                  Browse Cloud Store
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Vendor logos grid */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              {vendorLogos.map((vendor) => (
                <motion.div
                  key={vendor.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-center p-3 transition-colors shadow-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={vendor.url}
                    alt={vendor.name}
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
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
