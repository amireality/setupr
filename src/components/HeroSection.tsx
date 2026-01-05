import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // Business-themed images for the marquee
  const images = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Marquee Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <ThreeDMarquee images={images} />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Central warm glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent" />
      
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

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
            <Button variant="heroOutline" size="xl" onClick={scrollToHowItWorks} className="glass border-primary/30 hover:border-primary/50">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;