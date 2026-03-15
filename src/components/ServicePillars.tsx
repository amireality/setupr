import { FileText, Globe, Shield, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const iconMap: Record<string, React.ElementType> = { FileText, Globe, Shield, Layers };
const iconOrder = ["FileText", "Globe", "Shield", "Layers"];

const Skeleton = ({ variant, label, sublabel }: { variant: string; label: string; sublabel: string }) => {
  const patterns: Record<string, string> = {
    formation: "from-primary/20 via-primary/5 to-transparent",
    digital: "from-transparent via-primary/15 to-primary/10",
    compliance: "from-primary/10 via-transparent to-primary/15",
    support: "from-primary/15 via-primary/10 to-transparent",
  };

  return (
    <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${patterns[variant] || patterns.formation} border border-border/20 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary) / 0.4) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/25 rounded-full blur-3xl group-hover/bento:w-28 group-hover/bento:h-28 transition-all duration-500" />
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
      <span key={idx} className="px-2.5 py-1 text-xs font-medium text-foreground/80 bg-secondary/60 backdrop-blur-sm rounded-lg border border-border/30">
        {feature}
      </span>
    ))}
  </div>
);

interface PillarData {
  title: string;
  description: string;
  features: string[];
  variant: string;
  statLabel: string;
  statSublabel: string;
}

const defaultPillars: PillarData[] = [
  { title: "Business formation", description: "Get your business registered with the right structure. We handle Pvt Ltd, LLP, OPC, and Proprietorship registrations with GST, PAN/TAN, and MSME.", features: ["Company Registration", "GST", "MSME", "PAN/TAN"], variant: "formation", statLabel: "7-15 Days", statSublabel: "Typical registration time" },
  { title: "Digital presence", description: "Your professional website, domain, and business email, all set up and ready. Mobile-responsive design with hosting included.", features: ["Website", "Domain", "Email", "Hosting"], variant: "digital", statLabel: "24-48 Hrs", statSublabel: "Website setup time" },
  { title: "Basic compliance", description: "Never miss a deadline. We handle annual filings, GST returns, and keep you 100% compliant with government requirements.", features: ["Annual Filings", "GST Returns", "Reminders"], variant: "compliance", statLabel: "100%", statSublabel: "Compliance rate" },
  { title: "Ongoing help", description: "We stay available for questions, updates, and renewals. Direct liaison with government departments and expert CA/CS assistance.", features: ["365 Days Support", "Expert CA/CS", "Renewals"], variant: "support", statLabel: "365 Days", statSublabel: "Year-round support" },
];

const colSpans = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

const ServicePillars = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const sectionTitle = settings.find(s => s.key === "homepage_service_pillars_title")?.value || "What we help with";
  const pillarsJson = settings.find(s => s.key === "homepage_service_pillars")?.value;
  const pillars: PillarData[] = pillarsJson ? (() => { try { return JSON.parse(pillarsJson); } catch { return defaultPillars; } })() : defaultPillars;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${layeredEdgeBg})` }} />
      <div className="absolute inset-0 bg-background/80" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            {sectionTitle}
          </h2>
          <BentoGrid className="md:auto-rows-[18rem]">
            {pillars.map((pillar, i) => {
              const Icon = iconMap[iconOrder[i]] || FileText;
              return (
                <BentoGridItem
                  key={i}
                  title={pillar.title}
                  description={<>{pillar.description}<FeatureChips features={pillar.features} /></>}
                  header={<Skeleton variant={pillar.variant} label={pillar.statLabel} sublabel={pillar.statSublabel} />}
                  className={colSpans[i] || "md:col-span-1"}
                  icon={<Icon className="h-5 w-5 text-primary" />}
                />
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
