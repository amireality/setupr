"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Individual 3D Tile component
const Tile = ({ 
  delay = 0, 
  size = "normal",
  intensity = 1
}: { 
  delay?: number; 
  size?: "small" | "normal" | "large";
  intensity?: number;
}) => {
  const sizeClasses = {
    small: "w-12 h-12 md:w-16 md:h-16",
    normal: "w-16 h-16 md:w-24 md:h-24",
    large: "w-20 h-20 md:w-32 md:h-32"
  };

  return (
    <motion.div
      className={cn(
        sizeClasses[size],
        "rounded-lg relative shrink-0"
      )}
      style={{
        background: `linear-gradient(135deg, hsl(24 95% ${50 + intensity * 10}%) 0%, hsl(30 100% ${45 + intensity * 8}%) 50%, hsl(24 90% ${35 + intensity * 5}%) 100%)`,
        boxShadow: `
          0 4px 16px -2px hsl(24 95% 40% / 0.4),
          inset 0 1px 0 hsl(24 100% 70% / 0.3),
          inset 0 -2px 4px hsl(24 80% 25% / 0.3)
        `,
        transformStyle: "preserve-3d",
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
        rotateX: -20,
        rotateY: 20
      }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        scale: [0.95, 1, 0.95],
        rotateX: [-5, 5, -5],
        rotateY: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glossy highlight */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 100% / 0.2) 0%, transparent 50%)",
        }}
      />
      {/* Edge highlight */}
      <div 
        className="absolute inset-0 rounded-lg ring-1 ring-white/10"
      />
    </motion.div>
  );
};

export const ThreeDMarquee = ({
  className,
}: {
  images?: string[]; // Keep prop for compatibility but won't use it
  className?: string;
}) => {
  // Create a grid of tiles that represent building blocks coming together
  const tileConfig = [
    // Row 1
    { delay: 0, size: "large" as const, intensity: 1.2 },
    { delay: 0.2, size: "normal" as const, intensity: 1 },
    { delay: 0.4, size: "small" as const, intensity: 0.8 },
    { delay: 0.6, size: "normal" as const, intensity: 1.1 },
    { delay: 0.8, size: "large" as const, intensity: 1 },
    // Row 2
    { delay: 0.3, size: "normal" as const, intensity: 0.9 },
    { delay: 0.5, size: "large" as const, intensity: 1.3 },
    { delay: 0.7, size: "normal" as const, intensity: 1 },
    { delay: 0.9, size: "small" as const, intensity: 0.7 },
    { delay: 1.1, size: "normal" as const, intensity: 1.2 },
    // Row 3
    { delay: 0.6, size: "small" as const, intensity: 0.8 },
    { delay: 0.8, size: "normal" as const, intensity: 1.1 },
    { delay: 1.0, size: "large" as const, intensity: 1 },
    { delay: 1.2, size: "normal" as const, intensity: 0.9 },
    { delay: 1.4, size: "large" as const, intensity: 1.2 },
    // Row 4
    { delay: 0.9, size: "normal" as const, intensity: 1 },
    { delay: 1.1, size: "small" as const, intensity: 0.8 },
    { delay: 1.3, size: "normal" as const, intensity: 1.1 },
    { delay: 1.5, size: "large" as const, intensity: 1.3 },
    { delay: 1.7, size: "normal" as const, intensity: 0.9 },
  ];

  // Split into 4 columns
  const columns = [
    tileConfig.slice(0, 5),
    tileConfig.slice(5, 10),
    tileConfig.slice(10, 15),
    tileConfig.slice(15, 20),
  ];

  return (
    <div className={cn("mx-auto block h-full w-full", className)}>
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: "rotateX(55deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="grid grid-cols-4 gap-4 md:gap-6 w-[200%] h-[200%]">
            {columns.map((column, colIndex) => (
              <motion.div
                animate={{ 
                  y: colIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] 
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-center gap-4 md:gap-6"
              >
                {/* Duplicate tiles for seamless loop */}
                {[...column, ...column].map((tile, tileIndex) => (
                  <Tile 
                    key={`${colIndex}-${tileIndex}`}
                    delay={tile.delay + (colIndex * 0.2)}
                    size={tile.size}
                    intensity={tile.intensity}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
