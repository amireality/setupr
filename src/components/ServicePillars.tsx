import { FileText, Globe, Shield } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Business Formation",
    description: "Proprietorship, LLP, or Private Limited setup with all registrations handled professionally.",
    features: ["GST & MSME Registration", "PAN / TAN Assistance", "Entity Selection & Setup"],
  },
  {
    icon: Globe,
    title: "Digital Presence",
    description: "Professional website, domain setup, business email, and basic brand assets to establish credibility.",
    features: ["Professional Website", "Domain & Business Email", "Basic Brand Assets"],
  },
  {
    icon: Shield,
    title: "Foundational Compliance",
    description: "Mandatory registrations, annual filing guidance, and expansion readiness support.",
    features: ["Mandatory Registrations", "Annual Filing Guidance", "Expansion Readiness"],
  },
];

const ServicePillars = () => {
  return (
    <section className="py-28 bg-secondary/30 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance">
            Everything You Need to Operate
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three core pillars that cover the foundation of a legitimate business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative rounded-2xl p-8 glass-card glass-card-hover transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-all duration-500">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground mt-16 text-lg">
          Choose what you need today. Combine services as your business grows.
        </p>
      </div>
    </section>
  );
};

export default ServicePillars;
