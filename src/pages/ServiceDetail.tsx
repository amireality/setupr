import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Clock, Users, Shield, ChevronRight, Star, Award, Building2, Globe, Zap, MessageCircle, FileText, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useDbServices, useDbCategories, formatPrice } from "@/hooks/useServices";
import { cn } from "@/lib/utils";
import ServiceComparison from "@/components/ServiceComparison";
import ServiceFAQ from "@/components/ServiceFAQ";
import ProcessTimeline from "@/components/ProcessTimeline";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useServiceDeliverables } from "@/hooks/useServiceDeliverables";

const ServiceDeliverablesList = ({ serviceId }: { serviceId: string }) => {
  const { data: dbDeliverables = [] } = useServiceDeliverables(serviceId);
  
  const defaultItems = [
    "Complete documentation preparation, review, and filing",
    "Expert guidance from professionals who understand Indian regulations",
    "Government fee coordination. We tell you exactly what to pay and when",
    "Regular status updates via WhatsApp and email until completion"
  ];

  const items = dbDeliverables.length > 0 
    ? dbDeliverables.map(d => d.label) 
    : defaultItems;

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 group">
          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const { data: categories = [] } = useDbCategories();
  const { data: allSettings = [] } = useSiteSettings();
  const [expanded, setExpanded] = useState(false);

  // Helper to get service-specific setting with fallback
  const getServiceSetting = (field: string, fallback: string) => {
    const key = `service_${serviceId}_${field}`;
    return allSettings.find((s) => s.key === key)?.value || fallback;
  };

  const service = services.find(s => s.service_id === serviceId);
  const category = categories.find(c => c.category_id === service?.category);
  
  // Get related services from same category (excluding current)
  const relatedServices = services
    .filter(s => s.category === service?.category && s.service_id !== serviceId && s.visibility === 'public')
    .slice(0, 4);

  // Get complementary services from other categories
  const complementaryServices = services
    .filter(s => s.category !== service?.category && s.visibility === 'public')
    .slice(0, 3);

  if (servicesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 max-w-6xl text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProceed = () => {
    // Navigate to intake with this service pre-selected
    navigate(`/intake?service=${service.service_id}`);
  };

  // Determine FAQ category based on service category
  const faqCategory = service.category?.includes('registration') ? 'registration' 
    : service.category?.includes('compliance') ? 'compliance' 
    : 'default';

  // Generate schemas
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://setupr.com/services/${service.service_id}`,
    "name": service.service_name,
    "description": service.description_short,
    "provider": {
      "@type": "Organization",
      "name": "Setupr",
      "url": "https://setupr.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": service.who_its_for
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": service.setupr_fee_inr.toString(),
      "description": "Starting from. Final price confirmed after discovery call."
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://setupr.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://setupr.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.service_name,
        "item": `https://setupr.com/services/${service.service_id}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{service.service_name} | Setupr India</title>
        <meta name="description" content={`${service.description_short} For ${service.who_its_for}. Get a custom quote for ${service.service_name}.`} />
        <link rel="canonical" href={`https://setupr.com/services/${service.service_id}`} />
        <meta property="og:title" content={`${service.service_name} | Setupr India`} />
        <meta property="og:description" content={service.description_short} />
        <meta property="og:url" content={`https://setupr.com/services/${service.service_id}`} />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <Navbar />
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-background pt-16 pb-12 mb-8 border-b border-primary/20">
          <AnimatedGridBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="container px-4 md:px-6 max-w-6xl relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
            {/* Category Icon */}
            {(() => {
              const Icon = service.category === 'formation' ? Building2 :
                           service.category === 'digital' ? Globe :
                           service.category === 'compliance' ? Shield :
                           service.category === 'visibility' ? Users : Zap;
              return (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/10 flex flex-shrink-0 items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.3)] border border-primary/20">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </div>
              );
            })()}

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                {category && (
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                    {category.title}
                  </span>
                )}
                <span className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full border",
                  service.delivery_type === 'done-for-you' 
                    ? "bg-green-500/10 text-green-500 border-green-500/20" 
                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                )}>
                  {service.delivery_type === 'done-for-you' ? 'Done for You' : 'Coordination'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{service.service_name}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{service.description_short}</p>
            </div>
          </div>
        </section>

        {/* Hidden SEO Image */}
        <img src={`/images/services/${service.service_id}.png`} alt={`${service.service_name} in India - Setupr`} className="sr-only" />

        <div className="container px-4 md:px-6 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            {category && (
              <>
                <span className="hover:text-foreground transition-colors">{category.title}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-foreground">{service.service_name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Who Is This Service For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">Who is this service for?</h2>
                </div>
                <p className="text-muted-foreground mb-4">{service.who_its_for}</p>
                <div className="text-sm text-muted-foreground/80 border-t border-border/30 pt-4 mt-4">
                  <p><strong>Common scenarios:</strong> {getServiceSetting("who_its_for_scenarios", "Freelancers going legit, consultants building credibility, startups needing compliance, small businesses scaling operations.")}</p>
                </div>
              </motion.div>

              {/* What Does Setupr Provide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">What does Setupr provide?</h2>
                </div>
                <ServiceDeliverablesList serviceId={serviceId || ""} />
                <div className="text-sm text-muted-foreground/80 border-t border-border/30 pt-4 mt-4">
                  <p><strong>The outcome:</strong> {getServiceSetting("outcome_text", "A fully compliant, registered service with all necessary documentation, ready to operate legally and build credibility.")}</p>
                </div>
              </motion.div>

              {/* Rich Content (About This Service) */}
              {(() => {
                const richContent = getServiceSetting("rich_content", "");
                if (!richContent) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-2xl p-6 md:p-8 border border-border/50"
                  >
                    <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      About This Service
                    </h2>
                    
                    <div className="relative">
                      <AnimatePresence initial={false}>
                        <motion.div
                          key="content"
                          initial={false}
                          animate={{ height: expanded ? "auto" : "12rem" }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div 
                            className="prose-wrapper [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:text-foreground [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:first:mt-0 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4"
                            dangerouslySetInnerHTML={{ __html: richContent }} 
                          />
                        </motion.div>
                      </AnimatePresence>

                      {!expanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      onClick={() => setExpanded(!expanded)}
                      className="mt-4 text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-medium"
                    >
                      {expanded ? "Show less" : "Read more"}
                      <motion.div
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1 inline-block"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                );
              })()}

              {/* Process Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ProcessTimeline serviceId={serviceId} />
              </motion.div>

              {/* Comparison Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ServiceComparison serviceId={serviceId} />
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ServiceFAQ serviceName={service.service_name} serviceId={service.service_id} category={faqCategory} />
              </motion.div>

              {/* Related Articles Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-semibold">Related Articles</h2>
                  <Link to="/blog" className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group">
                    View all 
                    <motion.span whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>→</motion.span>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link to="/blog" className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:translate-y-[-2px]">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      Complete Guide to {service.service_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Everything you need to know before getting started</p>
                  </Link>
                  <Link to="/blog" className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:translate-y-[-2px]">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      Common Mistakes to Avoid
                    </h3>
                    <p className="text-sm text-muted-foreground">Tips from our experts to ensure a smooth process</p>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Pricing Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="sticky top-24 space-y-6"
              >
                {/* Pricing Card */}
                <div className="glass-card rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
                  
                  <div className="relative">
                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-4 mb-4 pb-4 border-b border-border/50">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span>4.9/5 rating</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Award className="w-3.5 h-3.5 text-primary" />
                        <span>1,200+ completed</span>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-4xl font-display font-bold text-foreground">
                        From ₹{formatPrice(service.setupr_fee_inr)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">Exact pricing depends on your requirements. We'll confirm everything before you pay a rupee.</p>
                      {service.govt_or_third_party_fee && service.govt_or_third_party_fee !== '-' && (
                        <p className="text-sm text-muted-foreground mt-2">
                          + {service.govt_or_third_party_fee} (Govt Fee)
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm group">
                        <Clock className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground">Typical processing: {getServiceSetting("processing_time", "7-15 days")}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm group">
                        <Shield className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground">100% compliance guaranteed</span>
                      </div>
                    </div>

                    <Button onClick={handleProceed} className="w-full group relative overflow-hidden shadow-[0_0_15px_hsl(var(--primary)/0.4)] animate-[pulse_3s_ease-in-out_infinite] hover:animate-none" size="lg">
                      Proceed with this service
                      <motion.span
                        className="inline-block ml-1"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </Button>

                    <Button variant="outline" className="w-full mt-3 border-border hover:bg-secondary/50" asChild>
                      <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                        Chat on WhatsApp
                      </a>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Add more services or bundles in the next step
                    </p>

                    {/* Money-back guarantee badge */}
                    <div className="mt-4 pt-4 border-t border-border/50 text-center">
                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-green-500" />
                        <span>Satisfaction guaranteed or money back</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-display font-semibold mb-4">Related Services</h3>
                    <div className="space-y-3">
                      {relatedServices.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.service_id}`}
                          className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 group hover:translate-x-1"
                        >
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {s.service_name}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Complementary Services */}
                {complementaryServices.length > 0 && (
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-display font-semibold mb-4">You Might Also Need</h3>
                    <div className="space-y-3">
                      {complementaryServices.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.service_id}`}
                          className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 group hover:translate-x-1"
                        >
                          <div>
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors block">
                              {s.service_name}
                            </span>
                            <span className="text-xs text-muted-foreground">From ₹{formatPrice(s.setupr_fee_inr)}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
