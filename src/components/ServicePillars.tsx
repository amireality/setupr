import { FileText, Globe, Shield, Layers } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const iconMap: Record<string, React.ElementType> = { FileText, Globe, Shield, Layers };
const iconOrder = ["FileText", "Globe", "Shield", "Layers"];

const Skeleton = ({ label, sublabel }: { variant: string; label: string; sublabel: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden items-center justify-center p-4 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-bold font-display text-primary tracking-tight">{label}</span>
        <span className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">{sublabel}</span>
      </div>
    </div>
  );
};

const FeatureChips = ({ features }: { features: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {features.map((feature, idx) => (
      <span key={idx} className="px-2.5 py-1 text-xs font-medium text-zinc-300 bg-white/[0.04] rounded-lg border border-white/[0.08]">
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
  { title: "Business formation", description: "Get your business registered with the right legal structure. We handle incorporation end-to-end including filings, legal documents, and tax registration.", features: ["Company Formation", "Tax IDs", "Legal Documentation", "Bank Readiness"], variant: "formation", statLabel: "7-15 Days", statSublabel: "Typical turnaround" },
  { title: "Digital presence", description: "Your professional website, custom domain, and business email, all engineered and ready. Modern responsive design with high-performance hosting.", features: ["Web Development", "Custom Domain", "Business Email", "Fast Hosting"], variant: "digital", statLabel: "24-48 Hrs", statSublabel: "Rapid deployment" },
  { title: "AI & Automations", description: "Scale operations without headcount. Custom AI agents, workflow automations, and WhatsApp / CRM pipelines engineered for your workflow.", features: ["AI Agents", "Workflow Automations", "CRM Sync", "WhatsApp Bots"], variant: "compliance", statLabel: "10x", statSublabel: "Efficiency boost" },
  { title: "Ongoing support", description: "We stay available for updates, infrastructure scaling, and technical guidance. One dedicated team for both code and business operations.", features: ["Dedicated Support", "Tech Maintenance", "Annual Filings"], variant: "support", statLabel: "365 Days", statSublabel: "Year-round partnership" },
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
