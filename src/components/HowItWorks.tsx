import { MessageCircle, FileCheck, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell Us Your Goals",
    description: "Share what you do and where you want to go.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "We Set Everything Up",
    description: "Legal, digital, and foundational systems handled.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch Confidently",
    description: "Run your business with legitimacy and trust.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-20 relative">
      {/* Section tint */}
      <div className="absolute inset-0 bg-secondary/20" />
      
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:text-right">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Simple Process, Powerful Results
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Three steps to a legitimate business.
            </p>
          </div>

          {/* Step cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-border/50 to-transparent z-10" />
                  )}

                  <div className="relative rounded-xl p-6 bg-secondary/40 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-border/50 hover:bg-secondary/50">
                    {/* Step number and icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-2xl font-bold text-primary/20">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>

                    <h3 className="font-display text-base font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
    </section>
  );
};

export default HowItWorks;