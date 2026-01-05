import { FileCheck } from "lucide-react";

const PricingConfirmation = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-8 animate-fade-up shadow-glow">
            <FileCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 animate-fade-up-delay-1 text-balance">
            Here's your setup plan
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-up-delay-2">
            A clear breakdown of what we'll set up for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingConfirmation;
