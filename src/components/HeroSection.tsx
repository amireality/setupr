import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gridGlowBg from "@/assets/grid-glow-bg.png";
import tileClusterAccent from "@/assets/tile-cluster-accent.png";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with grid and central glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gridGlowBg})` }}
      />
      
      {/* Central warm glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent" />
      
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Tile cluster accent - decorative element in top right area */}
      <img 
        src={tileClusterAccent} 
        alt="" 
        className="absolute top-[15%] right-[5%] md:top-[20%] md:right-[8%] w-20 md:w-32 lg:w-40 opacity-60 pointer-events-none"
      />

      <div className="container relative z-10 px-4 md:px-6 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5 text-balance animate-fade-up">
            Turn Your Skills Into a{" "}
            <span className="gradient-text">Legitimate Business</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up-delay-1">
            Legal setup, digital presence, and foundational systems — handled for you, without the chaos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-2">
            <Button variant="hero" size="xl" asChild className="shadow-glow">
              <Link to="/services">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              onClick={scrollToHowItWorks}
              className="glass border-primary/30 hover:border-primary/50"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
