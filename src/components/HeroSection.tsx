import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { TyperEffect } from "@/components/ui/typer-effect";
import { GlassShape } from "@/components/ui/glass-shape";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const businessTypes = ["Business", "Agency", "Startup", "Venture", "Company"];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Marquee Background with orange tiles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <ThreeDMarquee />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60" />
      
      {/* Central warm glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-primary/5 to-transparent" />
      
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Floating Glass Shapes */}
      <motion.div 
        className="absolute top-[15%] left-[8%] hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <GlassShape variant="document" size="lg" delay={0} />
      </motion.div>
      
      <motion.div 
        className="absolute top-[20%] right-[10%] hidden lg:block"
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <GlassShape variant="folder" size="md" delay={0.5} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[25%] left-[12%] hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <GlassShape variant="shield" size="sm" delay={1} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[20%] right-[8%] hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <GlassShape variant="browser" size="md" delay={0.2} />
      </motion.div>

      <div className="container relative z-10 px-4 md:px-6 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline with Typer Effect */}
          <motion.h1 
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Set up your{" "}
            <TyperEffect words={businessTypes} className="gradient-text" />.{" "}
            <span className="gradient-text">The right way.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            From legal registration to digital presence. We guide you step by step so you don't have to figure it out alone.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button variant="hero" size="xl" asChild className="shadow-glow group">
              <Link to="/intake">
                Start with your journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              onClick={scrollToHowItWorks} 
              className="glass border-primary/30 hover:border-primary/50 hover:shadow-[0_0_30px_-8px_hsl(24_95%_53%/0.3)] transition-all duration-300"
            >
              See How It Works
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;