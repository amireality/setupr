import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { Building2, Clock, Star, ShieldCheck } from "lucide-react";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";

// Default stats used as fallback
const defaultStats = [
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Businesses Helped",
    description: "Startups launched successfully",
  },
  {
    icon: Clock,
    value: 15,
    suffix: "",
    label: "Avg. Days",
    description: "To complete registration",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Client Rating",
    description: "Based on 200+ reviews",
    decimals: 1,
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Compliance Rate",
    description: "No rejections, guaranteed",
  },
];

const icons = [Building2, Clock, Star, ShieldCheck];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const TrustStats = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  // Parse stat value from string (handles numbers like "500+", "4.9/5", "100%")
  const parseStatValue = (valueStr: string): { value: number; suffix: string; decimals?: number } => {
    // Handle patterns like "4.9/5"
    if (valueStr.includes("/")) {
      const [num, denom] = valueStr.split("/");
      return { value: parseFloat(num), suffix: `/${denom}`, decimals: 1 };
    }
    // Handle patterns like "500+" or "100%"
    const match = valueStr.match(/^([\d.]+)(.*)$/);
    if (match) {
      const num = parseFloat(match[1]);
      const suffix = match[2] || "";
      const hasDecimals = match[1].includes(".");
      return { value: num, suffix, decimals: hasDecimals ? 1 : 0 };
    }
    return { value: 0, suffix: valueStr, decimals: 0 };
  };

  // Build stats array from database or fallback to defaults
  const stats = defaultStats.map((defaultStat, index) => {
    const statNum = index + 1;
    const valueStr = getSetting(`homepage_stat_${statNum}_value`, `${defaultStat.value}${defaultStat.suffix}`);
    const parsed = parseStatValue(valueStr);
    
    return {
      icon: icons[index],
      value: parsed.value,
      suffix: parsed.suffix,
      label: getSetting(`homepage_stat_${statNum}_label`, defaultStat.label),
      description: getSetting(`homepage_stat_${statNum}_desc`, defaultStat.description),
      decimals: parsed.decimals,
    };
  });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/[0.06] bg-black/30">
      <div className="container px-4 md:px-6 relative">
        {/* Section Header */}
        <SectionHeader 
          icon={<ShieldCheck />}
          badge={getSetting("homepage_trust_stats_badge", "Proven Global Track Record")}
          title={
            <>
              500+ Businesses Launched Across the Globe
            </>
          }
          subtitle={getSetting("homepage_trust_stats_subtitle", "From solo founders to scaling teams, we engineer the digital presence and technical infrastructure powering modern ventures.")}
          alignment="center"
        />

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group relative"
            >
              <div className="rounded-2xl border border-white/[0.12] bg-[#141726]/90 hover:bg-[#171b2d] hover:border-white/[0.22] p-6 text-center h-full transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(245,158,11,0.08)] hover:-translate-y-1">
                {/* Icon */}
                <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                  <stat.icon className="w-5 h-5" />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1 tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>

                {/* Label */}
                <p className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Trusted by founders</span> across
            <span className="text-primary"> North America</span>,
            <span className="text-primary"> Europe</span>,
            <span className="text-primary"> the Middle East</span>, and
            <span className="text-primary"> Asia</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;
