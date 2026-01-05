import { MessageCircle, FileCheck, Rocket } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";

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
    <section id="how-it-works" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header - right aligned for asymmetry */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="max-w-lg ml-auto text-right">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Simple Process, Powerful Results
            </h2>
            <p className="text-muted-foreground text-lg">
              Three steps to a legitimate business.
            </p>
          </div>
        </div>

        {/* Horizontal steps on desktop, vertical on mobile */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Connecting line (hidden on mobile, shown between cards on desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border/50 to-transparent" />
                  )}

                  {/* Card */}
                  <div 
                    className="relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    style={{
                      backgroundImage: `url(${glassCardBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Glass overlay */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
                    
                    {/* Border */}
                    <div className="absolute inset-0 rounded-2xl border border-border/40 group-hover:border-primary/20 transition-colors duration-500" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Step number and icon row */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-display text-4xl font-bold text-primary/20">
                          {step.number}
                        </span>
                        <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-500">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
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
    </section>
  );
};

export default HowItWorks;
