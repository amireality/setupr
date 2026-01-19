import { Rocket, Globe, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useDbBundles, useDbServices, formatPrice, calculateDbTotal } from "@/hooks/useServices";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Globe,
  Zap,
};

const BundleSkeleton = ({ gradient, title, subtitle }: { gradient: string; title: string; subtitle: string }) => (
  <div className={cn(
    "w-full h-24 md:h-28 rounded-xl bg-gradient-to-br shrink-0 relative overflow-hidden",
    gradient
  )}>
    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2)_0%,transparent_60%)]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
      <span className="font-display text-lg md:text-2xl font-bold text-foreground">{title}</span>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    </div>
  </div>
);

const RecommendedBundles = () => {
  const { data: bundles = [], isLoading: bundlesLoading } = useDbBundles();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();

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
            Most founders start here
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Not sure what to choose? Start here. You can customize later.
          </p>
        </motion.div>

        {/* Bento Grid Layout matching reference:
            Row 1: [Bundle 1 - wide] [Bundle 2 - tall, spans 2 rows]
            Row 2: [Bundle 3 - small]
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {bundles.map((bundle, index) => {
            const Icon = iconMap[bundle.icon] || Rocket;
            const individualTotal = calculateDbTotal(services, bundle.included_service_ids);
            const savings = individualTotal - bundle.bundle_setupr_fee;
            
            // Define grid positions
            const gridClasses = [
              "md:col-span-2 md:row-span-1", // Bundle 1 - wide
              "md:col-span-1 md:row-span-2", // Bundle 2 - tall
              "md:col-span-1 md:row-span-1", // Bundle 3 - small
            ];
            
            return (
              <motion.div
                key={bundle.bundle_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={gridClasses[index % 3]}
              >
                <Link
                  to={`/services?bundle=${bundle.bundle_id}`}
                  className={cn(
                    "block rounded-2xl group/bento transition-all duration-300 p-4 md:p-5",
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
                  
                  <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn(
                        "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                        "bg-background/50 group-hover/bento:bg-primary/20"
                      )}>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-base md:text-lg font-semibold text-foreground">
                          {bundle.bundle_name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {bundle.who_its_for}
                        </p>
                      </div>
                    </div>
                    
                    {bundle.included_service_ids.length > 0 && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {bundle.govt_fee_note}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/20">
                      {bundle.bundle_setupr_fee > 0 && (
                        <div>
                          <p className="text-base md:text-lg font-semibold text-foreground">
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