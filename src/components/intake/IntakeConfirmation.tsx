import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { IntakeData } from "@/pages/Intake";

interface IntakeConfirmationProps {
  data: IntakeData;
}

const IntakeConfirmation = ({ data }: IntakeConfirmationProps) => {
  return (
    <div className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-8 animate-fade-up shadow-glow">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up-delay-1">
            Thank you, {data.contact.fullName.split(" ")[0]}!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 animate-fade-up-delay-2">
            We've received your information. Our team will review your requirements and share the next steps shortly.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8 animate-fade-up-delay-3 shadow-card">
            <h3 className="font-medium text-foreground mb-4">What happens next?</h3>
            <ul className="text-left space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>We'll review your selected services and requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>You'll receive a personalized proposal via email or WhatsApp</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Once confirmed, we'll begin setting up your business</span>
              </li>
            </ul>
          </div>

          <Link to="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntakeConfirmation;