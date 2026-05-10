import { useState } from "react";
import { Building2, Globe, Shield, Users, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDbCategories, useDbServices } from "@/hooks/useServices";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Globe,
  Shield,
  Users,
};

// Unique psychological titles and subtitles for each category
const defaultCategoryHighlights: Record<string, { title: string; description: string }> = {
  "formation": { title: "Company Registration Services", description: "Register your Private Limited, LLP, OPC, or Proprietorship. Includes DSC, DIN, and MCA filing." },
  "digital": { title: "Website & Digital Presence", description: "Professional website, custom domain, business email, and brand assets for credibility." },
  "compliance": { title: "GST, MSME & Compliance", description: "GST registration, MSME/Udyam, professional tax, and ongoing filing support." },
  "expert": { title: "Online Visibility & SEO", description: "Google Business Profile, local SEO, and directory listings to get found by customers." },
};

const CollapsibleServices = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useDbCategories();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const sectionTitle = settings.find(s => s.key === "homepage_collapsible_title")?.value || "Business registration and setup services we offer";
  const sectionSubtitle = settings.find(s => s.key === "homepage_collapsible_subtitle")?.value || "Everything you need to start, run, and grow your business, all in one place.";
  
  const highlightsJson = settings.find(s => s.key === "homepage_category_highlights")?.value;
  const categoryHighlights: Record<string, { title: string; description: string }> = highlightsJson ? (() => { try { return JSON.parse(highlightsJson); } catch { return defaultCategoryHighlights; } })() : defaultCategoryHighlights;

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

  // Split categories into left and right columns
  const leftCategories = categories.filter((_, i) => i % 2 === 0);
  const rightCategories = categories.filter((_, i) => i % 2 === 1);

  const renderCard = (category: typeof categories[0], index: number) => {
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
        layout
      >
        <div
          className={cn(
            "rounded-2xl border border-border/30 bg-secondary/40 backdrop-blur-sm transition-all duration-300 overflow-hidden group/bento",
            isOpen ? "border-primary/40 shadow-glow" : "hover:border-primary/30 hover:shadow-[0_0_40px_-15px_hsl(var(--primary)/0.3)]"
          )}
        >
          {/* Clickable Header */}
          <button
            onClick={() => toggleCategory(category.category_id)}
            className="w-full text-left focus:outline-none"
          >
            <div className="flex flex-col">
              {/* Combined Header */}
              <div className={cn(
                "w-full flex items-center p-4 md:p-5 rounded-t-2xl bg-gradient-to-br relative overflow-hidden",
                category.gradient
              )}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.25)_0%,transparent_60%)]" />
                
                <div className="flex items-center gap-3 relative z-10 w-full">
                  <div className={cn(
                    "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                    isOpen ? "bg-primary/30" : "bg-background/50 group-hover/bento:bg-primary/20"
                  )}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground">
                      {highlight.title}
                    </h3>
                    <p className="text-xs text-foreground/80 line-clamp-2 mt-0.5">
                      {highlight.description}
                    </p>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-foreground/70 transition-transform duration-300 shrink-0 ml-2",
                    isOpen && "rotate-180"
                  )} />
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
  };

  return (
    <section className="py-20 md:py-28 relative bg-secondary/20 border-t border-primary/20">

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Business registration and setup <span className="text-primary">services</span> we offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Two independent columns - cards in each column expand independently */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftCategories.map((category, index) => renderCard(category, index * 2))}
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightCategories.map((category, index) => renderCard(category, index * 2 + 1))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollapsibleServices;