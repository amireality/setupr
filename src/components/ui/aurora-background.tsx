"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-full min-h-screen flex-col bg-background text-foreground",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "pointer-events-none absolute -inset-[10px] opacity-70 blur-[10px] will-change-transform",
              "bg-[repeating-linear-gradient(100deg,hsl(24_95%_53%/0.3)_10%,hsl(24_95%_53%/0.2)_15%,hsl(220_15%_14%/0.3)_20%,hsl(24_95%_53%/0.25)_25%,hsl(220_15%_18%/0.2)_30%)]",
              "animate-aurora [background-size:300%_200%]",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,transparent_80%)]"
            )}
          />
        </div>
        {children}
      </div>
    </main>
  );
};
