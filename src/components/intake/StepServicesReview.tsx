import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Plus } from "lucide-react";
import { services, type ServiceId } from "@/data/services";

interface StepServicesReviewProps {
  selectedServices: ServiceId[];
  onChange: (services: ServiceId[]) => void;
  onNext: () => void;
  onBack: () => void;
}

// Get public services for the review step
const allServices = services
  .filter(s => s.visibility === "public")
  .map(s => ({
    id: s.service_id,
    name: s.service_name,
    category: s.category,
  }));

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

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        Your selected services
      </h1>
      <p className="text-muted-foreground mb-8">
        You can add or remove services here.
      </p>

      {selectedList.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Selected</h3>
          <div className="flex flex-wrap gap-2">
            {selectedList.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary bg-primary/5 text-sm font-medium text-foreground transition-all hover:bg-primary/10"
              >
                <Check className="w-4 h-4 text-primary" />
                {service.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {unselectedList.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            {selectedList.length > 0 ? "Add more services" : "Select services"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {unselectedList.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
              >
                <Plus className="w-4 h-4" />
                {service.name}
              </button>
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
