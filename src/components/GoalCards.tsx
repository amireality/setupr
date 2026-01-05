import { useState } from "react";
import { Rocket, Briefcase, TrendingUp, Check } from "lucide-react";

const goals = [
  {
    id: "start",
    icon: Rocket,
    title: "Starting Fresh",
    description: "You have a skill or idea and want to start officially.",
  },
  {
    id: "formalize",
    icon: Briefcase,
    title: "Going Legit",
    description: "Already working but need legal identity and presence.",
  },
  {
    id: "scale",
    icon: TrendingUp,
    title: "Ready to Scale",
    description: "Growing and need structure, compliance, and credibility.",
  },
];

const GoalCards = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-20 relative">
      {/* Subtle section tint */}
      <div className="absolute inset-0 bg-secondary/20" />
      
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Where Are You on Your Journey?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Select your current stage and we'll guide you forward.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className="w-full group text-left"
                >
                  <div 
                    className={`relative rounded-xl p-5 md:p-6 transition-all duration-300 bg-secondary/40 border backdrop-blur-sm ${
                      isSelected 
                        ? "border-primary/50 bg-secondary/60" 
                        : "border-border/30 hover:border-border/50 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "gradient-accent shadow-glow"
                            : "bg-secondary group-hover:bg-secondary/80"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isSelected ? "text-primary-foreground" : "text-primary"
                          }`}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-semibold text-foreground mb-1">
                          {goal.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {goal.description}
                        </p>
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </div>
                  </div>
                </button>
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

export default GoalCards;