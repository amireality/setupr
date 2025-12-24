import { FileCheck } from "lucide-react";

const PricingConfirmation = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6 animate-fade-up shadow-glow">
            <FileCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up-delay-1">
            Your Business Setup Plan Is Ready
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-up-delay-2">
            Based on your selections, here's a clear breakdown of what we'll set up for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingConfirmation;
