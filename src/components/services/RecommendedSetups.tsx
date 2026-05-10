import { Rocket, Globe, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DbBundle, DbService } from "@/hooks/useServices";
import { formatPrice, calculateDbTotal } from "@/hooks/useServices";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Globe,
  Zap,
};

interface RecommendedSetupsProps {
  selectedServices: Set<string>;
  onApply: (services: string[]) => void;
  bundles: DbBundle[];
  services: DbService[];
}

const RecommendationSkeleton = ({ gradient }: { gradient: string }) => (
  <div className={cn(
    "w-full h-24 rounded-xl bg-gradient-to-br shrink-0",
    gradient
  )}>
    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15)_0%,transparent_60%)]" />
  </div>
);

const RecommendedSetups = ({ selectedServices, onApply, bundles, services }: RecommendedSetupsProps) => {
  const isRecommendationActive = (serviceIds: string[]) => {
    if (serviceIds.length === 0) return selectedServices.size <= 1;
    return serviceIds.every(s => selectedServices.has(s)) && 
           serviceIds.length === selectedServices.size;
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Common combinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Or select individual services above
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
          {bundles.map((bundle) => {
            const Icon = iconMap[bundle.icon] || Rocket;
            const isActive = isRecommendationActive(bundle.included_service_ids);
            const individualTotal = calculateDbTotal(services, bundle.included_service_ids);
            const savings = individualTotal - bundle.bundle_setupr_fee;
            
            return (
              <button
                key={bundle.bundle_id}
                onClick={() => onApply(bundle.included_service_ids)}
                className={cn(
                  "row-span-1 rounded-2xl group/bento transition-all duration-300 p-4 text-left",
                  "bg-secondary/40 backdrop-blur-sm border border-border/20",
                  "flex flex-col overflow-hidden",
                  isActive 
                    ? "border-primary/50 shadow-glow" 
                    : "hover:shadow-glow hover:border-primary/40"
                )}
              >
                <RecommendationSkeleton gradient={bundle.gradient} />
                
                <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                    isActive 
                      ? "gradient-accent shadow-glow" 
                      : "bg-background/50 group-hover/bento:bg-primary/20"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                  
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {bundle.bundle_name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {bundle.who_its_for}
                  </p>
                  
                  {bundle.bundle_setupr_fee > 0 && (
                    <div className="space-y-1 mb-3">
                      <p className="text-lg font-semibold text-foreground">
                        From ₹{formatPrice(bundle.bundle_setupr_fee)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Final quote shared after a quick call
                      </p>
                    </div>
                  )}
                  
                  {bundle.included_service_ids.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {bundle.govt_fee_note}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSetups;
