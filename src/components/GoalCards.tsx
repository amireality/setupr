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
        <div className="max-w-5xl mx-auto">
          {/* Custom Grid Layout matching sketch: 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Row 1 */}
            {/* Title - top left */}
            <div className="md:col-span-1 flex items-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Where Are You on Your Journey?
              </h2>
            </div>

            {/* Card 1 (Starting Fresh) - top right */}
            <div className="md:col-span-2">
              <BentoGridItem
                title={items[0].title}
                description={items[0].description}
                header={items[0].header}
                className="h-full min-h-[14rem]"
                icon={items[0].icon}
              />
            </div>

            {/* Row 2 */}
            {/* Card 2 (Going Legit) - bottom left, same size as Card 1 */}
            <div className="md:col-span-1">
              <BentoGridItem
                title={items[1].title}
                description={items[1].description}
                header={items[1].header}
                className="h-full min-h-[14rem]"
                icon={items[1].icon}
              />
            </div>

            {/* Card 3 (Ready to Scale) - bottom right, wider */}
            <div className="md:col-span-2">
              <BentoGridItem
                title={items[2].title}
                description={items[2].description}
                header={items[2].header}
                className="h-full min-h-[14rem]"
                icon={items[2].icon}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalCards;
