import { Check, Building2, Globe, Eye, Shield, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  serviceCategories, 
  getServicesByCategory,
  type ServiceId 
} from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Globe,
  Eye,
  Shield,
  Settings,
};

interface ServiceCategoriesProps {
  selectedServices: Set<ServiceId>;
  onToggle: (serviceId: ServiceId) => void;
}

const CategorySkeleton = ({ gradient }: { gradient: string }) => (
  <div className={cn(
    "flex flex-1 w-full h-full min-h-[4rem] rounded-xl bg-gradient-to-br",
    gradient
  )}>
    <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
  </div>
);

const ServiceCategories = ({ selectedServices, onToggle }: ServiceCategoriesProps) => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-secondary/10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {serviceCategories.map((category) => {
            const Icon = iconMap[category.icon] || Building2;
            const categoryServices = getServicesByCategory(category.category_id);
            
            return (
              <div 
                key={category.category_id}
                className={cn(
                  "row-span-1 rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4",
                  "bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40",
                  "flex flex-col overflow-hidden"
                )}
              >
                <CategorySkeleton gradient={category.gradient} />
                
                <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.intro}
                  </p>
                </div>
                
                <div className="space-y-2 mt-2 flex-1">
                  {categoryServices.map((service) => {
                    const isSelected = selectedServices.has(service.service_id);
                    return (
                      <button
                        key={service.service_id}
                        onClick={() => onToggle(service.service_id)}
                        className={cn(
                          "w-full p-3 rounded-xl text-left transition-all duration-300",
                          "bg-background/50 border border-border/30",
                          isSelected 
                            ? "border-primary/50 bg-primary/10 shadow-glow" 
                            : "hover:border-primary/30 hover:bg-background/80"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200",
                            isSelected 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground/30"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground text-sm">
                              {service.service_name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {service.description_short}
                            </p>
                          </div>
                        </div>
                      </button>
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
