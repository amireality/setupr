import { Check, Building2, Globe, Eye } from "lucide-react";
import type { ServiceId } from "@/pages/Services";
import { cn } from "@/lib/utils";

interface Service {
  id: ServiceId;
  name: string;
  description: string;
}

interface Category {
  title: string;
  icon: React.ElementType;
  services: Service[];
  gradient: string;
}

const categories: Category[] = [
  {
    title: "Business formation",
    icon: Building2,
    gradient: "from-primary/20 via-primary/10 to-transparent",
    services: [
      { id: "proprietorship", name: "Company registration", description: "Proprietorship, LLP, or Private Limited" },
      { id: "gst", name: "GST registration", description: "Required for invoicing and tax compliance" },
      { id: "msme", name: "MSME registration", description: "Access to government schemes" },
      { id: "pan-tan", name: "PAN / TAN", description: "Tax identity for your business" },
    ],
  },
  {
    title: "Digital presence",
    icon: Globe,
    gradient: "from-accent/20 via-accent/10 to-transparent",
    services: [
      { id: "website", name: "Website", description: "A simple, professional website" },
      { id: "domain-hosting", name: "Domain & hosting", description: "Your own web address" },
      { id: "email", name: "Business email", description: "Email with your domain name" },
      { id: "brand-identity", name: "Brand basics", description: "Logo and visual identity" },
    ],
  },
  {
    title: "Visibility",
    icon: Eye,
    gradient: "from-secondary/40 via-secondary/20 to-transparent",
    services: [
      { id: "social-media", name: "Social media setup", description: "Profiles on key platforms" },
      { id: "google-business", name: "Google Business", description: "Appear in local search results" },
      { id: "trust-assets", name: "Trust assets", description: "Testimonials, case studies, credentials" },
    ],
  },
];

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
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-4 md:grid-cols-3 max-w-6xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className={cn(
                "row-span-1 rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4",
                "bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40",
                "flex flex-col overflow-hidden"
              )}
            >
              {/* Header skeleton */}
              <CategorySkeleton gradient={category.gradient} />
              
              {/* Category header */}
              <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                    <category.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {category.title}
                  </h2>
                </div>
              </div>
              
              {/* Services list */}
              <div className="space-y-2 mt-2">
                {category.services.map((service) => {
                  const isSelected = selectedServices.has(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => onToggle(service.id)}
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
                            {service.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
