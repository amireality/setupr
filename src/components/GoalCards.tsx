import { Rocket, Briefcase, TrendingUp } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const Skeleton = ({ variant }: { variant: "start" | "formalize" | "scale" }) => {
  const gradients = {
    start: "from-primary/20 via-primary/10 to-transparent",
    formalize: "from-primary/15 via-transparent to-primary/10",
    scale: "from-transparent via-primary/15 to-primary/20",
  };

  return (
    <div
      className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${gradients[variant]} border border-border/20 relative overflow-hidden`}
    >
      {/* Animated dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Warm glow */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover/bento:w-32 group-hover/bento:h-32 transition-all duration-500" />
    </div>
  );
};

const items = [
  {
    title: "Starting Fresh",
    description:
      "Launch your business the right way. We handle the setup so you can focus on what matters — building your vision.",
    header: <Skeleton variant="start" />,
    className: "md:col-span-2",
    icon: <Rocket className="h-5 w-5 text-primary" />,
  },
  {
    title: "Going Legit",
    description:
      "Formalize your operations with proper structure, compliance, and professional systems.",
    header: <Skeleton variant="formalize" />,
    className: "md:col-span-1",
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    title: "Ready to Scale",
    description:
      "Optimize and expand with strategies designed for sustainable growth.",
    header: <Skeleton variant="scale" />,
    className: "md:col-span-1",
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
  },
];

const GoalCards = () => {
  return (
    <section className="py-20 md:py-28 relative bg-background">
      {/* Subtle grid continuation */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Where Are You on Your Journey?
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

export default GoalCards;
