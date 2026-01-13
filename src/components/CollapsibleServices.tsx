import { Building2, Globe, Shield, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDbCategories, useDbServices } from "@/hooks/useServices";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Globe,
  Shield,
  Users,
};

const categoryDescriptions: Record<string, string> = {
  "formation": "Company registration, GST, PAN, legal identity setup",
  "digital": "Website, domain, business email, branding essentials",
  "compliance": "Annual filings, GST returns, statutory compliance",
  "expert": "CA/CS consultation, renewals, ongoing support",
};

const CollapsibleServices = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useDbCategories();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();

  if (categoriesLoading || servicesLoading) {
    return (
      <section className="py-20 md:py-28 relative">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const publicServices = services.filter(s => s.visibility === 'public');

  const getServicesByCategory = (categoryId: string) => {
    return publicServices.filter(s => s.category === categoryId);
  };

  return (
    <section className="py-20 md:py-28 relative bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            What we handle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to start, run, and grow your business — all in one place.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Building2;
              const categoryServices = getServicesByCategory(category.category_id);
              const description = categoryDescriptions[category.category_id] || category.intro;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AccordionItem
                    value={category.category_id}
                    className="glass-card rounded-xl px-6 border-border/50 data-[state=open]:border-primary/30 transition-colors overflow-hidden"
                  >
                    <AccordionTrigger className="py-5 hover:no-underline group">
                      <div className="flex items-center gap-4 text-left">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                          "bg-primary/10 group-hover:bg-primary/20"
                        )}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {categoryServices.slice(0, 8).map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-foreground">{service.service_name}</span>
                          </div>
                        ))}
                      </div>
                      {categoryServices.length > 8 && (
                        <p className="text-xs text-muted-foreground mt-3">
                          +{categoryServices.length - 8} more services
                        </p>
                      )}
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        View all {category.title.toLowerCase()} services
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CollapsibleServices;
