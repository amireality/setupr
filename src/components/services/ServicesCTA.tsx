import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ServiceId } from "@/pages/Services";

interface ServicesCTAProps {
  selectedServices: Set<ServiceId>;
}

const ServicesCTA = ({ selectedServices }: ServicesCTAProps) => {
  const navigate = useNavigate();
  const selectedCount = selectedServices.size;

  const handleContinue = () => {
    const servicesParam = Array.from(selectedServices).join(",");
    navigate(`/intake${servicesParam ? `?services=${servicesParam}` : ""}`);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            {selectedCount > 0 && (
              <p className="text-sm text-primary font-medium mb-4">
                {selectedCount} service{selectedCount !== 1 ? "s" : ""} selected
              </p>
            )}
            
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full sm:w-auto mb-4"
              onClick={handleContinue}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              You'll answer a few questions next. No payment required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;