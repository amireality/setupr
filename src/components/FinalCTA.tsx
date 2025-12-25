import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32 gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Ready to Make It Official?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
            Build your business the right way, from day one. No confusion, no chaos — just clarity.
          </p>
          <Button variant="hero" size="xl" asChild>
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
