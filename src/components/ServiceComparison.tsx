import { motion } from "framer-motion";
import { Check, X, Clock, IndianRupee, AlertTriangle, GraduationCap } from "lucide-react";
import { useSiteSetting } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  factor: string;
  icon: string;
  diy: string;
  setupr: string;
  highlight: boolean;
}

const defaultComparisons: ComparisonItem[] = [
  { factor: "Time Required", icon: "Clock", diy: "20-40 hours of research & filing", setupr: "30 minutes of your time", highlight: true },
  { factor: "Expertise Needed", icon: "GraduationCap", diy: "Deep understanding of compliance laws", setupr: "Zero expertise needed", highlight: false },
  { factor: "Risk of Rejection", icon: "AlertTriangle", diy: "High - common for first-timers", setupr: "Zero - 100% acceptance rate", highlight: true },
  { factor: "Hidden Costs", icon: "IndianRupee", diy: "Possible penalties & refiling fees", setupr: "Transparent, fixed pricing", highlight: false },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, GraduationCap, AlertTriangle, IndianRupee,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

interface ServiceComparisonProps {
  serviceId?: string;
}

const ServiceComparison = ({ serviceId }: ServiceComparisonProps) => {
  const key = serviceId ? `service_${serviceId}_comparison` : "";
  const { data: setting } = useSiteSetting(key);

  let comparisons = defaultComparisons;
  if (setting?.value) {
    try {
      const parsed = JSON.parse(setting.value);
      if (Array.isArray(parsed) && parsed.length > 0) comparisons = parsed;
    } catch { /* fallback */ }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Why Choose Setupr?</h2>
      <p className="text-muted-foreground mb-6">See how we compare to doing it yourself</p>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-0">
        <div className="grid grid-cols-3 gap-0 pb-3 border-b border-border relative">
          <div className="text-sm font-medium text-muted-foreground p-4">Factor</div>
          <div className="text-sm font-medium text-muted-foreground text-center p-4">DIY Approach</div>
          <div className="relative p-4 bg-primary/5 border-l-2 border-primary rounded-tr-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
              Recommended
            </div>
            <div className="text-sm font-bold text-primary text-center">With Setupr</div>
          </div>
        </div>

        {comparisons.map((item, index) => {
          const IconComp = iconMap[item.icon] || Clock;
          const isLast = index === comparisons.length - 1;
          return (
            <motion.div
              key={item.factor}
              variants={rowVariants}
              className="grid grid-cols-3 gap-0 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <IconComp className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.factor}</span>
              </div>
              <div className="flex items-center justify-center p-4 bg-destructive/5">
                <div className="flex items-start gap-2 text-center">
                  <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-destructive/90 font-medium">{item.diy}</span>
                </div>
              </div>
              <div className={cn("flex items-center justify-center p-4 bg-primary/5 border-l-2 border-primary", isLast ? "rounded-br-xl" : "")}>
                <div className="flex items-start gap-2 text-center">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground font-semibold">{item.setupr}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2">
        <div className="w-4 h-0.5 bg-primary rounded-full"></div>
        <p className="text-sm text-muted-foreground">
          Save 20+ hours and eliminate the stress of compliance paperwork.
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceComparison;
