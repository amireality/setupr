import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { Building2, Clock, Star, ShieldCheck } from "lucide-react";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

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
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Trusted by Freelancers, Startups & Small Businesses
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold mt-2">
            500+ Businesses Registered Across India
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl mx-auto">
            From solo consultants to growing startups — we've helped entrepreneurs in 50+ cities get legally set up and build credibility.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-card glass-card-hover rounded-2xl p-6 text-center h-full transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
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
            <span className="text-foreground font-medium">Trusted by founders</span> from 
            <span className="text-primary"> Bangalore</span>,
            <span className="text-primary"> Mumbai</span>,
            <span className="text-primary"> Delhi</span>,
            <span className="text-primary"> Hyderabad</span>, and
            <span className="text-primary"> 50+ cities</span> across India
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;
