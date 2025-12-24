import { Check, Building2, Globe, Eye } from "lucide-react";
import type { ServiceId } from "@/pages/Services";

interface Service {
  id: ServiceId;
  name: string;
  description: string;
}

interface Category {
  title: string;
  icon: React.ElementType;
  services: Service[];
}

const categories: Category[] = [
  {
    title: "Business Formation",
    icon: Building2,
    services: [
      { id: "proprietorship", name: "Proprietorship / LLP / Private Limited", description: "Company registration based on your needs" },
      { id: "gst", name: "GST Registration", description: "Tax compliance setup" },
      { id: "msme", name: "MSME (Udyam) Registration", description: "Government benefits & schemes access" },
      { id: "pan-tan", name: "PAN / TAN Assistance", description: "Tax identity numbers" },
    ],
  },
  {
    title: "Digital Presence",
    icon: Globe,
    services: [
      { id: "website", name: "Professional Website", description: "Your online home" },
      { id: "domain-hosting", name: "Domain & Hosting Setup", description: "Your own web address" },
      { id: "email", name: "Business Email Setup", description: "Professional communication" },
      { id: "brand-identity", name: "Basic Brand Identity", description: "Logo & visual basics" },
    ],
  },
  {
    title: "Visibility Setup",
    icon: Eye,
    services: [
      { id: "social-media", name: "Social Media Profile Setup", description: "Platform presence" },
      { id: "google-business", name: "Google Business Profile Setup", description: "Local discoverability" },
      { id: "trust-assets", name: "Basic Trust Assets", description: "Credibility foundations" },
    ],
  },
];

interface ServiceCategoriesProps {
  selectedServices: Set<ServiceId>;
  onToggle: (serviceId: ServiceId) => void;
}

const ServiceCategories = ({ selectedServices, onToggle }: ServiceCategoriesProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {categories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className={`animate-fade-up-delay-${categoryIndex + 1}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {category.title}
                </h2>
              </div>
              
              <div className="space-y-3">
                {category.services.map((service) => {
                  const isSelected = selectedServices.has(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => onToggle(service.id)}
                      className={`
                        w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                        ${isSelected 
                          ? "border-primary bg-primary/5 shadow-card-hover" 
                          : "border-border bg-card hover:border-primary/30 hover:bg-card/80 shadow-card"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200
                          ${isSelected 
                            ? "border-primary bg-primary" 
                            : "border-muted-foreground/30"
                          }
                        `}>
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