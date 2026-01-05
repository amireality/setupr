import { MessageCircle, FileCheck, Rocket } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";
import layeredEdgeBg from "@/assets/layered-edge-bg.png";

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
    <section id="how-it-works" className="py-20 md:py-24 relative overflow-hidden">
      {/* Visual anchor - layered edge background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ 
          backgroundImage: `url(${layeredEdgeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient overlay to ground content */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* Subtle ambient glow - offset for asymmetry */}
      <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header - right aligned for asymmetry */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="max-w-md ml-auto text-right">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Simple Process, Powerful Results
            </h2>
            <p className="text-muted-foreground">
              Three steps to a legitimate business.
            </p>
          </div>
        </div>

        {/* Cards with grounding surface */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Grounding surface */}
            <div className="absolute -inset-4 md:-inset-6 rounded-2xl bg-secondary/20 -z-10" />
            
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                // Intentional vertical offset for rhythm
                const offsetClass = index === 1 ? "md:-translate-y-2" : index === 0 ? "md:translate-y-1" : "";

                return (
                  <div
                    key={step.number}
                    className={`group relative ${offsetClass}`}
                  >
                    {/* Connecting line (between cards on desktop) */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-[55%] w-[90%] h-px bg-gradient-to-r from-border/60 via-border/30 to-transparent z-20" />
                    )}

                    {/* Card */}
                    <div 
                      className="relative rounded-xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                      style={{
                        backgroundImage: `url(${glassCardBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Glass overlay */}
                      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
                      
                      {/* Border */}
                      <div className="absolute inset-0 rounded-xl border border-border/50 group-hover:border-primary/30 transition-colors duration-500" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Step number and icon row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-display text-3xl font-bold text-primary/25">
                            {step.number}
                          </span>
                          <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-500">
                            <Icon className="w-5 h-5 text-primary-foreground" />
                          </div>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
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
