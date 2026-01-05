import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Wrench, Package, Users, MapPin, HelpCircle } from "lucide-react";

interface StepWorkTypeProps {
  values: string[];
  onChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const options = [
  { id: "service", label: "Service-based", icon: Wrench },
  { id: "product", label: "Product-based", icon: Package },
  { id: "agency", label: "Agency or studio", icon: Users },
  { id: "local", label: "Local business", icon: MapPin },
  { id: "other", label: "Something else", icon: HelpCircle },
];

const StepWorkType = ({ values, onChange, onNext, onBack }: StepWorkTypeProps) => {
  const toggleOption = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter(v => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        What kind of work do you do?
      </h1>
      <p className="text-muted-foreground mb-8">
        Select all that apply.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {options.map((option) => {
          const isSelected = values.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`
                p-4 rounded-xl border-2 text-left transition-all duration-200
                ${isSelected 
                  ? "border-primary bg-primary/5 shadow-card-hover" 
                  : "border-border bg-card hover:border-primary/30 shadow-card"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}
                `}>
                  {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <option.icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-medium text-foreground text-sm">{option.label}</span>
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
          disabled={values.length === 0}
          className="flex-1 sm:flex-none"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StepWorkType;