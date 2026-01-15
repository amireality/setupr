import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Plus } from "lucide-react";
import { services, type ServiceId } from "@/data/services";
import { cn } from "@/lib/utils";

interface StepServicesReviewProps {
  selectedServices: ServiceId[];
  onChange: (services: ServiceId[]) => void;
  onNext: () => void;
  onBack: () => void;
}

// Get public services for the review step grouped by category
const allServices = services
  .filter(s => s.visibility === "public")
  .map(s => ({
    id: s.service_id,
    name: s.service_name,
    category: s.category,
  }));

const categoryLabels: Record<string, string> = {
  formation: "Business Formation & Legal",
  digital: "Digital Presence & Identity",
  compliance: "Trust, Compliance & Risk",
  expert: "Expert Help & Support",
};

const StepServicesReview = ({ selectedServices, onChange, onNext, onBack }: StepServicesReviewProps) => {
  const toggleService = (id: ServiceId) => {
    if (selectedServices.includes(id)) {
      onChange(selectedServices.filter(s => s !== id));
    } else {
      onChange([...selectedServices, id]);
    }
  };

  const selectedList = allServices.filter(s => selectedServices.includes(s.id));
  const unselectedList = allServices.filter(s => !selectedServices.includes(s.id));

  // Group unselected by category
  const groupedUnselected = unselectedList.reduce((acc, service) => {
    const cat = service.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {} as Record<string, typeof unselectedList>);

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        Your selected services
      </h1>
      <p className="text-muted-foreground mb-8">
        You can add or remove services here.
      </p>

      {selectedList.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">Selected</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedList.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl text-left transition-all",
                  "border-2 border-primary bg-primary/5 hover:bg-primary/10",
                  "group"
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{service.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {Object.keys(groupedUnselected).length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {selectedList.length > 0 ? "Add more services" : "Select services"}
          </h3>
          
          <div className="space-y-6">
            {Object.entries(groupedUnselected).map(([category, categoryServices]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  {categoryLabels[category] || category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl text-left transition-all",
                        "border border-border/50 bg-secondary/30 hover:border-primary/40 hover:bg-primary/5",
                        "group"
                      )}
                    >
                      <div className="w-8 h-8 rounded-lg bg-background/50 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                        <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="hero" 
          size="lg" 
          onClick={onNext}
          disabled={selectedServices.length === 0}
          className="flex-1 sm:flex-none"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StepServicesReview;
