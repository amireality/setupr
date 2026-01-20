"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "accent";
}

export const GlowCard = ({ children, className, glowColor = "primary" }: GlowCardProps) => {
  const glowColors = {
    primary: "group-hover:shadow-[0_0_40px_-8px_hsl(24_95%_53%/0.4)]",
    secondary: "group-hover:shadow-[0_0_40px_-8px_hsl(220_15%_50%/0.3)]",
    accent: "group-hover:shadow-[0_0_40px_-8px_hsl(30_100%_50%/0.4)]",
  };

  return (
    <div className={cn("group relative", className)}>
      {/* Gradient border effect */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, hsl(24 95% 53% / 0.5) 0%, transparent 40%, transparent 60%, hsl(30 100% 50% / 0.3) 100%)",
        }}
      />
      
      {/* Card content */}
      <div 
        className={cn(
          "relative glass-card rounded-2xl transition-all duration-500",
          glowColors[glowColor],
          "group-hover:border-primary/30"
        )}
      >
        {children}
      </div>
    </div>
  );
};
