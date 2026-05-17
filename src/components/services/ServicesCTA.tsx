import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
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
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: selectedCount > 0 ? 0 : 100,
          opacity: selectedCount > 0 ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
        className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none"
      >
        <div className="container max-w-2xl mx-auto pointer-events-auto">
          <div
            className={cn(
              "floating-island rounded-2xl px-6 py-4 flex items-center justify-between gap-4",
              selectedCount > 0 && "active"
            )}
          >
            {/* Left side: selection info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {selectedCount} service{selectedCount !== 1 ? "s" : ""} selected
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  From ₹{formatPrice(total)} · Final quote after call
                </p>
              </div>
            </div>

            {/* Right side: continue button */}
            <Button
              variant="hero"
              size="lg"
              onClick={handleContinue}
              disabled={selectedCount === 0}
              className="flex-shrink-0 shadow-glow"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicesCTA;
