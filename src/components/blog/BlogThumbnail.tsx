"use client";

import { Scale, Shield, Check, Globe, Layout, FileText, Building2, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogThumbnailProps {
  category: string;
  className?: string;
}

const BlogThumbnail = ({ category, className }: BlogThumbnailProps) => {
  const renderGraphic = () => {
    switch (category) {
      case "Business Formation":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Balance scale visual */}
            <div className="relative">
              {/* Scale beam */}
              <div className="w-20 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full" />
              
              {/* Center pivot */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_hsl(24_95%_53%/0.6)]" />
              
              {/* Left pan */}
              <div className="absolute -left-2 top-2 w-10 h-6 rounded-b-full border-2 border-primary/60 bg-primary/10">
                <Building2 className="w-4 h-4 text-primary absolute top-1 left-1/2 -translate-x-1/2" />
              </div>
              
              {/* Right pan */}
              <div className="absolute -right-2 top-4 w-10 h-6 rounded-b-full border-2 border-muted/60 bg-muted/10">
                <FileText className="w-4 h-4 text-muted-foreground absolute top-1 left-1/2 -translate-x-1/2" />
              </div>
              
              {/* Support lines */}
              <div className="absolute left-3 top-1 w-px h-3 bg-primary/40" />
              <div className="absolute right-3 top-1 w-px h-5 bg-muted/40" />
            </div>
            
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
          </div>
        );

      case "Compliance":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Shield with checkmark */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse" />
              
              {/* Shield body */}
              <div 
                className="relative w-16 h-20 flex items-center justify-center"
                style={{
                  clipPath: "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)",
                  background: "linear-gradient(135deg, hsl(220 15% 20% / 0.8) 0%, hsl(220 15% 15% / 0.6) 100%)",
                  border: "2px solid hsl(24 95% 53% / 0.5)",
                }}
              >
                {/* Inner shield */}
                <div 
                  className="w-12 h-14 flex items-center justify-center"
                  style={{
                    clipPath: "polygon(50% 5%, 95% 18%, 95% 58%, 50% 95%, 5% 58%, 5% 18%)",
                    background: "linear-gradient(135deg, hsl(24 95% 53% / 0.2) 0%, hsl(24 95% 45% / 0.1) 100%)",
                  }}
                >
                  <Check className="w-6 h-6 text-primary drop-shadow-[0_0_8px_hsl(24_95%_53%/0.8)]" strokeWidth={3} />
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-radial from-primary/30 to-transparent blur-lg" />
            </div>
          </div>
        );

      case "Digital Setup":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Browser window frame */}
            <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-muted/30 bg-card/80 shadow-lg">
              {/* Browser top bar */}
              <div className="h-3 bg-muted/40 flex items-center gap-0.5 px-1.5">
                <div className="w-1 h-1 rounded-full bg-destructive/60" />
                <div className="w-1 h-1 rounded-full bg-yellow-500/60" />
                <div className="w-1 h-1 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-1 h-1.5 rounded-full bg-muted/30" />
              </div>
              
              {/* Browser content */}
              <div className="p-1.5 space-y-1">
                {/* Header */}
                <div className="h-1 bg-primary/40 rounded-full w-1/2" />
                {/* Content lines */}
                <div className="h-0.5 bg-muted/20 rounded-full w-full" />
                <div className="h-0.5 bg-muted/20 rounded-full w-3/4" />
                {/* Layout blocks */}
                <div className="flex gap-1 pt-0.5">
                  <div className="w-1/3 h-2 bg-primary/20 rounded" />
                  <div className="w-2/3 h-2 bg-muted/15 rounded" />
                </div>
              </div>
              
              {/* Decorative cursor */}
              <div className="absolute bottom-2 right-2">
                <Globe className="w-3 h-3 text-primary/60" />
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent" />
          </div>
        );

      case "Tax Tips":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Stacked documents with receipt */}
            <div className="relative">
              {/* Back document */}
              <div 
                className="absolute -left-2 -top-1 w-12 h-16 rounded-lg bg-muted/20 border border-muted/20 transform rotate-[-8deg]"
              />
              
              {/* Middle document */}
              <div 
                className="absolute left-0 top-0 w-12 h-16 rounded-lg bg-muted/30 border border-muted/30 transform rotate-[-4deg]"
              />
              
              {/* Front receipt */}
              <div 
                className="relative w-12 h-16 rounded-lg bg-card border border-primary/30 shadow-lg overflow-hidden"
              >
                {/* Receipt header */}
                <div className="h-3 bg-primary/20 flex items-center justify-center">
                  <Receipt className="w-2 h-2 text-primary" />
                </div>
                
                {/* Receipt lines */}
                <div className="p-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="h-0.5 bg-muted/30 rounded w-4" />
                    <div className="h-0.5 bg-muted/30 rounded w-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-0.5 bg-muted/30 rounded w-5" />
                    <div className="h-0.5 bg-muted/30 rounded w-2" />
                  </div>
                  <div className="h-px bg-muted/20 my-1" />
                  <div className="flex justify-between items-center">
                    <div className="h-0.5 bg-primary/40 rounded w-3" />
                    <div className="h-0.5 bg-primary/40 rounded w-3" />
                  </div>
                </div>
              </div>
              
              {/* Floating percentage badge */}
              <div className="absolute -right-3 -top-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground shadow-[0_0_12px_hsl(24_95%_53%/0.5)]">
                %
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent" />
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <FileText className="w-12 h-12 text-primary/60" />
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-lg" />
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "group-hover:scale-[1.02]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, hsl(220 10% 11%) 0%, hsl(220 15% 8%) 100%)",
      }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(220 15% 20% / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(220 15% 20% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px',
        }}
      />
      
      {/* Orange glow - intensifies on hover */}
      <div 
        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, hsl(24 95% 53% / 0.15) 0%, transparent 60%)",
        }}
      />
      
      {/* Graphic content */}
      <div className="relative z-10 w-full h-full">
        {renderGraphic()}
      </div>
      
      {/* Top highlight */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(24 95% 53% / 0.3) 50%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default BlogThumbnail;
