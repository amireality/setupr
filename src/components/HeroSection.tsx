import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      {/* Subtle warm accent glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4 md:px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Launch your business the right way</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5 text-balance">
            Turn Your Skills Into a{" "}
            <span className="gradient-text">Legitimate Business</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Legal setup, digital presence, and foundational systems — handled for you, without the chaos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
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
          <div className="mt-12 pt-6 border-t border-border/20">
            <p className="text-sm text-muted-foreground/70 mb-3">Trusted by 2,500+ entrepreneurs across India</p>
            <div className="flex items-center gap-6 opacity-30">
              <div className="h-5 w-16 bg-foreground/10 rounded" />
              <div className="h-5 w-14 bg-foreground/10 rounded" />
              <div className="h-5 w-20 bg-foreground/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;