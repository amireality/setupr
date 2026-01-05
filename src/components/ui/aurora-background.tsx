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
          "transition-bg relative flex h-full min-h-screen flex-col items-center justify-center bg-background text-foreground",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert-0 filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--accent)_15%,var(--secondary)_20%,var(--primary)_25%,var(--muted)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,hsl(var(--background))_0%,hsl(var(--background))_7%,transparent_10%,transparent_12%,hsl(var(--background))_16%)] [--white-gradient:repeating-linear-gradient(100deg,hsl(var(--foreground)/0.1)_0%,hsl(var(--foreground)/0.05)_7%,transparent_10%,transparent_12%,hsl(var(--foreground)/0.1)_16%)] [background-image:var(--white-gradient),var(--aurora)] dark:[background-image:var(--dark-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:content-[""] after:[background-attachment:fixed] after:[background-image:var(--white-gradient),var(--aurora)] dark:after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
