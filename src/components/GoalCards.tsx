import { useState } from "react";
import { Rocket, Briefcase, TrendingUp } from "lucide-react";
import glassCardBg from "@/assets/glass-card-bg.png";

const goals = [
  {
    id: "start",
    icon: Rocket,
    title: "Starting Fresh",
    description: "Starting Fresh optimizes on innovation. Fresh and then refine.",
  },
  {
    id: "formalize",
    icon: Briefcase,
    title: "Going Legit",
    description: "Unexeverers to going legit to nolytonew arovs in activities & realtions.",
  },
  {
    id: "scale",
    icon: TrendingUp,
    title: "Ready to Scale",
    description: "Ready to scale about strategies and deverlontion and prentices.",
  },
];

const GoalCards = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>("start");

  return (
    <section className="py-20 md:py-28 relative bg-background">
      {/* Subtle grid continuation */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Where Are You on Your Journey?
          </h2>

          {/* Vertical cards with glass effect */}
          <div className="grid md:grid-cols-3 gap-5">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className="w-full text-left group"
                >
                  <div 
                    className="relative rounded-2xl p-6 md:p-8 h-full transition-all duration-300 overflow-hidden"
                    style={{
                      backgroundImage: `url(${glassCardBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Glass overlay */}
                    <div className={`absolute inset-0 backdrop-blur-sm transition-all duration-300 ${
                      isSelected 
                        ? 'bg-secondary/60 border border-primary/40' 
                        : 'bg-secondary/40 border border-border/20'
                    } rounded-2xl`} />
                    
                    {/* Warm glow on selection */}
                    {isSelected && (
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    )}

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                          isSelected
                            ? "gradient-accent shadow-glow"
                            : "bg-primary/20"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-colors duration-300 ${
                            isSelected ? "text-primary-foreground" : "text-primary"
                          }`}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                        {goal.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {goal.description}
                      </p>

                      {/* Selection indicator */}
                      <div
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          isSelected
                            ? "bg-primary shadow-glow"
                            : "bg-muted-foreground/30"
                        }`}
                      />
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
