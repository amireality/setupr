import { Rocket, Briefcase, Zap } from "lucide-react";
import type { ServiceId } from "@/pages/Services";
import { cn } from "@/lib/utils";

interface Recommendation {
  title: string;
  description: string;
  icon: React.ElementType;
  services: ServiceId[];
  highlights: string[];
  gradient: string;
}

const recommendations: Recommendation[] = [
  {
    title: "New business",
    description: "Registration, website, and Google presence",
    icon: Rocket,
    services: ["proprietorship", "website", "google-business"],
    highlights: ["Company registration", "Website", "Google Business"],
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    title: "Professional online presence",
    description: "Website, email, and brand basics",
    icon: Briefcase,
    services: ["website", "domain-hosting", "email", "brand-identity"],
    highlights: ["Website", "Domain & email", "Brand identity"],
    gradient: "from-accent/20 via-accent/10 to-transparent",
  },
  {
    title: "Just one thing",
    description: "Pick exactly what you need",
    icon: Zap,
    services: [],
    highlights: ["Choose one service", "Add more later", "No pressure"],
    gradient: "from-secondary/40 via-secondary/20 to-transparent",
  },
];

interface RecommendedSetupsProps {
  selectedServices: Set<ServiceId>;
  onApply: (services: ServiceId[]) => void;
}

const RecommendationSkeleton = ({ gradient }: { gradient: string }) => (
  <div className={cn(
    "w-full h-24 rounded-xl bg-gradient-to-br shrink-0",
    gradient
  )}>
    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15)_0%,transparent_60%)]" />
  </div>
);

const RecommendedSetups = ({ selectedServices, onApply }: RecommendedSetupsProps) => {
  const isRecommendationActive = (services: ServiceId[]) => {
    if (services.length === 0) return selectedServices.size <= 1;
    return services.every(s => selectedServices.has(s)) && 
           services.length === selectedServices.size;
  };

  return (
    <section className="py-24 relative">
      {/* Background accent */}
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
          {recommendations.map((rec) => {
            const isActive = isRecommendationActive(rec.services);
            return (
              <button
                key={rec.title}
                onClick={() => onApply(rec.services)}
                className={cn(
                  "row-span-1 rounded-2xl group/bento transition-all duration-300 p-4 text-left",
                  "bg-secondary/40 backdrop-blur-sm border border-border/20",
                  "flex flex-col overflow-hidden",
                  isActive 
                    ? "border-primary/50 shadow-glow" 
                    : "hover:shadow-glow hover:border-primary/40"
                )}
              >
                {/* Header skeleton */}
                <RecommendationSkeleton gradient={rec.gradient} />
                
                <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                    isActive 
                      ? "gradient-accent shadow-glow" 
                      : "bg-background/50 group-hover/bento:bg-primary/20"
                  )}>
                    <rec.icon className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                  
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {rec.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {rec.highlights.map((highlight) => (
                      <li key={highlight} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
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
