import { useState } from "react";
import { Rocket, Briefcase, TrendingUp, Check } from "lucide-react";

const goals = [
  {
    id: "start",
    icon: Rocket,
    title: "Starting Fresh",
    description: "You have a skill or idea and want to start officially, the right way.",
  },
  {
    id: "formalize",
    icon: Briefcase,
    title: "Going Legit",
    description: "You're already working but want legal identity and a professional presence.",
  },
  {
    id: "scale",
    icon: TrendingUp,
    title: "Ready to Scale",
    description: "Your business is growing and you need structure, compliance, and credibility.",
  },
];

const GoalCards = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <section className="py-28 bg-background relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance">
            Where Are You on Your Journey?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your current stage and we'll guide you forward.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;

            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`group relative p-8 rounded-2xl text-left transition-all duration-300 glass-card glass-card-hover ${
                  isSelected
                    ? "border-primary/50 shadow-glow"
                    : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Selection indicator */}
                <div
                  className={`absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isSelected
                      ? "gradient-accent shadow-glow"
                      : "bg-secondary group-hover:bg-secondary/80"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 transition-colors duration-300 ${
                      isSelected ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {goal.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {goal.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoalCards;
