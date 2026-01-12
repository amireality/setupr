import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollStackSectionProps {
  children: ReactNode;
  index: number;
  totalSections: number;
}

const ScrollStackSection = ({ children, index, totalSections }: ScrollStackSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // As user scrolls past this section, it scales down and fades slightly
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.6]);
  
  // Calculate sticky top position based on index
  const stickyTop = 80 + index * 8; // 80px for navbar + stacking offset

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: totalSections - index,
      }}
      className="origin-top will-change-transform"
    >
      <div className="bg-background rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

interface ScrollStackContainerProps {
  children: ReactNode[];
}

export const ScrollStackContainer = ({ children }: ScrollStackContainerProps) => {
  return (
    <div className="relative">
      {children.map((child, index) => (
        <ScrollStackSection 
          key={index} 
          index={index} 
          totalSections={children.length}
        >
          {child}
        </ScrollStackSection>
      ))}
    </div>
  );
};

export default ScrollStackSection;
