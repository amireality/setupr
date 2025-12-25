import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Warm glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Launch your business the right way</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-8 text-balance">
            Turn Your Skills Into a{" "}
            <span className="gradient-text">Legitimate Business</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We help professionals and small teams become registered, credible businesses with legal setup, digital presence, and zero vendor chaos.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
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

          {/* Trust indicators */}
          <div className="animate-fade-up-delay-4 mt-20 pt-10 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-6">Trusted by 2,500+ entrepreneurs across India</p>
            <div className="flex items-center justify-center gap-8 opacity-40">
              <div className="h-8 w-24 bg-foreground/10 rounded-lg" />
              <div className="h-8 w-20 bg-foreground/10 rounded-lg" />
              <div className="h-8 w-28 bg-foreground/10 rounded-lg" />
              <div className="h-8 w-24 bg-foreground/10 rounded-lg hidden sm:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
