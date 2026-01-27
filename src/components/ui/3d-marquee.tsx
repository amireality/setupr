"use client";

import { cn } from "@/lib/utils";
import { useMemo, memo } from "react";

// High-performance static tile using GPU acceleration and containment
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
        contain: "layout style paint",
        contentVisibility: "auto",
      }}
    >
      {/* Glossy highlight */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none"
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
  // Full 180 tiles for rich visual effect
  const tiles = useMemo(() => {
    const tileList = [];
    const sizes: Array<"small" | "normal" | "large"> = ["small", "normal", "large", "normal"];
    
    for (let i = 0; i < 180; i++) {
      tileList.push({
        size: sizes[i % sizes.length],
        intensity: 0.7 + (Math.sin(i * 0.3) * 0.3),
        animationDelay: (i % 12) * 0.4,
      });
    }
    return tileList;
  }, []);

  // Split into 8 columns for richer layout
  const columns = useMemo(() => {
    const cols = [];
    const tilesPerColumn = Math.ceil(tiles.length / 8);
    for (let i = 0; i < 8; i++) {
      cols.push(tiles.slice(i * tilesPerColumn, (i + 1) * tilesPerColumn));
    }
    return cols;
  }, [tiles]);

  return (
    <div className={cn("mx-auto block h-full w-full overflow-hidden", className)}>
      <style>{`
        @keyframes tileFloat {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(0.95) translateY(0) translateZ(0);
          }
          50% { 
            opacity: 0.85; 
            transform: scale(1.02) translateY(-8px) translateZ(0);
          }
        }
        .tile-animate {
          animation: tileFloat 5s ease-in-out infinite;
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{ 
          perspective: "1200px",
          contain: "layout style",
        }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            transform: "rotateX(55deg) rotateZ(-45deg) translateZ(0)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div 
            className="grid grid-cols-4 md:grid-cols-8 gap-2 w-[200%] md:w-[350%] h-[200%] md:h-[350%]"
            style={{ contain: "layout" }}
          >
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
                    animationDelay={tile.animationDelay + (colIndex * 0.25)}
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
