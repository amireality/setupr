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
    title: "Launch & Operate Confidently",
    description: "Run your business with legitimacy and trust.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Process, Powerful Results
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Steps container */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`inline-block bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 ${
                        isEven ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <span className="font-display text-4xl font-bold text-primary/20 mb-4 block">
                        {step.number}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 w-16 h-16 rounded-full gradient-accent flex items-center justify-center shadow-lg flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
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
