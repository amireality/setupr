"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";

// Individual 3D Tile component with random movement
const Tile = ({ 
  delay = 0, 
  size = "normal",
  intensity = 1,
  randomSeed = 0,
}: { 
  delay?: number; 
  size?: "small" | "normal" | "large";
  intensity?: number;
  randomSeed?: number;
}) => {
  const sizeClasses = {
    small: "w-14 h-14 md:w-20 md:h-20",
    normal: "w-16 h-16 md:w-24 md:h-24",
    large: "w-20 h-20 md:w-28 md:h-28"
  };

  // Generate random movement values based on seed
  const randomMovement = useMemo(() => {
    const xRange = (Math.sin(randomSeed * 1.5) * 30) + (Math.cos(randomSeed * 2.3) * 20);
    const yRange = (Math.cos(randomSeed * 1.8) * 25) + (Math.sin(randomSeed * 2.1) * 15);
    const rotateRange = Math.sin(randomSeed * 2.7) * 15;
    const duration = 3 + (Math.sin(randomSeed * 3.2) * 2);
    
    return { xRange, yRange, rotateRange, duration };
  }, [randomSeed]);

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
      animate={{ 
        x: [0, randomMovement.xRange, -randomMovement.xRange * 0.5, 0],
        y: [0, -randomMovement.yRange, randomMovement.yRange * 0.7, 0],
        opacity: [0.5, 0.9, 0.7, 0.5],
        scale: [0.9, 1.05, 0.95, 0.9],
        rotateX: [-5, randomMovement.rotateRange, -randomMovement.rotateRange * 0.5, -5],
        rotateY: [-5, -randomMovement.rotateRange * 0.8, randomMovement.rotateRange, -5],
        rotateZ: [0, randomMovement.rotateRange * 0.3, -randomMovement.rotateRange * 0.2, 0],
      }}
      transition={{
        duration: randomMovement.duration + 2,
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

// Static placeholder shown before animation loads
const StaticPlaceholder = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
);

export const ThreeDMarquee = ({
  className,
}: {
  images?: string[];
  className?: string;
}) => {
  const [isReady, setIsReady] = useState(false);

  // Defer heavy animation initialization until browser is idle
  useEffect(() => {
    const startAnimation = () => setIsReady(true);
    
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(startAnimation, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      // Fallback for Safari
      const timeout = setTimeout(startAnimation, 100);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Create a reduced number of tiles for better performance
  const tiles = useMemo(() => {
    if (!isReady) return [];
    
    const tileList = [];
    const sizes: Array<"small" | "normal" | "large"> = ["normal", "large", "normal", "large", "normal", "large"];
    
    // Reduced from 180 to 72 tiles for better FID
    for (let i = 0; i < 72; i++) {
      tileList.push({
        delay: (i % 8) * 0.15,
        size: sizes[i % sizes.length],
        intensity: 0.8 + (Math.sin(i * 0.5) * 0.3),
        randomSeed: i * 1.37,
      });
    }
    return tileList;
  }, [isReady]);

  // Split into 6 columns for layout
  const columns = useMemo(() => {
    if (!isReady) return [];
    
    const cols = [];
    const tilesPerColumn = Math.ceil(tiles.length / 6);
    for (let i = 0; i < 6; i++) {
      cols.push(tiles.slice(i * tilesPerColumn, (i + 1) * tilesPerColumn));
    }
    return cols;
  }, [tiles, isReady]);

  if (!isReady) {
    return (
      <div className={cn("mx-auto block h-full w-full", className)}>
        <StaticPlaceholder />
      </div>
    );
  }

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
          <div className="grid grid-cols-6 gap-2 w-[300%] h-[300%]">
            {columns.map((column, colIndex) => (
              <div
                key={colIndex + "marquee"}
                className="flex flex-col items-center gap-2"
              >
                {column.map((tile, tileIndex) => (
                  <Tile 
                    key={`${colIndex}-${tileIndex}`}
                    delay={tile.delay + (colIndex * 0.1)}
                    size={tile.size}
                    intensity={tile.intensity}
                    randomSeed={tile.randomSeed + colIndex}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
