import { MessageCircle, FileCheck, Rocket } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const StepSkeleton = ({ step }: { step: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/15 via-transparent to-primary/10 border border-border/20 relative overflow-hidden items-center justify-center">
      <span className="font-display text-6xl md:text-7xl font-bold text-primary/20">
        {step}
      </span>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover/bento:w-32 group-hover/bento:h-32 transition-all duration-500" />
    </div>
  );
};

const defaultItems = [
  {
    title: "Share your requirements",
    description:
      "Tell us if you need company registration, GST, website, or compliance. Answer a few questions about your business type and goals.",
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
  },
  {
    title: "Get a clear plan with pricing",
    description:
      "We provide an exact checklist of services, documents needed, timeline, and transparent pricing — Setupr fee plus government fees, nothing hidden.",
    icon: <FileCheck className="h-5 w-5 text-primary" />,
  },
  {
    title: "We handle everything",
    description:
      "Our experts manage all filings, registrations, and follow-ups. You get updates via WhatsApp and email until your business is fully set up.",
    icon: <Rocket className="h-5 w-5 text-primary" />,
  },
];

const HowItWorks = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const sectionTitle = getSetting("homepage_how_it_works_title", "How Setupr helps you register your business");
  
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
    <section id="how-it-works" className="py-20 md:py-28 relative bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {sectionTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getSetting("homepage_how_it_works_subtitle", "Simple 3-step process: Share your needs, get a clear plan with pricing, and we handle all the paperwork and filings.")}
            </p>
          </div>
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
