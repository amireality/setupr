import { motion } from "framer-motion";
import { Check, X, Clock, IndianRupee, AlertTriangle, GraduationCap } from "lucide-react";

const comparisons = [
  {
    factor: "Time Required",
    icon: Clock,
    diy: "20-40 hours of research & filing",
    setupr: "30 minutes of your time",
    highlight: true,
  },
  {
    factor: "Expertise Needed",
    icon: GraduationCap,
    diy: "Deep understanding of compliance laws",
    setupr: "Zero expertise needed",
    highlight: false,
  },
  {
    factor: "Risk of Rejection",
    icon: AlertTriangle,
    diy: "High - common for first-timers",
    setupr: "Zero - 100% acceptance rate",
    highlight: true,
  },
  {
    factor: "Hidden Costs",
    icon: IndianRupee,
    diy: "Possible penalties & refiling fees",
    setupr: "Transparent, fixed pricing",
    highlight: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const ServiceComparison = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
        Why Choose Setupr?
      </h2>
      <p className="text-muted-foreground mb-6">
        See how we compare to doing it yourself
      </p>

      {/* Comparison Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border">
          <div className="text-sm font-medium text-muted-foreground">Factor</div>
          <div className="text-sm font-medium text-muted-foreground text-center">DIY Approach</div>
          <div className="text-sm font-medium text-primary text-center">With Setupr</div>
        </div>

        {/* Rows */}
        {comparisons.map((item) => (
          <motion.div
            key={item.factor}
            variants={rowVariants}
            className={`grid grid-cols-3 gap-4 py-4 rounded-xl transition-colors ${
              item.highlight ? "bg-primary/5" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{item.factor}</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-start gap-2 text-center">
                <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item.diy}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-start gap-2 text-center">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">{item.setupr}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Note */}
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">Save 30+ hours</span> and eliminate the stress of compliance paperwork
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceComparison;
