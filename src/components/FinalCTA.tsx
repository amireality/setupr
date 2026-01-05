import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gridGlowBg from "@/assets/grid-glow-bg.png";
import tileClusterAccent from "@/assets/tile-cluster-accent.png";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Strong central glow background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${gridGlowBg})` }}
      />
      
      {/* Intense warm glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-primary/5 to-transparent" />
      
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Tile cluster accent - bottom right */}
          <img 
            src={tileClusterAccent} 
            alt="" 
            className="absolute -bottom-8 -right-8 md:right-0 w-32 md:w-44 opacity-90 pointer-events-none"
          />

          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Make It Official?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
            Fasret your orroá, and congratula make strategy, and will chass the rise of your business.
          </p>
          
          <Button variant="hero" size="xl" asChild className="shadow-glow">
            <Link to="/services">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
