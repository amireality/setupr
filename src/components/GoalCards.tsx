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
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Grounding surface - darker base */}
      <div className="absolute inset-0 bg-secondary/40" />
      
      {/* Tile cluster accent - decorative, positioned asymmetrically */}
      <div 
        className="absolute -right-20 top-1/3 w-[300px] h-[300px] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(${tileClusterAccent})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Top boundary */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Two-column layout on large screens */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left column - header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Where Are You on Your Journey?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Select your current stage and we'll guide you forward.
            </p>
          </div>

          {/* Right column - cards with grounding surface */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Grounding surface behind cards */}
              <div className="absolute -inset-3 md:-inset-4 rounded-2xl bg-background/50 -z-10" />
              
              <div className="space-y-3">
                {goals.map((goal, index) => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.id;
                  // Intentional slight offset for visual rhythm
                  const offsetClass = index === 1 ? "ml-2 md:ml-4" : "";

                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full group relative ${offsetClass}`}
                    >
                      <div 
                        className={`relative rounded-xl p-5 md:p-6 text-left transition-all duration-300 overflow-hidden ${
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
                        <div className={`absolute inset-0 rounded-xl border transition-colors duration-300 ${
                          isSelected ? "border-primary/40" : "border-border/40 group-hover:border-border/60"
                        }`} />

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-5">
                          {/* Icon */}
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              isSelected
                                ? "gradient-accent shadow-glow"
                                : "bg-secondary/80 group-hover:bg-secondary"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 transition-colors duration-300 ${
                                isSelected ? "text-primary-foreground" : "text-primary"
                              }`}
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-0.5">
                              {goal.title}
                            </h3>
                            <p className="text-muted-foreground text-xs md:text-sm">
                              {goal.description}
                            </p>
                          </div>

                          {/* Selection indicator */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
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
        </div>
      </div>
      
      {/* Bottom boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
    </section>
  );
};

export default GoalCards;
