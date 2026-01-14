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
        "flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br border border-border/20 relative overflow-hidden",
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
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl group-hover/bento:w-40 group-hover/bento:h-40 transition-all duration-500" />
      
      {/* Title and subtitle content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <span className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
          {title}
        </span>
        <span className="text-sm text-muted-foreground">
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
      "Not registered yet. Just exploring your options and figuring out what's needed to start a business.",
    header: <Skeleton variant="purple" title="Dream It" subtitle="Turn your idea into reality" />,
    icon: <Lightbulb className="h-5 w-5 text-primary" />,
    link: "/intake?stage=thinking",
  },
  {
    title: "Going legal",
    description:
      "Ready to register and formalize. You know what you want to do, now it's time to make it official.",
    header: <Skeleton variant="orange" title="Own It" subtitle="Make it legally yours" />,
    icon: <FileCheck className="h-5 w-5 text-primary" />,
    link: "/intake?stage=legal",
  },
  {
    title: "Ready to scale",
    description:
      "Already registered. Need systems, compliance, and growth tools to take your business to the next level.",
    header: <Skeleton variant="green" title="Grow It" subtitle="Build systems for 10x" />,
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    link: "/intake?stage=scale",
  },
];

const GoalCards = () => {
  return (
    <section id="journey-cards" className="py-20 md:py-28 relative bg-background">
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
          {/* Custom grid for title + 3 cards */}
          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {/* Title card */}
            <div className="md:col-span-1 flex flex-col justify-center mb-6 md:mb-0">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">
                Where are you in your business journey?
              </h2>
              <p className="text-muted-foreground text-sm">
                Pick your stage. We'll guide you from there.
              </p>
            </div>

            {/* Journey cards */}
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.link}
                  className="block group h-full"
                >
                  <div className="row-span-1 rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4 bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 flex flex-col justify-between h-full overflow-hidden cursor-pointer">
                    {item.header}
                    <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        {item.icon}
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalCards;
