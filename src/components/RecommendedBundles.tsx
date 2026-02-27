import { Rocket, Globe, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useDbBundles, useDbServices, formatPrice, calculateDbTotal } from "@/hooks/useServices";
import { motion } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Globe,
  Zap,
};

const BundleSkeleton = ({ gradient, title, subtitle }: { gradient: string; title: string; subtitle: string }) => (
  <div className={cn(
    "w-full h-20 md:h-24 rounded-xl bg-gradient-to-br shrink-0 relative overflow-hidden",
    gradient
  )}>
    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2)_0%,transparent_60%)]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
      <span className="font-display text-lg md:text-xl font-bold text-foreground">{title}</span>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    </div>
  </div>
);

const RecommendedBundles = () => {
  const { data: bundles = [], isLoading: bundlesLoading } = useDbBundles();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const sectionTitle = settings.find(s => s.key === "homepage_bundles_title")?.value || "Popular service bundles for new businesses";
  const sectionSubtitle = settings.find(s => s.key === "homepage_bundles_subtitle")?.value || "Save money with pre-built packages. Includes company registration, GST, digital presence, and compliance essentials.";

  if (bundlesLoading || servicesLoading) {
    return (
      <section className="py-20 md:py-28 relative">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (bundles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-28 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance">
            Popular service <span className="text-primary">bundles</span> for new businesses
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* 2x2 Grid Layout: Bundle1 | Bundle2, Bundle3 | (empty) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {bundles.map((bundle, index) => {
            const Icon = iconMap[bundle.icon] || Rocket;
            const individualTotal = calculateDbTotal(services, bundle.included_service_ids);
            const savings = individualTotal - bundle.bundle_setupr_fee;
            
            return (
              <motion.div
                key={bundle.bundle_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/services?bundle=${bundle.bundle_id}`}
                  className={cn(
                    "block rounded-2xl group/bento transition-all duration-300 p-4",
                    "bg-secondary/40 backdrop-blur-sm border border-border/20",
                    "hover:shadow-glow hover:border-primary/40",
                    "hover:scale-[1.02] hover:-translate-y-1",
                    "h-full flex flex-col"
                  )}
                >
                  <BundleSkeleton 
                    gradient={bundle.gradient} 
                    title={`₹${formatPrice(bundle.bundle_setupr_fee)}`} 
                    subtitle="Bundle price" 
                  />
                  
                  <div className="group-hover/bento:translate-x-2 transition duration-200 mt-3 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={cn(
                        "w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                        "bg-background/50 group-hover/bento:bg-primary/20"
                      )}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-sm md:text-base font-semibold text-foreground">
                          {bundle.bundle_name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bundle.who_its_for}
                        </p>
                      </div>
                    </div>
                    
                    {bundle.included_service_ids.length > 0 && (
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {bundle.govt_fee_note}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/20">
                      {bundle.bundle_setupr_fee > 0 && (
                        <div>
                          <p className="text-sm md:text-base font-semibold text-foreground">
                            ₹{formatPrice(bundle.bundle_setupr_fee)}
                          </p>
                          {savings > 0 && (
                            <p className="text-xs text-primary">
                              Save ₹{formatPrice(savings)}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-primary text-sm font-medium">
                        View <ArrowRight className="w-4 h-4 group-hover/bento:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedBundles;