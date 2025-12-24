import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCTAProps {
  contactName: string;
}

const PricingCTA = ({ contactName }: PricingCTAProps) => {
  const firstName = contactName.split(" ")[0];

  const handleConfirm = () => {
    // Future: integrate with backend/payment
    console.log("Confirmed by:", contactName);
    alert(`Thank you, ${firstName}! Our team will contact you shortly to start the setup.`);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Proceed?
          </h2>
          <p className="text-muted-foreground mb-8">
            Once confirmed, our team will contact you to start the setup.
          </p>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleConfirm}
            className="min-w-[200px]"
          >
            Confirm & Proceed
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
