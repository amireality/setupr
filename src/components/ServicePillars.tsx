import { FileText, Globe, Shield } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Business Formation",
    description: "LLC setup, EIN registration, operating agreements, and all the paperwork handled for you.",
    features: ["Entity Selection", "State Registration", "EIN Filing"],
  },
  {
    icon: Globe,
    title: "Digital Presence",
    description: "Professional website, domain setup, business email, and branded digital assets.",
    features: ["Custom Website", "Domain & Email", "Brand Assets"],
  },
  {
    icon: Shield,
    title: "Compliance & Growth",
    description: "Stay compliant with annual filings, tax prep guidance, and ongoing business support.",
    features: ["Annual Reports", "Tax Guidance", "Ongoing Support"],
  },
];

const ServicePillars = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Operate
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three core pillars that cover every aspect of building a legitimate business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-all duration-500">
                  <Icon className="w-8 h-8 text-primary-foreground" />
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
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
