import { FileText, Globe, Shield } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";

const services = [
  {
    icon: FileText,
    title: "Business Formation",
    description: "Proprietorship, LLP, or Private Limited — all registrations handled professionally.",
    features: ["GST & MSME Registration", "PAN / TAN Assistance", "Entity Selection"],
  },
  {
    icon: Globe,
    title: "Digital Presence",
    description: "Website, domain, business email, and brand assets for instant credibility.",
    features: ["Professional Website", "Domain & Email", "Brand Assets"],
  },
  {
    icon: Shield,
    title: "Foundational Compliance",
    description: "Mandatory registrations and annual filing guidance to stay compliant.",
    features: ["Registrations", "Filing Guidance", "Expansion Ready"],
  },
];

const ServicePillars = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/4 rounded-full blur-[150px]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header - asymmetric */}
        <div className="max-w-xl mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Operate
          </h2>
          <p className="text-muted-foreground text-lg">
            Three pillars covering the foundation of a legitimate business.
          </p>
        </div>

        {/* Asymmetric grid layout */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl">
          {services.map((service, index) => {
            const Icon = service.icon;
            const offsetClass = index === 1 ? "lg:translate-y-8" : index === 2 ? "lg:translate-y-4" : "";

            return (
              <div
                key={service.title}
                className={`group relative ${offsetClass}`}
              >
                {/* Glass card with image background */}
                <div 
                  className="relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundImage: `url(${glassCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-2xl border border-border/40 group-hover:border-primary/20 transition-colors duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-shadow duration-500">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span 
                          key={feature} 
                          className="px-3 py-1 text-xs font-medium text-foreground/80 bg-secondary/50 rounded-full border border-border/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note - right aligned for asymmetry */}
        <div className="max-w-6xl mt-16">
          <p className="text-muted-foreground text-sm text-right">
            Choose what you need today. Combine services as your business grows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
