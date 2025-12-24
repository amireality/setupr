import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServicesCTAProps {
  selectedCount: number;
}

const ServicesCTA = ({ selectedCount }: ServicesCTAProps) => {
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