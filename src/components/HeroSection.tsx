import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gridGlowBg from "@/assets/grid-glow-bg.png";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid glow background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${gridGlowBg})` }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Subtle warm accent glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[140px] animate-glow-pulse" />

      <div className="container relative z-10 px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Badge - left aligned on desktop */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Launch your business the right way</span>
          </div>

          {/* Headline - left aligned for asymmetry */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 text-balance">
            Turn Your Skills Into a{" "}
            <span className="gradient-text">Legitimate Business</span>
          </h1>

          {/* Subheadline - shorter, left aligned */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Legal setup, digital presence, and foundational systems — handled for you, without the chaos.
          </p>

          {/* CTA Buttons - left aligned */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/services">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" onClick={scrollToHowItWorks}>
              See How It Works
            </Button>
          </div>

          {/* Trust indicators - left aligned */}
          <div className="animate-fade-up-delay-4 mt-16 pt-8 border-t border-border/20">
            <p className="text-sm text-muted-foreground/70 mb-4">Trusted by 2,500+ entrepreneurs across India</p>
            <div className="flex items-center gap-6 opacity-30">
              <div className="h-6 w-20 bg-foreground/10 rounded" />
              <div className="h-6 w-16 bg-foreground/10 rounded" />
              <div className="h-6 w-24 bg-foreground/10 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
