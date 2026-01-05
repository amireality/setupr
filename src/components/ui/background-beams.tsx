"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    // More paths with tighter spacing for denser effect
    const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-370 -195C-370 -195 -302 210 162 337C626 464 694 869 694 869",
      "M-360 -201C-360 -201 -292 204 172 331C636 458 704 863 704 863",
      "M-350 -207C-350 -207 -282 198 182 325C646 452 714 857 714 857",
      "M-340 -213C-340 -213 -272 192 192 319C656 446 724 851 724 851",
      "M-330 -219C-330 -219 -262 186 202 313C666 440 734 845 734 845",
      "M-320 -225C-320 -225 -252 180 212 307C676 434 744 839 744 839",
      "M-310 -231C-310 -231 -242 174 222 301C686 428 754 833 754 833",
      "M-300 -237C-300 -237 -232 168 232 295C696 422 764 827 764 827",
      "M-290 -243C-290 -243 -222 162 242 289C706 416 774 821 774 821",
      "M-280 -249C-280 -249 -212 156 252 283C716 410 784 815 784 815",
      "M-270 -255C-270 -255 -202 150 262 277C726 404 794 809 794 809",
      "M-260 -261C-260 -261 -192 144 272 271C736 398 804 803 804 803",
      "M-250 -267C-250 -267 -182 138 282 265C746 392 814 797 814 797",
      "M-240 -273C-240 -273 -172 132 292 259C756 386 824 791 824 791",
      "M-230 -279C-230 -279 -162 126 302 253C766 380 834 785 834 785",
      "M-220 -285C-220 -285 -152 120 312 247C776 374 844 779 844 779",
      "M-210 -291C-210 -291 -142 114 322 241C786 368 854 773 854 773",
      "M-200 -297C-200 -297 -132 108 332 235C796 362 864 767 864 767",
      "M-190 -303C-190 -303 -122 102 342 229C806 356 874 761 874 761",
      "M-180 -309C-180 -309 -112 96 352 223C816 350 884 755 884 755",
      "M-170 -315C-170 -315 -102 90 362 217C826 344 894 749 894 749",
      "M-160 -321C-160 -321 -92 84 372 211C836 338 904 743 904 743",
      "M-150 -327C-150 -327 -82 78 382 205C846 332 914 737 914 737",
      "M-140 -333C-140 -333 -72 72 392 199C856 326 924 731 924 731",
      "M-130 -339C-130 -339 -62 66 402 193C866 320 934 725 934 725",
      "M-120 -345C-120 -345 -52 60 412 187C876 314 944 719 944 719",
      "M-110 -351C-110 -351 -42 54 422 181C886 308 954 713 954 713",
      "M-100 -357C-100 -357 -32 48 432 175C896 302 964 707 964 707",
      "M-90 -363C-90 -363 -22 42 442 169C906 296 974 701 974 701",
    ];

    // Small dot with tiny tail - like shooting stars
    const dash = 20;
    const gap = 800;

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden pointer-events-none",
          className,
        )}
      >
        <svg
          className="absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Very subtle base lines */}
          {paths.map((d, index) => (
            <path
              key={`base-${index}`}
              d={d}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.04"
              strokeWidth="0.5"
            />
          ))}

          {/* Shooting star beams - small dots with tail */}
          {paths.map((d, index) => (
            <motion.path
              key={`beam-${index}`}
              d={d}
              stroke={`url(#shooting-star-${index})`}
              strokeOpacity="1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`}
              initial={{ strokeDashoffset: gap }}
              animate={{ strokeDashoffset: [gap, -(dash + gap * 2)] }}
              transition={{
                duration: 25 + (index % 5) * 3,
                ease: "linear",
                repeat: Infinity,
                delay: index * 0.4,
              }}
            />
          ))}

          <defs>
            {paths.map((_, index) => (
              <linearGradient
                key={`grad-${index}`}
                id={`shooting-star-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {/* Shooting star: bright head, fading tail */}
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(35 95% 75%)" stopOpacity="1" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";

