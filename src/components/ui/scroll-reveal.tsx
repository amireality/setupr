"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export const ScrollReveal = ({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  duration = 0.6 
}: ScrollRevealProps) => {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction],
        filter: "blur(4px)",
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// Container for staggered animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ 
  children, 
  className,
  staggerDelay = 0.1 
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ 
  children, 
  className,
  direction = "up" 
}: { 
  children: ReactNode; 
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  };

  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          ...directionOffset[direction],
          filter: "blur(4px)",
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          x: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
