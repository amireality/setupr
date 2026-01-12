import { FileText, Globe, Shield, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";

const Skeleton = ({ variant, label, sublabel }: { variant: "formation" | "digital" | "compliance" | "support"; label: string; sublabel: string }) => {
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
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <span className="text-2xl md:text-3xl font-bold font-display text-primary">{label}</span>
        <span className="text-xs md:text-sm text-muted-foreground mt-1">{sublabel}</span>
      </div>
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
    title: "Business formation",
    description: (
      <>
        Get your business registered with the right structure. We handle Pvt Ltd, LLP, OPC, and Proprietorship registrations with GST, PAN/TAN, and MSME.
        <FeatureChips features={["Company Registration", "GST", "MSME", "PAN/TAN"]} />
      </>
    ),
    header: <Skeleton variant="formation" label="7-15 Days" sublabel="Typical registration time" />,
    className: "md:col-span-2",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    title: "Digital presence",
    description: (
      <>
        Your professional website, domain, and business email — all set up and ready. Mobile-responsive design with hosting included.
        <FeatureChips features={["Website", "Domain", "Email", "Hosting"]} />
      </>
    ),
    header: <Skeleton variant="digital" label="24-48 Hrs" sublabel="Website setup time" />,
    className: "md:col-span-1",
    icon: <Globe className="h-5 w-5 text-primary" />,
  },
  {
    title: "Basic compliance",
    description: (
      <>
        Never miss a deadline. We handle annual filings, GST returns, and keep you 100% compliant with government requirements.
        <FeatureChips features={["Annual Filings", "GST Returns", "Reminders"]} />
      </>
    ),
    header: <Skeleton variant="compliance" label="100%" sublabel="Compliance rate" />,
    className: "md:col-span-1",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    title: "Ongoing help",
    description: (
      <>
        We stay available for questions, updates, and renewals. Direct liaison with government departments and expert CA/CS assistance.
        <FeatureChips features={["365 Days Support", "Expert CA/CS", "Renewals"]} />
      </>
    ),
    header: <Skeleton variant="support" label="365 Days" sublabel="Year-round support" />,
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
            What we help with
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