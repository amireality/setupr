import { useRef, useCallback } from "react";
import { Check, Building2, Globe, Eye, Shield, Settings, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { DbService, DbCategory } from "@/hooks/useServices";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Globe,
  Eye,
  Shield,
  Settings,
};

interface ServiceCategoriesProps {
  selectedServices: Set<string>;
  onToggle: (serviceId: string) => void;
  compareList: string[];
  onToggleCompare: (serviceId: string) => void;
  services: DbService[];
  categories: DbCategory[];
  searchQuery: string;
  selectedCategory: string | null;
}

// Category-specific content for the glow area
const categoryGlowContent: Record<string, { label: string; sublabel: string }> = {
  "business-formation": { label: "The Foundation", sublabel: "Establish your legal core." },
  "digital-presence": { label: "Identity Suite", sublabel: "Claim your digital territory." },
  "trust-compliance": { label: "Clean Slate", sublabel: "Built on a compliant foundation." },
  visibility: { label: "Market Entry", sublabel: "Broaden your digital reach." },
  operations: { label: "Scale Ready", sublabel: "Systems designed for growth." },
};

// Mouse-tracking spotlight effect hook
const useSpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return { ref, handleMouseMove };
};

// Individual service card with spring animation
const ServiceCard = ({
  service,
  isSelected,
  onToggle,
}: {
  service: DbService;
  isSelected: boolean;
  onToggle: (id: string) => void;
}) => {
  const { ref, handleMouseMove } = useSpotlight();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-card w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer group/service",
        "bg-background/40 border border-border/20",
        isSelected
          ? "border-primary/50 bg-primary/5 shadow-glow"
          : "hover:border-primary/20 hover:bg-background/60"
      )}
      onClick={() => onToggle(service.service_id)}
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex items-start gap-3 relative z-10">
        {/* Selection checkbox */}
        <motion.div
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200",
            isSelected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30 group-hover/service:border-primary/50"
          )}
          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Check className="w-3 h-3 text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Service info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground text-sm leading-snug">{service.service_name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description_short}</p>
        </div>

        {/* Detail link */}
        <Link
          to={`/services/${service.service_id}`}
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-lg transition-all flex-shrink-0 text-primary/60 hover:text-primary hover:bg-primary/10 opacity-0 group-hover/service:opacity-100"
          title="View service details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

const ServiceCategories = ({
  selectedServices,
  onToggle,
  compareList,
  onToggleCompare,
  services,
  categories,
  searchQuery,
  selectedCategory,
}: ServiceCategoriesProps) => {
  const getServicesByCategory = (categoryId: string) => {
    return services.filter((s) => s.category === categoryId);
  };

  // Filter categories to only show those with matching services
  const visibleCategories = categories.filter((category) => {
    if (selectedCategory && selectedCategory !== category.category_id) return false;
    return getServicesByCategory(category.category_id).length > 0;
  });

  if (visibleCategories.length === 0) {
    return (
      <section className="py-16 relative">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-12 max-w-md mx-auto"
          >
            <p className="text-muted-foreground text-sm">No services found matching your search.</p>
            <p className="text-muted-foreground/60 text-xs mt-2">Try a different keyword or clear your filters.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 relative pb-16">
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          layout
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category, catIdx) => {
              const Icon = iconMap[category.icon] || Building2;
              const categoryServices = getServicesByCategory(category.category_id);
              const content = categoryGlowContent[category.category_id] || {
                label: "Expert Help",
                sublabel: "Professional assistance",
              };

              return (
                <motion.div
                  key={category.category_id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                    delay: catIdx * 0.06,
                  }}
                  className={cn(
                    "rounded-2xl group/bento transition-all duration-300 p-4",
                    "bg-secondary/30 backdrop-blur-sm border border-border/15",
                    "flex flex-col overflow-hidden",
                    "hover:border-primary/25 hover:shadow-glow-sm"
                  )}
                >
                  {/* Category header with gradient glow */}
                  <div
                    className={cn(
                      "w-full rounded-xl bg-gradient-to-br relative overflow-hidden",
                      category.gradient
                    )}
                  >
                    <div className="h-28 w-full relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.12)_0%,transparent_55%)]" />
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                        <span className="text-xl md:text-2xl font-bold font-display text-primary">
                          {content.label}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {content.sublabel}
                        </span>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-display text-base font-semibold text-foreground leading-tight">
                            {category.title}
                          </h2>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {category.intro}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service list */}
                  <div className="space-y-2 mt-3 flex-1">
                    <AnimatePresence mode="popLayout">
                      {categoryServices.map((service) => (
                        <ServiceCard
                          key={service.service_id}
                          service={service}
                          isSelected={selectedServices.has(service.service_id)}
                          onToggle={onToggle}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
