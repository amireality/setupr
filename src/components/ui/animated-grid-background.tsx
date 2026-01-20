"use client";

import { cn } from "@/lib/utils";

export const AnimatedGridBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(220 15% 20% / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(220 15% 20% / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Animated scan line effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            hsl(24 95% 53% / 0.02) 50%,
            transparent 100%
          )`,
          backgroundSize: '100% 200%',
          animation: 'gridScan 8s ease-in-out infinite',
        }}
      />

      {/* Mesh Gradient Orbs */}
      {/* Top-left warm orb */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.4) 0%, hsl(30 100% 45% / 0.2) 40%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'meshFloat1 12s ease-in-out infinite',
        }}
      />
      
      {/* Center-right amber orb */}
      <div 
        className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(30 100% 50% / 0.3) 0%, hsl(24 90% 40% / 0.15) 50%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'meshFloat2 15s ease-in-out infinite',
        }}
      />
      
      {/* Bottom warm glow */}
      <div 
        className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 45% / 0.3) 0%, hsl(24 80% 35% / 0.1) 50%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'meshFloat3 10s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes gridScan {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
        
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 3%) scale(1.05); }
          66% { transform: translate(-3%, -2%) scale(0.98); }
        }
        
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, 5%) scale(1.1); }
        }
        
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, -3%) scale(1.05); }
        }
      `}</style>
    </div>
  );
};
