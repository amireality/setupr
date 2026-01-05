import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "./ConfirmationDialog";
import type { IntakeData } from "@/pages/Intake";

interface PricingCTAProps {
  contactName: string;
  intakeData: IntakeData;
}

const PricingCTA = ({ contactName, intakeData }: PricingCTAProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();
  
  const firstName = contactName.split(" ")[0];

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("intake_submissions")
        .insert({
          full_name: intakeData.contact.fullName,
          email: intakeData.contact.email,
          phone: intakeData.contact.phone,
          city: intakeData.contact.city,
          current_stage: intakeData.currentStage,
          work_types: intakeData.workTypes,
          selected_services: intakeData.selectedServices,
          existing_setup: intakeData.existingSetup,
          timeline: intakeData.timeline,
          status: "confirmed",
        });

      if (dbError) {
        throw new Error("Failed to save submission");
      }

      // Send admin notification (non-blocking, don't fail if this errors)
      await supabase.functions.invoke("notify-admin", {
        body: {
          fullName: intakeData.contact.fullName,
          email: intakeData.contact.email,
          phone: intakeData.contact.phone,
          city: intakeData.contact.city,
          currentStage: intakeData.currentStage,
          workTypes: intakeData.workTypes,
          selectedServices: intakeData.selectedServices,
          existingSetup: intakeData.existingSetup,
          timeline: intakeData.timeline,
        },
      }).catch(() => {
        // Notification is secondary - don't fail the submission
      });

      setShowConfirmation(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to proceed?
            </h2>
            <p className="text-muted-foreground mb-8">
              Once you confirm, our team will reach out to begin the setup.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm & Proceed
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <ConfirmationDialog open={showConfirmation} firstName={firstName} />
    </>
  );
};

export default PricingCTA;
