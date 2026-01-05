import { FileText, Globe, Shield } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";
import gridGlowBg from "@/assets/grid-glow-bg.png";

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
    <section className="py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Visual anchor - grid background at low opacity */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          backgroundImage: `url(${gridGlowBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      
      {/* Top section boundary - gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-secondary/30 to-transparent" />
      
      {/* Grounding surface for cards */}
      <div className="absolute top-1/3 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header - asymmetric */}
        <div className="max-w-xl mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Everything You Need to Operate
          </h2>
          <p className="text-muted-foreground text-lg">
            Three pillars covering the foundation of a legitimate business.
          </p>
        </div>

        {/* Cards grounded on a subtle surface */}
        <div className="relative">
          {/* Surface underneath cards */}
          <div className="absolute -inset-4 md:-inset-8 rounded-3xl bg-secondary/30 -z-10" />
          
          {/* Asymmetric grid layout - varied gaps */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl">
            {services.map((service, index) => {
              const Icon = service.icon;
              const offsetClass = index === 1 ? "lg:-translate-y-3" : index === 2 ? "lg:translate-y-2" : "";

              return (
                <div
                  key={service.title}
                  className={`group relative ${offsetClass}`}
                >
                  {/* Glass card with image background */}
                  <div 
                    className="relative rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    style={{
                      backgroundImage: `url(${glassCardBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Glass overlay */}
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
                    
                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-colors duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mb-5 shadow-lg group-hover:shadow-glow transition-shadow duration-500">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>

                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* Feature pills */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span 
                            key={feature} 
                            className="px-3 py-1 text-xs font-medium text-foreground/80 bg-secondary/60 rounded-full border border-border/40"
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
        </div>

        {/* Bottom note - right aligned for asymmetry */}
        <div className="max-w-6xl mt-10">
          <p className="text-muted-foreground text-sm text-right">
            Choose what you need today. Combine services as your business grows.
          </p>
        </div>
      </div>
      
      {/* Bottom section boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
    </section>
  );
};

export default ServicePillars;
