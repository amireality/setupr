import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-hero py-20">
      <div className="container px-4 md:px-6">
        {/* CTA Section */}
        <div className="text-center mb-16 pb-16 border-b border-primary-foreground/10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Make It Official?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Join thousands of entrepreneurs who've built their businesses the right way.
          </p>
          <Button variant="hero" size="xl">
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Footer links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent" />
            <span className="font-display text-xl font-bold text-primary-foreground">LegitBiz</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
              Services
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
              Privacy
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 LegitBiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
