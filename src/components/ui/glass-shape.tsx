"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassShapeProps {
  variant: "cube" | "sphere" | "document" | "folder" | "shield" | "browser";
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

export const GlassShape = ({ variant, className, size = "md", delay = 0 }: GlassShapeProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const baseStyles = "relative";
  
  const glassStyles = {
    background: "linear-gradient(135deg, hsl(220 15% 20% / 0.6) 0%, hsl(220 15% 12% / 0.4) 100%)",
    backdropFilter: "blur(12px)",
    border: "1px solid hsl(220 15% 30% / 0.3)",
    boxShadow: `
      0 8px 32px hsl(0 0% 0% / 0.3),
      inset 0 1px 0 hsl(0 0% 100% / 0.1),
      0 0 40px hsl(24 95% 53% / 0.15)
    `,
  };

  const rimGlow = {
    position: "absolute" as const,
    inset: -2,
    borderRadius: "inherit",
    background: "linear-gradient(135deg, hsl(24 95% 53% / 0.4) 0%, transparent 50%, hsl(24 95% 53% / 0.2) 100%)",
    filter: "blur(4px)",
    opacity: 0.6,
    zIndex: -1,
  };

  const renderShape = () => {
    switch (variant) {
      case "cube":
        return (
          <motion.div
            className={cn(sizeClasses[size], "rounded-xl", baseStyles)}
            style={{ 
              ...glassStyles,
              transform: "perspective(500px) rotateX(15deg) rotateY(-15deg)",
            }}
            animate={{
              rotateX: [15, 20, 15],
              rotateY: [-15, -10, -15],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <div style={rimGlow} className="rounded-xl" />
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-1/3"
                style={{ background: "linear-gradient(180deg, hsl(0 0% 100% / 0.1) 0%, transparent 100%)" }}
              />
            </div>
          </motion.div>
        );

      case "sphere":
        return (
          <motion.div
            className={cn(sizeClasses[size], "rounded-full", baseStyles)}
            style={glassStyles}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <div style={rimGlow} className="rounded-full" />
            <div 
              className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full"
              style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.3) 0%, transparent 70%)" }}
            />
          </motion.div>
        );

      case "document":
        return (
          <motion.div
            className={cn(sizeClasses[size], "rounded-lg", baseStyles)}
            style={{
              ...glassStyles,
              transform: "perspective(500px) rotateX(10deg) rotateY(-5deg)",
            }}
            animate={{
              y: [0, -8, 0],
              rotateY: [-5, 5, -5],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <div style={rimGlow} className="rounded-lg" />
            {/* Document lines */}
            <div className="absolute inset-3 flex flex-col gap-1.5">
              <div className="h-1 bg-primary/40 rounded-full w-3/4" />
              <div className="h-1 bg-muted/30 rounded-full w-full" />
              <div className="h-1 bg-muted/30 rounded-full w-5/6" />
              <div className="h-1 bg-muted/30 rounded-full w-2/3" />
            </div>
            {/* Orange seal */}
            <div 
              className="absolute bottom-2 right-2 w-6 h-6 rounded-full"
              style={{
                background: "linear-gradient(135deg, hsl(24 95% 53%) 0%, hsl(30 100% 45%) 100%)",
                boxShadow: "0 0 12px hsl(24 95% 53% / 0.5)",
              }}
            />
          </motion.div>
        );

      case "folder":
        return (
          <motion.div
            className={cn("relative", sizeClasses[size])}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          >
            {/* Folder tab */}
            <div 
              className="absolute -top-2 left-2 w-8 h-4 rounded-t-md"
              style={{
                background: "linear-gradient(135deg, hsl(220 15% 25% / 0.7) 0%, hsl(220 15% 18% / 0.5) 100%)",
                border: "1px solid hsl(220 15% 35% / 0.3)",
                borderBottom: "none",
              }}
            />
            {/* Folder body */}
            <div 
              className="absolute inset-0 top-1 rounded-lg"
              style={glassStyles}
            >
              <div style={rimGlow} className="rounded-lg" />
              {/* Inner document peek */}
              <div 
                className="absolute top-2 left-3 right-3 h-6 rounded bg-muted/20"
                style={{ boxShadow: "0 2px 8px hsl(0 0% 0% / 0.2)" }}
              />
            </div>
          </motion.div>
        );

      case "shield":
        return (
          <motion.div
            className={cn(sizeClasses[size], "relative")}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <svg viewBox="0 0 100 120" className="w-full h-full">
              <defs>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(220 15% 20% / 0.6)" />
                  <stop offset="100%" stopColor="hsl(220 15% 12% / 0.4)" />
                </linearGradient>
                <linearGradient id="shieldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(24 95% 53% / 0.5)" />
                  <stop offset="50%" stopColor="transparent" />
                  <stop offset="100%" stopColor="hsl(24 95% 53% / 0.3)" />
                </linearGradient>
                <filter id="shieldGlow">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Shield shape */}
              <path 
                d="M50 5 L90 20 L90 50 Q90 90 50 115 Q10 90 10 50 L10 20 Z"
                fill="url(#shieldGradient)"
                stroke="url(#shieldRim)"
                strokeWidth="2"
                filter="url(#shieldGlow)"
              />
              {/* Checkmark */}
              <path 
                d="M35 55 L45 70 L70 40"
                fill="none"
                stroke="hsl(24 95% 53%)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#shieldGlow)"
              />
            </svg>
          </motion.div>
        );

      case "browser":
        return (
          <motion.div
            className={cn(sizeClasses[size], "rounded-lg overflow-hidden", baseStyles)}
            style={glassStyles}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <div style={rimGlow} className="rounded-lg" />
            {/* Browser top bar */}
            <div 
              className="h-4 flex items-center gap-1 px-2"
              style={{ background: "hsl(220 15% 15% / 0.8)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            </div>
            {/* Browser content */}
            <div className="p-2 space-y-1">
              <div className="h-1 bg-primary/30 rounded w-1/2" />
              <div className="h-1 bg-muted/20 rounded w-full" />
              <div className="h-1 bg-muted/20 rounded w-3/4" />
              <div className="flex gap-1 mt-2">
                <div className="w-1/3 h-4 bg-muted/15 rounded" />
                <div className="w-2/3 h-4 bg-muted/10 rounded" />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {renderShape()}
    </div>
  );
};
