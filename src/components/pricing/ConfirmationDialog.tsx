import { CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  open: boolean;
  firstName: string;
}

const ConfirmationDialog = ({ open, firstName }: ConfirmationDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center sm:text-center">
          <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4 shadow-glow">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="font-display text-2xl md:text-3xl">
            You're All Set 🎉
          </DialogTitle>
          <DialogDescription className="text-base mt-4 space-y-4">
            <p>
              Thanks for confirming your business setup, {firstName}! Our team is reviewing your details and will contact you shortly with document requirements and next steps.
            </p>
            <p className="text-sm text-muted-foreground/80 italic">
              No spam. No pressure. Just what's needed to get you set up properly.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button asChild variant="outline" size="lg">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
