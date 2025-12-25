import { Rocket, Briefcase, Zap } from "lucide-react";
import type { ServiceId } from "@/pages/Services";

interface Recommendation {
  title: string;
  description: string;
  icon: React.ElementType;
  services: ServiceId[];
  highlights: string[];
}

const recommendations: Recommendation[] = [
  {
    title: "Business Launch Stack",
    description: "Everything to launch your registered business online",
    icon: Rocket,
    services: ["proprietorship", "website", "google-business"],
    highlights: ["Company Registration", "Website", "Google Business Profile"],
  },
  {
    title: "Professional Presence Stack",
    description: "Build a credible digital identity",
    icon: Briefcase,
    services: ["website", "domain-hosting", "email", "brand-identity"],
    highlights: ["Website", "Domain & Email", "Brand Basics"],
  },
  {
    title: "Single Service",
    description: "I only need one service right now",
    icon: Zap,
    services: [],
    highlights: ["Pick exactly what you need", "Add more anytime", "No pressure"],
  },
];

interface RecommendedSetupsProps {
  selectedServices: Set<ServiceId>;
  onApply: (services: ServiceId[]) => void;
}

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
            Recommended Setups
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Popular combinations to get you started faster
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {recommendations.map((rec, index) => {
            const isActive = isRecommendationActive(rec.services);
            return (
              <button
                key={rec.title}
                onClick={() => onApply(rec.services)}
                className={`
                  p-6 rounded-2xl text-left transition-all duration-300 group glass-card
                  ${isActive 
                    ? "border-primary/50 shadow-glow" 
                    : "glass-card-hover"
                  }
                  animate-fade-up-delay-${index + 1}
                `}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                  ${isActive 
                    ? "gradient-accent shadow-glow" 
                    : "bg-secondary group-hover:bg-secondary/80"
                  }
                `}>
                  <rec.icon className={`w-6 h-6 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {rec.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {rec.description}
                </p>
                
                <ul className="space-y-2">
                  {rec.highlights.map((highlight) => (
                    <li key={highlight} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSetups;
