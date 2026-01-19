import { useState } from "react";
import { Building2, Globe, Shield, Users, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDbCategories, useDbServices } from "@/hooks/useServices";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Globe,
  Shield,
  Users,
};

// Unique psychological titles and subtitles for each category
const categoryHighlights: Record<string, { title: string; subtitle: string; description: string }> = {
  "formation": { title: "Business Formation & Legal Identity", subtitle: "", description: "Get your business registered and legally recognized." },
  "digital": { title: "Digital Presence & Business Identity", subtitle: "", description: "Your website, domain, and email — set up professionally." },
  "compliance": { title: "Trust, Compliance & Risk Reduction", subtitle: "", description: "The registrations and filings you need to operate legally." },
  "expert": { title: "Visibility & Discoverability Setup", subtitle: "", description: "Get found online with profiles and listings." },
};

const CollapsibleServices = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useDbCategories();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

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

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(prev => prev === categoryId ? null : categoryId);
  };

  // Define bento grid layout - matching reference image
  const gridClasses = [
    "md:col-span-1", // Formation - left column
    "md:col-span-1", // Digital - right column
    "md:col-span-1", // Compliance - wide
    "md:col-span-1", // Expert - right
    "md:col-span-1", // Operations - bottom left
  ];

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

        {/* Clean 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Building2;
            const categoryServices = getServicesByCategory(category.category_id);
            const highlight = categoryHighlights[category.category_id] || { title: category.title, subtitle: "", description: category.intro };
            const isOpen = openCategory === category.category_id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={cn(gridClasses[index % 5])}
              >
                <div
                  className={cn(
                    "rounded-2xl border border-border/30 bg-secondary/40 backdrop-blur-sm transition-all duration-300 overflow-hidden group/bento h-full",
                    isOpen ? "border-primary/40 shadow-glow" : "hover:border-primary/30 hover:shadow-[0_0_40px_-15px_hsl(var(--primary)/0.3)]"
                  )}
                >
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleCategory(category.category_id)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className="flex flex-col">
                      {/* Glow header */}
                      <div className={cn(
                        "w-full flex items-center justify-between p-4 md:p-5 rounded-t-2xl bg-gradient-to-br relative overflow-hidden",
                        category.gradient
                      )}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.25)_0%,transparent_60%)]" />
                        <span className="font-display text-base md:text-xl font-bold text-foreground relative z-10">
                          {highlight.title}
                        </span>
                        <ChevronDown className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform duration-300 relative z-10",
                          isOpen && "rotate-180"
                        )} />
                      </div>
                      
                      {/* Summary content - always visible */}
                      <div className="flex items-center gap-3 p-4">
                        <div className={cn(
                          "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                          isOpen ? "bg-primary/20" : "bg-background/50 group-hover/bento:bg-primary/20"
                        )}>
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "font-display text-sm md:text-base font-semibold transition-colors",
                            isOpen ? "text-primary" : "text-foreground group-hover/bento:text-primary"
                          )}>
                            {category.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <div className="grid grid-cols-1 gap-2">
                            {categoryServices.slice(0, 6).map((service) => (
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
                          {categoryServices.length > 6 && (
                            <p className="text-xs text-muted-foreground mt-3">
                              +{categoryServices.length - 6} more services
                            </p>
                          )}
                          <Link
                            to="/services"
                            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            View all {category.title.toLowerCase()} services
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollapsibleServices;