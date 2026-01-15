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

const categoryHighlights: Record<string, { title: string; subtitle: string; description: string }> = {
  "formation": { title: "Build Foundation", subtitle: "Legal identity first", description: "Company registration, GST, PAN, legal identity setup" },
  "digital": { title: "Go Online", subtitle: "Be found everywhere", description: "Website, domain, business email, branding essentials" },
  "compliance": { title: "Stay Safe", subtitle: "Zero penalty risk", description: "Annual filings, GST returns, statutory compliance" },
  "expert": { title: "Get Help", subtitle: "Experts on demand", description: "CA/CS consultation, renewals, ongoing support" },
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Building2;
            const categoryServices = getServicesByCategory(category.category_id);
            const highlight = categoryHighlights[category.category_id] || { title: category.title, subtitle: "", description: category.intro };

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value={category.category_id}
                    className="rounded-2xl border border-border/30 bg-secondary/40 backdrop-blur-sm data-[state=open]:border-primary/40 data-[state=open]:shadow-glow transition-all duration-300 overflow-hidden hover:border-primary/30 hover:shadow-[0_0_40px_-15px_hsl(var(--primary)/0.3)] group/bento"
                  >
                    <AccordionTrigger className="py-0 hover:no-underline group">
                      <div className="flex flex-col w-full">
                        {/* Glow header with psychological title */}
                        <div className={cn(
                          "w-full flex flex-col items-center justify-center p-4 md:p-6 rounded-t-2xl bg-gradient-to-br relative overflow-hidden",
                          category.gradient
                        )}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.25)_0%,transparent_60%)]" />
                          <span className="font-display text-xl md:text-2xl font-bold text-foreground text-center relative z-10">{highlight.title}</span>
                          <span className="text-sm text-muted-foreground text-center relative z-10">{highlight.subtitle}</span>
                        </div>
                        {/* Content */}
                        <div className="flex items-center gap-4 p-4 text-left">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                            "bg-background/50 group-hover:bg-primary/20"
                          )}>
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5">
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {categoryServices.slice(0, 8).map((service) => (
                          <Link
                            key={service.id}
                            to={`/services/${service.service_id}`}
                            className="flex items-center gap-2 p-3 rounded-xl bg-background/50 hover:bg-primary/10 border border-border/20 hover:border-primary/30 transition-all group"
                          >
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors">{service.service_name}</span>
                          </Link>
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
                </Accordion>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollapsibleServices;
