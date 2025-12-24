import { useState } from "react";
import { Rocket, Briefcase, TrendingUp, Check } from "lucide-react";

const goals = [
  {
    id: "start",
    icon: Rocket,
    title: "Starting Fresh",
    description: "I'm launching a new business and need help setting up everything from scratch.",
  },
  {
    id: "formalize",
    icon: Briefcase,
    title: "Going Legit",
    description: "I've been freelancing and want to formalize my operations properly.",
  },
  {
    id: "scale",
    icon: TrendingUp,
    title: "Ready to Scale",
    description: "My business is growing and I need better structure to handle it.",
  },
];

const GoalCards = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Where Are You on Your Journey?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your current stage and we'll tailor our approach to your needs.
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
                className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-card-hover"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-card"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Selection indicator */}
                <div
                  className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
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
                      : "bg-secondary group-hover:bg-primary/10"
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
