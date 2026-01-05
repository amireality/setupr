import { FileText, Globe, Shield } from "lucide-react";

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
    <section className="py-16 md:py-20 relative">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Everything You Need to Operate
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Three pillars covering the foundation of a legitimate business.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group relative rounded-xl p-6 bg-secondary/40 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-border/50 hover:bg-secondary/50"
                >
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center mb-5 shadow-lg group-hover:shadow-glow transition-shadow duration-300">
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
                        className="px-3 py-1 text-xs font-medium text-foreground/70 bg-background/50 rounded-full border border-border/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <p className="text-muted-foreground text-sm mt-8 text-center md:text-right">
            Choose what you need today. Combine services as your business grows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;