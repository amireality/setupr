import { Check, Building2, Globe, Eye, Shield, Settings, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
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
  "business-formation": { label: "The Foundation", sublabel: "Start your legal journey" },
  "digital-presence": { label: "Live in 48 Hrs", sublabel: "Professional online identity" },
  "trust-compliance": { label: "100% Compliant", sublabel: "Peace of mind guaranteed" },
};

const CategorySkeleton = ({ gradient, categoryId }: { gradient: string; categoryId: string }) => {
  const content = categoryGlowContent[categoryId] || { label: "Expert Help", sublabel: "Professional assistance" };

  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[4rem] rounded-xl bg-gradient-to-br relative overflow-hidden",
        gradient,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-2xl" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
        <span className="text-xl md:text-2xl font-bold font-display text-primary">{content.label}</span>
        <span className="text-xs text-muted-foreground mt-0.5">{content.sublabel}</span>
      </div>
    </div>
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
          <p className="text-muted-foreground">No services found matching your search.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative pb-32">
      <div className="absolute inset-0 bg-secondary/10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {visibleCategories.map((category) => {
            const Icon = iconMap[category.icon] || Building2;
            const categoryServices = getServicesByCategory(category.category_id);

            return (
              <div
                key={category.category_id}
                className={cn(
                  "row-span-1 rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4",
                  "bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40",
                  "flex flex-col overflow-hidden",
                )}
              >
                <CategorySkeleton gradient={category.gradient} categoryId={category.category_id} />

                <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground">{category.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{category.intro}</p>
                </div>

                <div className="space-y-2 mt-2 flex-1">
                  {categoryServices.map((service) => {
                    const isSelected = selectedServices.has(service.service_id);
                    const isInCompare = compareList.includes(service.service_id);

                    return (
                      <div
                        key={service.service_id}
                        className={cn(
                          "w-full p-3 rounded-xl text-left transition-all duration-300",
                          "bg-background/50 border border-border/30",
                          isSelected
                            ? "border-primary/50 bg-primary/10 shadow-glow"
                            : "hover:border-primary/30 hover:bg-background/80",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => onToggle(service.service_id)}
                            className={cn(
                              "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200",
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/30 hover:border-primary/50",
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground text-sm">{service.service_name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{service.description_short}</p>
                          </div>
                          <button
                            onClick={() => onToggleCompare(service.service_id)}
                            className={cn(
                              "p-1.5 rounded-lg transition-all flex-shrink-0",
                              isInCompare
                                ? "bg-primary/20 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                            )}
                            title={isInCompare ? "Remove from compare" : "Add to compare"}
                          >
                            <GitCompare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
