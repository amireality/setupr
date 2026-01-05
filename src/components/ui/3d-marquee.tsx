"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div className={cn("mx-auto block h-full w-full", className)}>
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: "rotateX(55deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="grid grid-cols-4 gap-4 w-[200%] h-[200%]">
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col gap-4"
              >
                {/* Duplicate images for seamless loop */}
                {[...subarray, ...subarray].map((image, imageIndex) => (
                  <div className="relative shrink-0" key={imageIndex + image}>
                    <img
                      src={image}
                      alt={`marquee-${colIndex}-${imageIndex}`}
                      className="w-full aspect-[4/3] rounded-lg object-cover ring-1 ring-white/10 shadow-lg"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "hsl(var(--background))",
          "--color": "hsl(var(--primary) / 0.3)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "hsl(var(--primary) / 0.3)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-0 h-[var(--height)] w-full",
        "[background:linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:[background:linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "hsl(var(--background))",
          "--color": "hsl(var(--primary) / 0.3)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "hsl(var(--primary) / 0.3)",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset))] h-full w-[var(--width)]",
        "[background:linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:[background:linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};
