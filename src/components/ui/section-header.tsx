import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  icon: ReactNode;
  badge?: string;
  badge2?: string;
  title: ReactNode;
  subtitle: ReactNode;
  alignment?: "center" | "left";
  className?: string;
}

export const SectionHeader = ({ 
  icon, 
  badge, 
  badge2, 
  title, 
  subtitle, 
  alignment = "center",
  className 
}: SectionHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col gap-6 md:gap-8 pb-8 md:pb-12",
        alignment === "center" ? "items-center text-center" : "md:flex-row items-center md:items-start text-center md:text-left",
        className
      )}
    >
      {/* Icon */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex flex-shrink-0 items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.3)] border border-primary/20">
        <div className="w-8 h-8 md:w-10 md:h-10 text-primary flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
           {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className={cn("flex-1", alignment === "center" && "flex flex-col items-center")}>
        {(badge || badge2) && (
          <div className={cn("flex flex-wrap items-center gap-3 mb-4", alignment === "center" ? "justify-center" : "justify-center md:justify-start")}>
            {badge && (
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                {badge}
              </span>
            )}
            {badge2 && (
              <span className="px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full border border-border">
                {badge2}
              </span>
            )}
          </div>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-balance">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl text-balance">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};
