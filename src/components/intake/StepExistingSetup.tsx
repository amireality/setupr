import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Building2, FileText, Globe, Mail, XCircle } from "lucide-react";

interface StepExistingSetupProps {
  values: string[];
  onChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const options = [
  { id: "registered", label: "Registered business", icon: Building2 },
  { id: "gst", label: "GST", icon: FileText },
  { id: "website", label: "Website", icon: Globe },
  { id: "email", label: "Business email", icon: Mail },
  { id: "none", label: "None of the above", icon: XCircle },
];

const StepExistingSetup = ({ values, onChange, onNext, onBack }: StepExistingSetupProps) => {
  const toggleOption = (id: string) => {
    if (id === "none") {
      onChange(values.includes("none") ? [] : ["none"]);
      return;
    }
    
    const newValues = values.filter(v => v !== "none");
    if (newValues.includes(id)) {
      onChange(newValues.filter(v => v !== id));
    } else {
      onChange([...newValues, id]);
    }
  };

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        Do you already have any of these?
      </h1>
      <p className="text-muted-foreground mb-8">
        So we don't duplicate what you've already set up.
      </p>

      <div className="space-y-3 mb-8">
        {options.map((option) => {
          const isSelected = values.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all duration-200
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
                <span className="font-medium text-foreground">{option.label}</span>
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

export default StepExistingSetup;