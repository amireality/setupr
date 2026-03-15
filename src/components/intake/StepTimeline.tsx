import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Zap, Clock, Search } from "lucide-react";

interface StepTimelineProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const options = [
  { 
    id: "immediately", 
    label: "Right away", 
    description: "I'm ready to start now",
    icon: Zap 
  },
  { 
    id: "1-2-weeks", 
    label: "In a week or two", 
    description: "I need a little time first",
    icon: Clock 
  },
  { 
    id: "exploring", 
    label: "Just looking", 
    description: "I'm gathering information",
    icon: Search 
  },
];

const StepTimeline = ({ value, onChange, onNext, onBack }: StepTimelineProps) => {
  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        When would you like to start?
      </h1>
      <p className="text-muted-foreground mb-8">
        There's no pressure. We'll work with your timeline.
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

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="hero" 
          size="lg" 
          onClick={onNext}
          disabled={!value}
          className="flex-1 sm:flex-none"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StepTimeline;