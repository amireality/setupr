import { Lightbulb, FileCheck, TrendingUp, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";

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
    <div className={cn("flex flex-1 w-full h-full min-h-[80px] rounded-xl bg-gradient-to-br border border-border/20 relative overflow-hidden", gradients[variant])}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary) / 0.5) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/30 rounded-full blur-3xl group-hover/bento:w-32 group-hover/bento:h-32 transition-all duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
        <span className="font-display text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1">{title}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  );
};

const defaultItems = [
  { title: "Thinking of starting a business?", description: "Freelancer or consultant exploring what's needed to register a business in India? We'll guide you from idea to legal entity.", link: "/intake?stage=thinking", skeletonTitle: "Dream It", skeletonSubtitle: "From idea to registered business", variant: "purple" as const, icon: <Lightbulb className="h-4 w-4 text-primary" /> },
  { title: "Ready to register your company?", description: "Get your Private Limited, LLP, or Proprietorship registered with GST, MSME, and compliance. All in one place.", link: "/intake?stage=legal", skeletonTitle: "Own It", skeletonSubtitle: "Legal registration done right", variant: "orange" as const, icon: <FileCheck className="h-4 w-4 text-primary" /> },
  { title: "Registered but need to scale?", description: "Already have a business? Add website, professional email, Google listing, and ongoing compliance support to build credibility.", link: "/intake?stage=scale", skeletonTitle: "Grow It", skeletonSubtitle: "Build trust and visibility", variant: "green" as const, icon: <TrendingUp className="h-4 w-4 text-primary" /> },
];

const icons = [<Lightbulb className="h-4 w-4 text-primary" />, <FileCheck className="h-4 w-4 text-primary" />, <TrendingUp className="h-4 w-4 text-primary" />];

const GoalCards = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  const sectionTitle = getSetting("homepage_goal_section_title", "Whether you're a freelancer, consultant, or startup founder");
  const sectionSubtitle = getSetting("homepage_goal_section_subtitle", "Select where you are. We'll show you exactly what you need to get legally set up in India.");

  const items = defaultItems.map((def, i) => {
    const num = i + 1;
    return {
      title: getSetting(`homepage_goal_${num}_title`, def.title),
      description: getSetting(`homepage_goal_${num}_desc`, def.description),
      link: getSetting(`homepage_goal_${num}_link`, def.link),
      skeletonTitle: getSetting(`homepage_goal_${num}_skeleton_title`, def.skeletonTitle),
      skeletonSubtitle: getSetting(`homepage_goal_${num}_skeleton_subtitle`, def.skeletonSubtitle),
      variant: def.variant,
      icon: icons[i],
    };
  });

  return (
    <section id="journey-cards" className="py-12 md:py-28 relative bg-black border-t border-primary/20">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={<Compass />}
            badge="Your Journey"
            title={
              <>
                Whether you're a <span className="text-primary">freelancer</span>, consultant, or startup founder
              </>
            }
            subtitle={sectionSubtitle}
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}>
                <Link to={item.link} className="block group h-full">
                  <div className="rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4 bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 flex flex-col h-full overflow-hidden cursor-pointer hover:scale-[1.02] hover:-translate-y-1">
                    <Skeleton variant={item.variant} title={item.skeletonTitle} subtitle={item.skeletonSubtitle} />
                    <div className="group-hover/bento:translate-x-2 transition duration-200 mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        {item.icon}
                        <h3 className="font-display text-sm md:text-base font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
