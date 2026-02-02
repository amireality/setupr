"use client";

import { 
  Scale, Shield, Check, Globe, Layout, FileText, Building2, Receipt,
  Briefcase, Users, Rocket, Target, TrendingUp, Award, Lightbulb,
  Landmark, BookOpen, PenTool, Mail, Search, BarChart3, Wallet,
  Calculator, FileCheck, Handshake, Clock, Zap, Star, CircleDollarSign,
  BadgeCheck, ScrollText, GraduationCap, Megaphone, Network, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogThumbnailProps {
  category: string;
  slug?: string;
  className?: string;
}

// Unique visual configs for each blog post based on slug
const getUniqueVisual = (slug: string, category: string) => {
  const visuals: Record<string, { 
    icon: React.ElementType; 
    secondaryIcon?: React.ElementType;
    animation: string;
    pattern: "orbit" | "pulse" | "float" | "spin" | "bounce" | "wave" | "glow" | "morph";
    accent: string;
  }> = {
    // Business Formation
    "complete-guide-llp-registration-india": {
      icon: Handshake,
      secondaryIcon: Building2,
      animation: "orbit",
      pattern: "orbit",
      accent: "from-orange-500 to-amber-400"
    },
    "pvt-ltd-vs-llp-comparison": {
      icon: Scale,
      secondaryIcon: FileText,
      animation: "balance",
      pattern: "float",
      accent: "from-primary to-orange-400"
    },
    "opc-registration-complete-guide": {
      icon: Users,
      secondaryIcon: Award,
      animation: "pulse",
      pattern: "pulse",
      accent: "from-amber-500 to-yellow-400"
    },
    "startup-india-registration-benefits": {
      icon: Rocket,
      secondaryIcon: Star,
      animation: "launch",
      pattern: "bounce",
      accent: "from-orange-400 to-red-400"
    },
    "is-business-registration-mandatory-india": {
      icon: Landmark,
      secondaryIcon: ScrollText,
      animation: "stamp",
      pattern: "glow",
      accent: "from-primary to-amber-500"
    },
    
    // Compliance
    "gst-registration-complete-guide": {
      icon: Receipt,
      secondaryIcon: Calculator,
      animation: "calculate",
      pattern: "wave",
      accent: "from-emerald-500 to-teal-400"
    },
    "gst-registration-mandatory-when": {
      icon: CircleDollarSign,
      secondaryIcon: Clock,
      animation: "tick",
      pattern: "pulse",
      accent: "from-green-500 to-emerald-400"
    },
    "annual-compliance-checklist-companies": {
      icon: FileCheck,
      secondaryIcon: BadgeCheck,
      animation: "check",
      pattern: "morph",
      accent: "from-teal-500 to-cyan-400"
    },
    "roc-filing-deadlines-penalties": {
      icon: Clock,
      secondaryIcon: AlertTriangle,
      animation: "countdown",
      pattern: "spin",
      accent: "from-rose-500 to-orange-400"
    },
    
    // Digital Presence
    "professional-email-business-importance": {
      icon: Mail,
      secondaryIcon: Zap,
      animation: "send",
      pattern: "float",
      accent: "from-blue-500 to-indigo-400"
    },
    "essential-website-pages-new-business": {
      icon: Layout,
      secondaryIcon: Globe,
      animation: "build",
      pattern: "wave",
      accent: "from-violet-500 to-purple-400"
    },
    "google-business-profile-setup-guide": {
      icon: Search,
      secondaryIcon: Target,
      animation: "locate",
      pattern: "pulse",
      accent: "from-blue-400 to-cyan-400"
    },
    "digital-presence-basics-new-business": {
      icon: Network,
      secondaryIcon: Globe,
      animation: "connect",
      pattern: "orbit",
      accent: "from-indigo-500 to-blue-400"
    },
    
    // Tax Tips
    "tax-benefits-registered-business": {
      icon: Wallet,
      secondaryIcon: TrendingUp,
      animation: "grow",
      pattern: "bounce",
      accent: "from-green-500 to-lime-400"
    },
    "business-expenses-tax-deduction-guide": {
      icon: Calculator,
      secondaryIcon: Receipt,
      animation: "calculate",
      pattern: "float",
      accent: "from-emerald-500 to-green-400"
    },
    
    // Founder Insights
    "common-mistakes-first-time-founders": {
      icon: Lightbulb,
      secondaryIcon: Target,
      animation: "shine",
      pattern: "glow",
      accent: "from-yellow-500 to-amber-400"
    },
    "bootstrapping-vs-funding-pros-cons": {
      icon: BarChart3,
      secondaryIcon: Rocket,
      animation: "rise",
      pattern: "wave",
      accent: "from-purple-500 to-pink-400"
    },
    "building-founding-team-tips": {
      icon: Users,
      secondaryIcon: Handshake,
      animation: "gather",
      pattern: "orbit",
      accent: "from-orange-500 to-rose-400"
    },
  };

  // Return unique visual or generate one based on slug hash
  if (visuals[slug]) {
    return visuals[slug];
  }

  // Generate unique visual from slug hash
  const icons = [Briefcase, Target, Award, Lightbulb, BookOpen, PenTool, Settings, GraduationCap, Megaphone];
  const patterns: Array<"orbit" | "pulse" | "float" | "spin" | "bounce" | "wave" | "glow" | "morph"> = ["orbit", "pulse", "float", "spin", "bounce", "wave", "glow", "morph"];
  const accents = [
    "from-primary to-orange-400",
    "from-amber-500 to-yellow-400",
    "from-emerald-500 to-teal-400",
    "from-blue-500 to-indigo-400",
    "from-violet-500 to-purple-400",
    "from-rose-500 to-pink-400"
  ];
  
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    icon: icons[hash % icons.length],
    secondaryIcon: icons[(hash + 3) % icons.length],
    animation: patterns[hash % patterns.length],
    pattern: patterns[hash % patterns.length],
    accent: accents[hash % accents.length]
  };
};

// Missing import
import { AlertTriangle } from "lucide-react";

const BlogThumbnail = ({ category, slug = "", className }: BlogThumbnailProps) => {
  const visual = getUniqueVisual(slug, category);
  const Icon = visual.icon;
  const SecondaryIcon = visual.secondaryIcon;

  const renderAnimatedGraphic = () => {
    switch (visual.pattern) {
      case "orbit":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central icon */}
            <motion.div
              className="relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", visual.accent)}>
                <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>
            
            {/* Orbiting element */}
            <motion.div
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ width: 100, height: 100 }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                {SecondaryIcon && (
                  <div className="w-8 h-8 rounded-lg bg-card border border-primary/30 flex items-center justify-center shadow-md">
                    <SecondaryIcon className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Orbit ring */}
            <div className="absolute w-24 h-24 rounded-full border border-dashed border-primary/20" />
          </div>
        );

      case "pulse":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Pulse rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/30"
                initial={{ width: 40, height: 40, opacity: 0.6 }}
                animate={{ 
                  width: [40, 100], 
                  height: [40, 100], 
                  opacity: [0.6, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.6,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Central icon */}
            <motion.div
              className={cn("relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center", visual.accent)}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
            
            {/* Secondary icon */}
            {SecondaryIcon && (
              <motion.div
                className="absolute bottom-4 right-4"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SecondaryIcon className="w-5 h-5 text-primary/60" />
              </motion.div>
            )}
          </div>
        );

      case "float":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main floating icon */}
            <motion.div
              className={cn("relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl", visual.accent)}
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
            
            {/* Floating secondary elements */}
            {SecondaryIcon && (
              <motion.div
                className="absolute top-4 right-6"
                animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-muted/40 backdrop-blur flex items-center justify-center border border-primary/20">
                  <SecondaryIcon className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            )}
            
            {/* Decorative dots */}
            <motion.div
              className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-primary/40"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        );

      case "spin":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Spinning background ring */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border-2 border-dashed border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Counter-spinning inner ring */}
            <motion.div
              className="absolute w-14 h-14 rounded-full border border-primary/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Static center icon */}
            <div className={cn("relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center", visual.accent)}>
              <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            
            {SecondaryIcon && (
              <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ width: 80, height: 80 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <SecondaryIcon className="w-4 h-4 text-primary/60" />
                </div>
              </motion.div>
            )}
          </div>
        );

      case "bounce":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Bouncing main icon */}
            <motion.div
              className={cn("relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", visual.accent)}
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
            
            {/* Shadow */}
            <motion.div
              className="absolute bottom-4 w-10 h-2 rounded-full bg-black/20 blur-sm"
              animate={{ 
                scaleX: [1, 0.8, 1],
                opacity: [0.3, 0.15, 0.3]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Secondary elements */}
            {SecondaryIcon && (
              <motion.div
                className="absolute top-6 right-5"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SecondaryIcon className="w-5 h-5 text-primary/50" />
              </motion.div>
            )}
          </div>
        );

      case "wave":
        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Wave lines */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                style={{ top: `${35 + i * 15}%` }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "linear"
                }}
              />
            ))}
            
            {/* Main icon */}
            <motion.div
              className={cn("relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center", visual.accent)}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
            
            {SecondaryIcon && (
              <motion.div
                className="absolute bottom-5 left-6"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SecondaryIcon className="w-5 h-5 text-primary/40" />
              </motion.div>
            )}
          </div>
        );

      case "glow":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing background */}
            <motion.div
              className={cn("absolute w-20 h-20 rounded-full blur-xl bg-gradient-to-br opacity-30", visual.accent)}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Main icon with glow */}
            <motion.div
              className={cn("relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center", visual.accent)}
              style={{ boxShadow: `0 0 30px hsl(24 95% 53% / 0.4)` }}
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(24 95% 53% / 0.3)",
                  "0 0 40px hsl(24 95% 53% / 0.5)",
                  "0 0 20px hsl(24 95% 53% / 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
            
            {SecondaryIcon && (
              <motion.div
                className="absolute top-5 right-6"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <SecondaryIcon className="w-5 h-5 text-primary" />
              </motion.div>
            )}
          </div>
        );

      case "morph":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Morphing background shape */}
            <motion.div
              className={cn("absolute w-16 h-16 bg-gradient-to-br opacity-20", visual.accent)}
              animate={{ 
                borderRadius: ["30%", "50%", "40%", "30%"],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main icon */}
            <motion.div
              className={cn("relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center", visual.accent)}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
            
            {SecondaryIcon && (
              <motion.div
                className="absolute bottom-4 right-5"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <SecondaryIcon className="w-5 h-5 text-primary/50" />
              </motion.div>
            )}
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center", visual.accent)}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "group-hover:scale-[1.02]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, hsl(220 10% 11%) 0%, hsl(220 15% 8%) 100%)",
      }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(220 15% 20% / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(220 15% 20% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px',
        }}
      />
      
      {/* Gradient glow - intensifies on hover */}
      <div 
        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, hsl(24 95% 53% / 0.15) 0%, transparent 60%)",
        }}
      />
      
      {/* Animated graphic content */}
      <div className="relative z-10 w-full h-full">
        {renderAnimatedGraphic()}
      </div>
      
      {/* Top highlight */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(24 95% 53% / 0.3) 50%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default BlogThumbnail;
