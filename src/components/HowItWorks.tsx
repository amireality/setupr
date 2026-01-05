import { MessageCircle, FileCheck, Rocket } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

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

const items = [
  {
    title: "Tell Us Your Goals",
    description:
      "Share your vision and requirements. We'll understand your business needs and craft the perfect setup plan.",
    header: <StepSkeleton step="01" />,
    className: "md:col-span-1",
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
  },
  {
    title: "We Set Everything Up",
    description:
      "Our team handles all the paperwork, registrations, and technical setup while keeping you informed.",
    header: <StepSkeleton step="02" />,
    className: "md:col-span-1",
    icon: <FileCheck className="h-5 w-5 text-primary" />,
  },
  {
    title: "Launch Confidently",
    description:
      "Go live with everything in place — legal, digital, and operational. Focus on growth, not admin.",
    header: <StepSkeleton step="03" />,
    className: "md:col-span-1",
    icon: <Rocket className="h-5 w-5 text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Simple process, powerful results
          </h2>

          {/* Bento Grid */}
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
