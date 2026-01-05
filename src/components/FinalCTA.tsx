import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Top boundary */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      
      {/* Layered edge background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${layeredEdgeBg})` }}
      />
      
      {/* Gradient overlay - darker for grounding */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Subtle warm glow - offset */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[100px]" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Asymmetric layout with grounding surface */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Grounding surface */}
            <div className="absolute -inset-6 md:-inset-10 rounded-2xl bg-secondary/20 -z-10" />
            
            <div className="grid lg:grid-cols-12 gap-6 items-center py-4">
              {/* Spacer for asymmetry */}
              <div className="hidden lg:block lg:col-span-1" />
              
              {/* Content */}
              <div className="lg:col-span-10">
                <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Ready to Make It Official?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  Build your business the right way. No confusion, no chaos — just clarity.
                </p>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/services">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
              
              {/* Spacer */}
              <div className="hidden lg:block lg:col-span-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
