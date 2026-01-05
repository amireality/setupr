import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-20 relative">
      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* CTA Card */}
          <div className="relative rounded-2xl p-8 md:p-12 bg-secondary/40 border border-border/30 backdrop-blur-sm">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
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
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;