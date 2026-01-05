import { FileText, Globe, Shield } from "lucide-react";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";
import glassCardBg from "@/assets/glass-card-bg.png";

const services = [
  {
    icon: FileText,
    title: "Business Formation",
    features: ["GST & MSME Registration", "FSSAI / PAN Assistance", "Entity Selection"],
  },
  {
    icon: Globe,
    title: "Digital Presence",
    features: ["Website", "Domain", "Brand Assets", "Pownd External Compliance"],
  },
  {
    icon: Shield,
    title: "Foundational Compliance",
    features: ["Registrations", "Filing Guidance", "Filing Guidance", "Foundational Guidance"],
  },
];

const ServicePillars = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Layered geometric background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${layeredEdgeBg})` }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Everything You Need to Operate
          </h2>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${glassCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 backdrop-blur-sm bg-secondary/50 border border-border/30 rounded-2xl" />
                  
                  {/* Warm corner glow */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/15 rounded-full blur-2xl" />

                  <div className="relative z-10 p-6 md:p-7">
                    {/* Icon and title row */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {service.title}
                      </h3>
                    </div>

                    {/* Feature chips */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 text-xs font-medium text-foreground/80 bg-secondary/60 backdrop-blur-sm rounded-lg border border-border/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
