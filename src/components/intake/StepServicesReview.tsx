import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Plus } from "lucide-react";
import { services, type ServiceId } from "@/data/services";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepServicesReviewProps {
  selectedServices: ServiceId[];
  onChange: (services: ServiceId[]) => void;
  onNext: () => void;
  onBack: () => void;
}

// Get public services for the review step grouped by category
const allServices = services
  .filter(s => s.visibility === "public")
  .map(s => ({
    id: s.service_id,
    name: s.service_name,
    category: s.category,
  }));

const categoryLabels: Record<string, { title: string; subtitle: string }> = {
  formation: { title: "Build Foundation", subtitle: "Your legal identity starts here" },
  digital: { title: "Go Online", subtitle: "Create your digital presence" },
  compliance: { title: "Stay Protected", subtitle: "Keep penalties at bay" },
  expert: { title: "Get Backed", subtitle: "Expert help when you need it" },
};

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

  // Group unselected by category
  const groupedUnselected = unselectedList.reduce((acc, service) => {
    const cat = service.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {} as Record<string, typeof unselectedList>);

  // Bento grid span patterns for services within each category
  const getSpanClass = (index: number, total: number) => {
    if (total <= 2) return "col-span-1";
    // Create asymmetric pattern: first item larger, alternating sizes
    if (index === 0) return "col-span-2";
    if (index % 3 === 1) return "col-span-1";
    if (index % 3 === 2) return "col-span-1";
    return "col-span-2";
  };

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        Your selected services
      </h1>
      <p className="text-muted-foreground mb-8">
        You can add or remove services here.
      </p>

      {selectedList.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">Selected</h3>
          <div className="grid grid-cols-2 gap-3">
            {selectedList.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleService(service.id)}
                className={cn(
                  "flex items-center gap-3 p-3 md:p-4 rounded-xl text-left transition-all",
                  "border-2 border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
                  "hover:from-primary/20 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)]",
                  "group",
                  getSpanClass(index, selectedList.length)
                )}
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground">{service.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {Object.keys(groupedUnselected).length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {selectedList.length > 0 ? "Add more services" : "Select services"}
          </h3>
          
          <div className="space-y-6">
            {Object.entries(groupedUnselected).map(([category, categoryServices], catIndex) => {
              const catInfo = categoryLabels[category] || { title: category, subtitle: "" };
              
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="rounded-2xl border border-border/30 bg-secondary/30 overflow-hidden"
                >
                  {/* Category header with orange glow */}
                  <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2)_0%,transparent_70%)]" />
                    <h4 className="font-display text-base md:text-lg font-bold text-foreground relative z-10">
                      {catInfo.title}
                    </h4>
                    <p className="text-xs text-muted-foreground relative z-10">{catInfo.subtitle}</p>
                  </div>
                  
                  {/* Bento grid of services */}
                  <div className="p-3 md:p-4">
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      {categoryServices.map((service, index) => (
                        <motion.button
                          key={service.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => toggleService(service.id)}
                          className={cn(
                            "flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl text-left transition-all",
                            "border border-border/40 bg-background/50 hover:border-primary/40 hover:bg-primary/5",
                            "hover:shadow-[0_0_20px_-8px_hsl(var(--primary)/0.3)]",
                            "group",
                            getSpanClass(index, categoryServices.length)
                          )}
                        >
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-background/50 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                            <Plus className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">{service.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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