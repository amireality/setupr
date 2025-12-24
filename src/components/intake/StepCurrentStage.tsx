import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Briefcase, Building } from "lucide-react";

interface StepCurrentStageProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const options = [
  { 
    id: "starting", 
    label: "Just starting", 
    description: "I have a skill or idea and want to begin officially",
    icon: Sprout 
  },
  { 
    id: "going-legit", 
    label: "Already working, want to go legit", 
    description: "I'm freelancing but need legal structure",
    icon: Briefcase 
  },
  { 
    id: "registered", 
    label: "Registered, want better structure", 
    description: "I have a business but need better systems",
    icon: Building 
  },
];

const StepCurrentStage = ({ value, onChange, onNext }: StepCurrentStageProps) => {
  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        Where are you right now?
      </h1>
      <p className="text-muted-foreground mb-8">
        This helps us understand your starting point.
      </p>

      <div className="space-y-3 mb-8">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`
                w-full p-5 rounded-xl border-2 text-left transition-all duration-200
                ${isSelected 
                  ? "border-primary bg-primary/5 shadow-card-hover" 
                  : "border-border bg-card hover:border-primary/30 shadow-card"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all
                  ${isSelected ? "gradient-accent" : "bg-secondary"}
                `}>
                  <option.icon className={`w-6 h-6 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{option.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button 
        variant="hero" 
        size="lg" 
        onClick={onNext}
        disabled={!value}
        className="w-full sm:w-auto"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default StepCurrentStage;