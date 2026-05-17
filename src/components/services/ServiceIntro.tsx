import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { Shield, Zap, FileCheck, TrendingUp } from "lucide-react";

const floatingWords = [
  { text: "GST", delay: 0, x: -180, y: -60 },
  { text: "MSME", delay: 0.3, x: 200, y: -40 },
  { text: "Trademark", delay: 0.6, x: -220, y: 50 },
  { text: "Compliance", delay: 0.9, x: 160, y: 70 },
  { text: "PAN-TAN", delay: 1.2, x: -100, y: -90 },
  { text: "Domain", delay: 1.5, x: 240, y: -80 },
];

const trustSignals = [
  { icon: Shield, label: "100% Compliance" },
  { icon: Zap, label: "Fast Processing" },
  { icon: FileCheck, label: "Expert-Led" },
  { icon: TrendingUp, label: "1,200+ Delivered" },
];

const ServiceIntro = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("services");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const introTitle = getSetting("services_intro_title", "Business registration services in India");
  const introSubtitle = getSetting("services_intro_subtitle", "Company registration, GST, MSME, trademark & more — everything you need to go legit.");
  const introNote = getSetting("services_intro_note", "Pick individual services or choose a bundle. All prices exclude 18% GST.");

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />

      {/* Background glow layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating keywords orbiting the hero */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floatingWords.map((word) => (
          <motion.span
            key={word.text}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.25, 0.15, 0.25],
              scale: 1,
              y: [word.y, word.y - 12, word.y + 8, word.y],
            }}
            transition={{
              delay: word.delay + 0.5,
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-xs font-medium text-primary/30 tracking-widest uppercase select-none"
            style={{
              left: `calc(50% + ${word.x}px)`,
              top: `calc(50% + ${word.y}px)`,
            }}
          >
            {word.text}
          </motion.span>
        ))}
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Trusted by 1,200+ founders across India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance"
          >
            {introTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto"
          >
            {introSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-muted-foreground/60 mb-10"
          >
            {introNote}
          </motion.p>

          {/* Trust signals row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            {trustSignals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-2 text-muted-foreground/70">
                <signal.icon className="w-4 h-4 text-primary/70" />
                <span className="text-xs font-medium">{signal.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;
