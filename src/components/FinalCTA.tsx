import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Layered edge background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${layeredEdgeBg})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Asymmetric layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Spacer for asymmetry */}
            <div className="hidden lg:block lg:col-span-2" />
            
            {/* Content */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Ready to Make It Official?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
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
            <div className="hidden lg:block lg:col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
