import { Check, Building2, Globe, Eye, Shield, Settings, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  "business-formation": { label: "The Foundation", sublabel: "Establish your legal core." },
  "digital-presence": { label: "Identity Suite", sublabel: "Claim your digital territory." },
  "trust-compliance": { label: "Clean Slate", sublabel: "Built on a compliant foundation." },
  visibility: { label: "Market Entry", sublabel: "Broaden your digital reach." },
  operations: { label: "Scale Ready", sublabel: "Systems designed for growth." },
};

const CategorySkeleton = ({
  gradient,
  categoryId,
  title,
  intro,
  Icon,
}: {
  gradient: string;
  categoryId: string;
  title: string;
  intro: string;
  Icon: React.ElementType;
}) => {
  const content = categoryGlowContent[categoryId] || { label: "Expert Help", sublabel: "Professional assistance" };

  return (
    <div className={cn("w-full rounded-xl bg-gradient-to-br relative overflow-hidden", gradient)}>
      <div className="h-32 w-full relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.12)_0%,transparent_55%)]" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />

        {/* Top glow copy */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <span className="text-xl md:text-2xl font-bold font-display text-primary">{content.label}</span>
          <span className="text-xs text-muted-foreground mt-0.5">{content.sublabel}</span>
        </div>
      </div>

      {/* Category identity (kept inside glow area so services start after this) */}
      <div className="px-4 pb-4 pt-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
            <Icon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold text-foreground leading-tight">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{intro}</p>
          </div>
        </div>
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
                <CategorySkeleton
                  gradient={category.gradient}
                  categoryId={category.category_id}
                  title={category.title}
                  intro={category.intro}
                  Icon={Icon}
                />

                <div className="space-y-2 mt-2 flex-1">
                  {categoryServices.map((service) => {
                    const isSelected = selectedServices.has(service.service_id);

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
                          <Link
                            to={`/services/${service.service_id}`}
                            className="p-1.5 rounded-lg transition-all flex-shrink-0 text-primary hover:bg-primary/20"
                            title="View service details"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
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
