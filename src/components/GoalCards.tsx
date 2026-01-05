import { useState } from "react";
import { Rocket, Briefcase, TrendingUp, Check } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";
import tileClusterAccent from "@/assets/tile-cluster-accent.png";

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
    <section className="py-32 bg-secondary/20 relative overflow-hidden">
      {/* Tile cluster accent - decorative, positioned asymmetrically */}
      <div 
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url(${tileClusterAccent})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Two-column layout on large screens */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left column - header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Where Are You on Your Journey?
            </h2>
            <p className="text-muted-foreground">
              Select your current stage and we'll guide you forward.
            </p>
          </div>

          {/* Right column - cards */}
          <div className="lg:col-span-8 space-y-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className="w-full group relative"
                >
                  <div 
                    className={`relative rounded-xl p-4 md:p-5 text-left transition-all duration-300 overflow-hidden ${
                      isSelected ? "ring-2 ring-primary/50" : ""
                    }`}
                    style={{
                      backgroundImage: `url(${glassCardBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Glass overlay */}
                    <div className={`absolute inset-0 backdrop-blur-sm transition-colors duration-300 ${
                      isSelected ? "bg-background/50" : "bg-background/70 group-hover:bg-background/60"
                    }`} />
                    
                    {/* Border */}
                    <div className={`absolute inset-0 rounded-2xl border transition-colors duration-300 ${
                      isSelected ? "border-primary/30" : "border-border/30 group-hover:border-border/50"
                    }`} />

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "gradient-accent shadow-glow"
                            : "bg-secondary/80 group-hover:bg-secondary"
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
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                          {goal.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {goal.description}
                        </p>
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalCards;
