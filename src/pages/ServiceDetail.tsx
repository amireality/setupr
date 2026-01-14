import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, Users, Shield, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useDbServices, useDbCategories, formatPrice } from "@/hooks/useServices";
import { cn } from "@/lib/utils";

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const { data: categories = [] } = useDbCategories();

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
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
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {category && (
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {category.title}
                    </span>
                  )}
                  <span className={cn(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    service.delivery_type === 'done-for-you' 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-blue-500/10 text-blue-500"
                  )}>
                    {service.delivery_type === 'done-for-you' ? 'Done for You' : 'Coordination'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{service.service_name}</h1>
                <p className="text-lg text-muted-foreground">{service.description_short}</p>
              </motion.div>

              {/* Who It's For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">Who It's For</h2>
                </div>
                <p className="text-muted-foreground">{service.who_its_for}</p>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">What's Included</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Complete documentation preparation and review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Expert guidance throughout the process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Government fee coordination and tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Status updates and timeline management</span>
                  </li>
                </ul>
              </motion.div>

              {/* Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">How It Works</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Submit Your Details", desc: "Fill out a simple form with your business information" },
                    { step: 2, title: "Document Review", desc: "Our experts review and prepare all necessary documents" },
                    { step: 3, title: "Processing", desc: "We handle the filing and coordination with authorities" },
                    { step: 4, title: "Completion", desc: "Receive your certificates and final documents" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Related Articles Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-semibold">Related Articles</h2>
                  <Link to="/blog" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    View all →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link to="/blog" className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      Complete Guide to {service.service_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Everything you need to know before getting started</p>
                  </Link>
                  <Link to="/blog" className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
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
                <div className="glass-card rounded-2xl p-6 border border-primary/20">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Setupr Fee</p>
                    <p className="text-4xl font-display font-bold text-foreground">
                      ₹{formatPrice(service.setupr_fee_inr)}
                    </p>
                    {service.govt_or_third_party_fee && service.govt_or_third_party_fee !== '-' && (
                      <p className="text-sm text-muted-foreground mt-2">
                        + {service.govt_or_third_party_fee} (Govt Fee)
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Typical processing: 7-15 days</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">100% compliance guaranteed</span>
                    </div>
                  </div>

                  <Button onClick={handleProceed} className="w-full" size="lg">
                    Proceed with this service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Add more services or bundles in the next step
                  </p>
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
                          className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
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
                          className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                        >
                          <div>
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors block">
                              {s.service_name}
                            </span>
                            <span className="text-xs text-muted-foreground">₹{formatPrice(s.setupr_fee_inr)}</span>
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
