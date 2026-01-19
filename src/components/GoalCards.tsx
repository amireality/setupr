import { Lightbulb, FileCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Skeleton = ({
  variant = "default",
  title,
  subtitle,
}: {
  variant?: "purple" | "orange" | "green" | "default";
  title: string;
  subtitle: string;
}) => {
  const gradients = {
    purple: "from-primary/25 via-primary/15 to-transparent",
    orange: "from-primary/30 via-primary/15 to-transparent",
    green: "from-primary/25 via-primary/15 to-transparent",
    default: "from-primary/20 via-transparent to-transparent",
  };

  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[100px] md:min-h-[120px] rounded-xl bg-gradient-to-br border border-border/20 relative overflow-hidden",
        gradients[variant]
      )}
    >
      {/* Animated dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary) / 0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Warm glow effect */}
      <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/30 rounded-full blur-3xl group-hover/bento:w-40 group-hover/bento:h-40 transition-all duration-500" />
      
      {/* Title and subtitle content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 md:p-4">
        <span className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">
          {title}
        </span>
        <span className="text-xs md:text-sm text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

const items = [
  {
    title: "Thinking of starting",
    description:
      "Just exploring. Figuring out what's needed to start a business.",
    header: <Skeleton variant="purple" title="Dream It" subtitle="Turn your idea into reality" />,
    icon: <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-primary" />,
    link: "/intake?stage=thinking",
  },
  {
    title: "Going legal",
    description:
      "Ready to register. Time to make it official.",
    header: <Skeleton variant="orange" title="Own It" subtitle="Make it legally yours" />,
    icon: <FileCheck className="h-4 w-4 md:h-5 md:w-5 text-primary" />,
    link: "/intake?stage=legal",
  },
  {
    title: "Ready to scale",
    description:
      "Already registered. Need systems for 10x growth.",
    header: <Skeleton variant="green" title="Grow It" subtitle="Build systems for scale" />,
    icon: <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />,
    link: "/intake?stage=scale",
  },
];

const GoalCards = () => {
  return (
    <section id="journey-cards" className="py-16 md:py-28 relative bg-background">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Bento Grid Layout matching reference: 
              Row 1: [Heading] [Card 1]
              Row 2: [Card 2] [Card 3 - wide]
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Row 1 */}
            <div className="md:col-span-1 flex flex-col justify-center py-4 md:py-0">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance">
                Where are you in your journey?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Pick your stage. We'll guide you from there.
              </p>
            </div>

            {/* Card 1 - Next to heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="md:col-span-2"
            >
              <Link to={items[0].link} className="block group h-full">
                <div className="rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4 md:p-5 bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 flex flex-col h-full overflow-hidden cursor-pointer hover:scale-[1.02] hover:-translate-y-1">
                  {items[0].header}
                  <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      {items[0].icon}
                      <h3 className="font-display text-base md:text-lg font-semibold text-foreground">
                        {items[0].title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {items[0].description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Row 2 */}
            {/* Card 2 - Small, below heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="md:col-span-1"
            >
              <Link to={items[1].link} className="block group h-full">
                <div className="rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4 md:p-5 bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 flex flex-col h-full overflow-hidden cursor-pointer hover:scale-[1.02] hover:-translate-y-1">
                  {items[1].header}
                  <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      {items[1].icon}
                      <h3 className="font-display text-base md:text-lg font-semibold text-foreground">
                        {items[1].title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {items[1].description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 3 - Wide, next to Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="md:col-span-2"
            >
              <Link to={items[2].link} className="block group h-full">
                <div className="rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4 md:p-5 bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 flex flex-col h-full overflow-hidden cursor-pointer hover:scale-[1.02] hover:-translate-y-1">
                  {items[2].header}
                  <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      {items[2].icon}
                      <h3 className="font-display text-base md:text-lg font-semibold text-foreground">
                        {items[2].title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {items[2].description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalCards;