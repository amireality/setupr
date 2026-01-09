import { X, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DbService } from "@/hooks/useServices";
import { motion, AnimatePresence } from "framer-motion";

interface CompareBarProps {
  compareList: string[];
  services: DbService[];
  onRemove: (serviceId: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

const CompareBar = ({
  compareList,
  services,
  onRemove,
  onClear,
  onCompare,
}: CompareBarProps) => {
  if (compareList.length === 0) return null;

  const getServiceName = (serviceId: string) => {
    const service = services.find((s) => s.service_id === serviceId);
    return service?.service_name || serviceId;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div className="container max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4 border border-primary/20 shadow-glow">
            <div className="flex items-center gap-3 flex-wrap flex-1">
              <GitCompare className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Compare:</span>
              {compareList.map((serviceId) => (
                <div
                  key={serviceId}
                  className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5"
                >
                  <span className="text-sm font-medium truncate max-w-[150px]">
                    {getServiceName(serviceId)}
                  </span>
                  <button
                    onClick={() => onRemove(serviceId)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {compareList.length < 3 && (
                <span className="text-xs text-muted-foreground">
                  Add up to {3 - compareList.length} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-muted-foreground"
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={onCompare}
                disabled={compareList.length < 2}
                className={cn(
                  compareList.length >= 2
                    ? "gradient-accent"
                    : "bg-muted text-muted-foreground"
                )}
              >
                Compare ({compareList.length})
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
