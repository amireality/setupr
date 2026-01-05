import { MessageCircle, FileCheck, Rocket } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell Us Your Goals",
    description: "We will leavo yn our nononamened and tell us your goals.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "We Set Everything Up",
    description: "We set everything up and melite counting ua communication.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch Confidently",
    description: "Launch confidently to orbinmasence and renck, powerful results.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Simple Process, Powerful Results
          </h2>

          {/* Step cards with connecting line */}
          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2">
              <svg className="w-full h-12" viewBox="0 0 900 48" fill="none" preserveAspectRatio="none">
                <path 
                  d="M 50 24 Q 225 44, 450 24 Q 675 4, 850 24" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="2" 
                  fill="none"
                  className="opacity-40"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid md:grid-cols-3 gap-5 relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      backgroundImage: `url(${glassCardBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Glass overlay */}
                    <div className="absolute inset-0 backdrop-blur-sm bg-secondary/50 border border-border/30 rounded-2xl" />
                    
                    {/* Warm corner glow */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/15 rounded-full blur-2xl" />

                    <div className="relative z-10 p-6 md:p-7">
                      {/* Large step number */}
                      <span className="font-display text-5xl md:text-6xl font-bold text-primary/20 absolute top-4 left-6">
                        {step.number}
                      </span>

                      <div className="pt-12">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
