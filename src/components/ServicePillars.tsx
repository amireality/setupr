import { FileText, Globe, Shield, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";

const Skeleton = ({ variant }: { variant: "formation" | "digital" | "compliance" | "support" }) => {
  const patterns = {
    formation: "from-primary/20 via-primary/5 to-transparent",
    digital: "from-transparent via-primary/15 to-primary/10",
    compliance: "from-primary/10 via-transparent to-primary/15",
    support: "from-primary/15 via-primary/10 to-transparent",
  };

  return (
    <div
      className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${patterns[variant]} border border-border/20 relative overflow-hidden`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary) / 0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/25 rounded-full blur-3xl group-hover/bento:w-28 group-hover/bento:h-28 transition-all duration-500" />
    </div>
  );
};

const FeatureChips = ({ features }: { features: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {features.map((feature, idx) => (
      <span
        key={idx}
        className="px-2.5 py-1 text-xs font-medium text-foreground/80 bg-secondary/60 backdrop-blur-sm rounded-lg border border-border/30"
      >
        {feature}
      </span>
    ))}
  </div>
);

const items = [
  {
    title: "Business Formation",
    description: (
      <>
        Launch with proper legal structure and essential registrations.
        <FeatureChips features={["GST & MSME Registration", "FSSAI / PAN Assistance", "Entity Selection"]} />
      </>
    ),
    header: <Skeleton variant="formation" />,
    className: "md:col-span-2",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    title: "Digital Presence",
    description: (
      <>
        Establish your online identity with professional assets.
        <FeatureChips features={["Website", "Domain", "Brand Assets"]} />
      </>
    ),
    header: <Skeleton variant="digital" />,
    className: "md:col-span-1",
    icon: <Globe className="h-5 w-5 text-primary" />,
  },
  {
    title: "Foundational Compliance",
    description: (
      <>
        Stay compliant from day one with proper filings.
        <FeatureChips features={["Registrations", "Filing Guidance"]} />
      </>
    ),
    header: <Skeleton variant="compliance" />,
    className: "md:col-span-1",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    title: "Ongoing Support",
    description: (
      <>
        Continuous assistance as your business grows and evolves.
        <FeatureChips features={["Advisory", "Updates", "Renewals"]} />
      </>
    ),
    header: <Skeleton variant="support" />,
    className: "md:col-span-2",
    icon: <Layers className="h-5 w-5 text-primary" />,
  },
];

const ServicePillars = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Layered geometric background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${layeredEdgeBg})` }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Everything you need to operate
          </h2>

          {/* Bento Grid */}
          <BentoGrid className="md:auto-rows-[18rem]">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
