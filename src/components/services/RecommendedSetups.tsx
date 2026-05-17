import { Rocket, Globe, Zap, ArrowRight, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { DbBundle, DbService } from "@/hooks/useServices";
import { formatPrice, calculateDbTotal } from "@/hooks/useServices";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Globe,
  Zap,
};

// Unique gradient meshes for each bundle card
const bundleGradients = [
  "linear-gradient(135deg, hsl(24 95% 53% / 0.15) 0%, hsl(280 60% 50% / 0.08) 50%, hsl(200 80% 50% / 0.05) 100%)",
  "linear-gradient(135deg, hsl(200 80% 50% / 0.12) 0%, hsl(24 95% 53% / 0.10) 50%, hsl(160 60% 45% / 0.06) 100%)",
  "linear-gradient(135deg, hsl(160 60% 45% / 0.10) 0%, hsl(280 60% 50% / 0.08) 50%, hsl(24 95% 53% / 0.12) 100%)",
];

interface RecommendedSetupsProps {
  selectedServices: Set<string>;
  onApply: (services: string[]) => void;
  bundles: DbBundle[];
  services: DbService[];
}

const RecommendedSetups = ({ selectedServices, onApply, bundles, services }: RecommendedSetupsProps) => {
  const isRecommendationActive = (serviceIds: string[]) => {
    if (serviceIds.length === 0) return selectedServices.size <= 1;
    return serviceIds.every(s => selectedServices.has(s)) && 
           serviceIds.length === selectedServices.size;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/6 w-[300px] h-[300px] bg-primary/2 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-xs font-medium text-primary mb-5">
            <Sparkles className="w-3 h-3" />
            Curated for new founders
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Common combinations
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Pre-configured service packs designed for the most common business setup scenarios. One click to select everything you need.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
          {bundles.map((bundle, idx) => {
            const Icon = iconMap[bundle.icon] || Rocket;
            const isActive = isRecommendationActive(bundle.included_service_ids);
            const individualTotal = calculateDbTotal(services, bundle.included_service_ids);
            const savings = individualTotal - bundle.bundle_setupr_fee;
            
            return (
              <motion.button
                key={bundle.bundle_id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                  delay: idx * 0.1,
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onApply(bundle.included_service_ids)}
                className={cn(
                  "rounded-2xl group/bento transition-all duration-300 p-5 text-left relative overflow-hidden",
                  "backdrop-blur-sm border",
                  isActive 
                    ? "border-primary/40 shadow-glow bg-secondary/50" 
                    : "border-border/15 bg-secondary/30 hover:border-primary/25 hover:shadow-glow-sm"
                )}
              >
                {/* Animated gradient mesh background */}
                <div
                  className="absolute inset-0 gradient-mesh opacity-60 rounded-2xl"
                  style={{
                    background: bundleGradients[idx % bundleGradients.length],
                  }}
                />

                {/* Decorative glow orb */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/8 rounded-full blur-3xl group-hover/bento:bg-primary/12 transition-colors duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300",
                    isActive 
                      ? "gradient-accent shadow-glow-sm" 
                      : "bg-background/40 border border-border/20 group-hover/bento:border-primary/30"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6 transition-colors",
                      isActive ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                  
                  {/* Title and description */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {bundle.bundle_name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                    {bundle.who_its_for}
                  </p>
                  
                  {/* Pricing */}
                  {bundle.bundle_setupr_fee > 0 && (
                    <div className="mb-4 pt-4 border-t border-border/15">
                      <p className="text-xl font-display font-bold text-foreground">
                        From ₹{formatPrice(bundle.bundle_setupr_fee)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Final quote shared after a quick call
                      </p>
                    </div>
                  )}
                  
                  {bundle.included_service_ids.length > 0 && (
                    <p className="text-xs text-muted-foreground/70">
                      {bundle.govt_fee_note}
                    </p>
                  )}

                  {/* Apply indicator */}
                  <div className={cn(
                    "mt-4 flex items-center gap-2 text-xs font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/60 group-hover/bento:text-primary/80"
                  )}>
                    {isActive ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Currently selected</span>
                      </>
                    ) : (
                      <>
                        <span>Select this bundle</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/bento:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default RecommendedSetups;
