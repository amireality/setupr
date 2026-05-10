import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { DbService } from "@/hooks/useServices";
import { formatPrice, calculateDbTotal } from "@/hooks/useServices";

interface ServicesCTAProps {
  selectedServices: Set<string>;
  services: DbService[];
}

const ServicesCTA = ({ selectedServices, services }: ServicesCTAProps) => {
  const navigate = useNavigate();
  const selectedCount = selectedServices.size;
  const total = calculateDbTotal(services, Array.from(selectedServices));

  const handleContinue = () => {
    const servicesParam = Array.from(selectedServices).join(",");
    navigate(`/intake${servicesParam ? `?services=${servicesParam}` : ""}`);
  };

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8">
            {selectedCount > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedCount} service{selectedCount !== 1 ? "s" : ""} selected
                </p>
                <p className="text-2xl font-display font-bold text-primary mb-1">
                  From ₹{formatPrice(total)}
                </p>
                <p className="text-xs text-muted-foreground mb-5">
                  Final quote shared after a quick call
                </p>
              </>
            ) : (
              <p className="text-muted-foreground mb-5">
                Select services above to continue
              </p>
            )}
            
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full sm:w-auto mb-5"
              onClick={handleContinue}
              disabled={selectedCount === 0}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Next, we'll ask a few questions. No payment needed yet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
