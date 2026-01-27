"use client";

import { cn } from "@/lib/utils";
import { useMemo, memo } from "react";

// Simplified static tile - no framer-motion for performance
const Tile = memo(({ 
  size = "normal",
  intensity = 1,
  animationDelay = 0,
}: { 
  size?: "small" | "normal" | "large";
  intensity?: number;
  animationDelay?: number;
}) => {
  const sizeClasses = {
    small: "w-12 h-12 md:w-16 md:h-16",
    normal: "w-14 h-14 md:w-20 md:h-20",
    large: "w-16 h-16 md:w-24 md:h-24"
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-lg relative shrink-0 tile-animate"
      )}
      style={{
        background: `linear-gradient(135deg, hsl(24 95% ${50 + intensity * 10}%) 0%, hsl(30 100% ${45 + intensity * 8}%) 50%, hsl(24 90% ${35 + intensity * 5}%) 100%)`,
        boxShadow: `
          0 4px 12px -2px hsl(24 95% 40% / 0.3),
          inset 0 1px 0 hsl(24 100% 70% / 0.2)
        `,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glossy highlight */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 100% / 0.15) 0%, transparent 50%)",
        }}
      />
    </div>
  );
});

Tile.displayName = "Tile";

export const ThreeDMarquee = memo(({
  className,
}: {
  images?: string[];
  className?: string;
}) => {
  // Reduced tile count for performance - 60 instead of 180
  const tiles = useMemo(() => {
    const tileList = [];
    const sizes: Array<"small" | "normal" | "large"> = ["normal", "large", "normal", "large"];
    
    for (let i = 0; i < 60; i++) {
      tileList.push({
        size: sizes[i % sizes.length],
        intensity: 0.8 + (Math.sin(i * 0.5) * 0.2),
        animationDelay: (i % 8) * 0.5,
      });
    }
    return tileList;
  }, []);

  // Split into 6 columns for cleaner layout
  const columns = useMemo(() => {
    const cols = [];
    const tilesPerColumn = Math.ceil(tiles.length / 6);
    for (let i = 0; i < 6; i++) {
      cols.push(tiles.slice(i * tilesPerColumn, (i + 1) * tilesPerColumn));
    }
    return cols;
  }, [tiles]);

  return (
    <div className={cn("mx-auto block h-full w-full overflow-hidden", className)}>
      <style>{`
        @keyframes tileFloat {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(0.95) translateY(0);
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1) translateY(-5px);
          }
        }
        .tile-animate {
          animation: tileFloat 4s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            transform: "rotateX(55deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 w-[180%] md:w-[300%] h-[180%] md:h-[300%]">
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col items-center gap-2"
              >
                {column.map((tile, tileIndex) => (
                  <Tile 
                    key={`${colIndex}-${tileIndex}`}
                    size={tile.size}
                    intensity={tile.intensity}
                    animationDelay={tile.animationDelay + (colIndex * 0.3)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ThreeDMarquee.displayName = "ThreeDMarquee";
