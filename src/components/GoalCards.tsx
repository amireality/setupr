import { Lightbulb, FileCheck, TrendingUp, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";

const Skeleton = ({
  title,
  subtitle,
}: {
  variant?: "purple" | "orange" | "green" | "default";
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[90px] rounded-xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="relative z-10">
        <span className="font-display text-base md:text-lg font-bold text-zinc-100 tracking-tight block mb-0.5">{title}</span>
        <span className="text-[11px] font-mono text-zinc-400">{subtitle}</span>
      </div>
    </div>
  );
};

const defaultItems = [
  { title: "Thinking of starting a business?", description: "Exploring how to turn your idea into a real, credible business? We'll guide you from idea to launch, wherever you're based.", link: "/intake?stage=thinking", skeletonTitle: "Dream It", skeletonSubtitle: "From idea to launched business", variant: "purple" as const, icon: <Lightbulb className="h-4 w-4 text-primary" /> },
  { title: "Ready to register your company?", description: "Get your business registered with the right structure, tools, and paperwork done. All handled in one place.", link: "/intake?stage=legal", skeletonTitle: "Own It", skeletonSubtitle: "Registration done right", variant: "orange" as const, icon: <FileCheck className="h-4 w-4 text-primary" /> },
  { title: "Registered but need to scale?", description: "Already running a business? Add website, feature integrations, AI tools, and workflow automations to build trust and remove manual work.", link: "/intake?stage=scale", skeletonTitle: "Grow It", skeletonSubtitle: "Build trust, visibility, and automation", variant: "green" as const, icon: <TrendingUp className="h-4 w-4 text-primary" /> },
];

const icons = [<Lightbulb className="h-4 w-4 text-primary" />, <FileCheck className="h-4 w-4 text-primary" />, <TrendingUp className="h-4 w-4 text-primary" />];

const GoalCards = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  const sectionTitle = getSetting("homepage_goal_section_title", "Whether you're a founder, freelancer, or scaling team");
  const sectionSubtitle = getSetting("homepage_goal_section_subtitle", "Tell us where you are. We'll show you exactly what you need to get set up and running.");

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
    <section id="journey-cards" className="py-12 md:py-28 relative bg-[#0e111a] border-t border-white/[0.08]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            icon={<Compass />}
            badge="Your Journey"
            title={
              <>
                Whether you're an <span className="gradient-text">engineer</span>, freelancer, or scaling founder
              </>
            }
            subtitle={sectionSubtitle}
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}>
                <Link to={item.link} className="block group h-full">
                  <div className="rounded-2xl border border-white/[0.12] bg-[#141726]/90 hover:bg-[#171b2d] hover:border-white/[0.22] p-5 flex flex-col h-full overflow-hidden transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(245,158,11,0.08)] hover:-translate-y-1">
                    <Skeleton title={item.skeletonTitle} subtitle={item.skeletonSubtitle} />
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="text-primary">{item.icon}</div>
                        <h3 className="font-display text-base font-semibold text-zinc-100">{item.title}</h3>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{item.description}</p>
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
