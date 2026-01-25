"use client";

import { cn } from "@/lib/utils";

export const AnimatedGridBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Animated Grid Pattern - Subtle orange lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(24 60% 50% / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(24 60% 50% / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Secondary finer grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(24 50% 45% / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(24 50% 45% / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
        }}
      />
      
      {/* Animated scan line effect - Very subtle */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            hsl(24 95% 53% / 0.04) 50%,
            transparent 100%
          )`,
          backgroundSize: '100% 200%',
          animation: 'gridScan 6s ease-in-out infinite',
        }}
      />

      {/* Mesh Gradient Orbs - Much reduced intensity */}
      {/* Top-left warm orb */}
      <div 
        className="absolute -top-[10%] md:-top-[15%] -left-[5%] w-[50%] md:w-[70%] h-[50%] md:h-[70%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.2) 0%, hsl(30 100% 45% / 0.1) 40%, transparent 65%)',
          filter: 'blur(80px)',
          opacity: 0.3,
          animation: 'meshFloat1 12s ease-in-out infinite',
        }}
      />
      
      {/* Center-right amber orb */}
      <div 
        className="absolute top-[25%] -right-[5%] md:-right-[10%] w-[40%] md:w-[55%] h-[40%] md:h-[55%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(30 100% 50% / 0.18) 0%, hsl(24 90% 40% / 0.08) 45%, transparent 65%)',
          filter: 'blur(100px)',
          opacity: 0.25,
          animation: 'meshFloat2 15s ease-in-out infinite',
        }}
      />
      
      {/* Bottom warm glow */}
      <div 
        className="absolute -bottom-[5%] left-[10%] md:left-[15%] w-[50%] md:w-[70%] h-[35%] md:h-[50%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 50% / 0.15) 0%, hsl(24 80% 40% / 0.06) 45%, transparent 65%)',
          filter: 'blur(90px)',
          opacity: 0.25,
          animation: 'meshFloat3 10s ease-in-out infinite',
        }}
      />
      
      {/* Extra center pulsing orb - hidden on mobile for performance */}
      <div 
        className="absolute top-[40%] left-[30%] w-[30%] md:w-[40%] h-[30%] md:h-[40%] rounded-full hidden sm:block"
        style={{
          background: 'radial-gradient(circle, hsl(24 100% 55% / 0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: 0.2,
          animation: 'meshPulse 4s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes gridScan {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
        
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(5%, 3%) scale(1.08); opacity: 0.35; }
          66% { transform: translate(-3%, -2%) scale(0.95); opacity: 0.25; }
        }
        
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          50% { transform: translate(-5%, 5%) scale(1.12); opacity: 0.3; }
        }
        
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          50% { transform: translate(3%, -3%) scale(1.08); opacity: 0.3; }
        }
        
        @keyframes meshPulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};
