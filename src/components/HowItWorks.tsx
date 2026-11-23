import { MessageCircle, FileCheck, Rocket, Workflow } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";
const StepSkeleton = ({ step }: { step: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6.5rem] rounded-xl bg-[#141726]/90 border border-white/[0.12] relative overflow-hidden items-center justify-between p-6 shadow-sm">
      <div className="flex flex-col gap-1 z-10">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
          EXECUTION PHASE
        </span>
        <span className="font-mono text-xs font-semibold text-primary">
          STAGE // {step}
        </span>
      </div>
      <span className="font-mono text-5xl md:text-6xl font-bold text-white/[0.08] select-none z-10">
        {step}
      </span>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-[0.03]" />
    </div>
  );
};

const defaultItems = [
  {
    title: "Share your requirements",
    description:
      "Tell us your goals — whether you need custom web development, feature integrations, AI automations, or turnkey business setup.",
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
  },
  {
    title: "Get a clear blueprint & pricing",
    description:
      "We provide an exact roadmap of technical specifications, deliverables, timeline, and transparent pricing with zero surprises.",
    icon: <FileCheck className="h-5 w-5 text-primary" />,
  },
  {
    title: "We engineer and deliver",
    description:
      "Our team deploys your web systems, connects APIs, automates workflows, or completes legal formation with regular transparent updates.",
    icon: <Rocket className="h-5 w-5 text-primary" />,
  },
];

const HowItWorks = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const sectionTitle = getSetting("homepage_how_it_works_title", "How Setupr accelerates your business");
  
  const items = [
    {
      title: getSetting("homepage_step1_title", defaultItems[0].title),
      description: getSetting("homepage_step1_desc", defaultItems[0].description),
      header: <StepSkeleton step="01" />,
      className: "md:col-span-1",
      icon: defaultItems[0].icon,
    },
    {
      title: getSetting("homepage_step2_title", defaultItems[1].title),
      description: getSetting("homepage_step2_desc", defaultItems[1].description),
      header: <StepSkeleton step="02" />,
      className: "md:col-span-1",
      icon: defaultItems[1].icon,
    },
    {
      title: getSetting("homepage_step3_title", defaultItems[2].title),
      description: getSetting("homepage_step3_desc", defaultItems[2].description),
      header: <StepSkeleton step="03" />,
      className: "md:col-span-1",
      icon: defaultItems[2].icon,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-[#090a0d] border-t border-white/[0.06]">

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <SectionHeader
            icon={<Workflow />}
            badge="Engineering Pipeline"
            title={
              <>
                How Setupr deploys your <span className="gradient-text">technology & business</span>
              </>
            }
            subtitle={getSetting("homepage_how_it_works_subtitle", "A disciplined 3-phase execution model: Scope requirements, blueprint exact architectures and timelines, then deploy production-grade software and corporate compliance.")}
            alignment="center"
          />
          <BentoGrid className="md:auto-rows-[20rem]">
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

export default HowItWorks;
