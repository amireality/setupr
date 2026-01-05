"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    // Fewer paths + moving dash segments (instead of animating gradients) = looks like
    // "traveling beams" rather than giant wave lines / blinking.
    const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
      "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
      "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
      "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
      "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
      "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
      "M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
      "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
      "M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
    ];

    // Dash settings: small visible segment + big gap so it reads as a moving streak.
    const dash = 90;
    const gap = 1400;

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
          className,
        )}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle base lines so the motion has context */}
          {paths.map((d, index) => (
            <path
              key={`base-${index}`}
              d={d}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.07"
              strokeWidth="1"
            />
          ))}

          {/* Moving streak beams */}
          {paths.map((d, index) => (
            <motion.path
              key={`beam-${index}`}
              d={d}
              stroke={`url(#beam-gradient-${index})`}
              strokeOpacity="0.9"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: [0, -(dash + gap)] }}
              transition={{
                duration: 38 + index * 2, // slower + staggered
                ease: "linear",
                repeat: Infinity,
                delay: index * 0.6,
              }}
            />
          ))}

          <defs>
            {paths.map((_, index) => (
              <linearGradient
                key={`grad-${index}`}
                id={`beam-gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {/* Orange-ish beam within theme: same primary hue, just opacity ramp */}
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="35%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="65%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";

