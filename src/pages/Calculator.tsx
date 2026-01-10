import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, ArrowRight, Check, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDbServices, useDbCategories, useDbBundles, formatPrice, DbService } from "@/hooks/useServices";

const Calculator = () => {
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const { data: categories = [], isLoading: categoriesLoading } = useDbCategories();
  const { data: bundles = [], isLoading: bundlesLoading } = useDbBundles();
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  const isLoading = servicesLoading || categoriesLoading || bundlesLoading;

  // Filter public services
  const publicServices = useMemo(() => 
    services.filter(s => s.visibility === "public"),
    [services]
  );

  // Group services by category
  const servicesByCategory = useMemo(() => {
    const grouped: Record<string, DbService[]> = {};
    publicServices.forEach(service => {
      if (!grouped[service.category]) {
        grouped[service.category] = [];
      }
      grouped[service.category].push(service);
    });
    return grouped;
  }, [publicServices]);

  // Calculate totals
  const calculations = useMemo(() => {
    if (selectedBundle) {
      const bundle = bundles.find(b => b.bundle_id === selectedBundle);
      if (bundle) {
        const bundleServices = services.filter(s => 
          bundle.included_service_ids.includes(s.service_id)
        );
        const individualTotal = bundleServices.reduce((sum, s) => sum + s.setupr_fee_inr, 0);
        const savings = individualTotal - bundle.bundle_setupr_fee;
        
        return {
          setuprFee: bundle.bundle_setupr_fee,
          govtFeeNote: bundle.govt_fee_note || "Government fees vary based on services",
          savings,
          serviceCount: bundle.included_service_ids.length,
          isBundle: true,
        };
      }
    }

    const selectedServicesList = services.filter(s => 
      selectedServices.includes(s.service_id)
    );
    const setuprFee = selectedServicesList.reduce((sum, s) => sum + s.setupr_fee_inr, 0);

    return {
      setuprFee,
      govtFeeNote: selectedServicesList.length > 0 
        ? "Government fees will be calculated based on your specific requirements"
        : "",
      savings: 0,
      serviceCount: selectedServices.length,
      isBundle: false,
    };
  }, [selectedServices, selectedBundle, services, bundles]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedBundle(null);
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBundleSelect = (bundleId: string) => {
    setSelectedServices([]);
    setSelectedBundle(prev => prev === bundleId ? null : bundleId);
  };

  const handleSaveEstimate = () => {
    const estimate = {
      selectedServices,
      selectedBundle,
      total: calculations.setuprFee,
      date: new Date().toISOString(),
    };
    localStorage.setItem("setupr_estimate", JSON.stringify(estimate));
  };

  const handleProceed = () => {
    handleSaveEstimate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 flex justify-center items-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-medium tracking-wide text-primary bg-primary/10 rounded-full border border-primary/20">
              <CalcIcon className="w-3.5 h-3.5" />
              COST CALCULATOR
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
              Estimate Your <span className="gradient-text">Setup Costs</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select services or choose a bundle to get an instant cost estimate. No hidden fees.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bundles Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold font-display mb-4 flex items-center gap-2">
                  Popular Bundles
                  <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Save more
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {bundles.map(bundle => (
                    <div
                      key={bundle.bundle_id}
                      onClick={() => handleBundleSelect(bundle.bundle_id)}
                      className={`glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                        selectedBundle === bundle.bundle_id
                          ? "border-primary/50 ring-2 ring-primary/20"
                          : "hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-foreground">{bundle.bundle_name}</h3>
                          <p className="text-sm text-muted-foreground">{bundle.who_its_for}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedBundle === bundle.bundle_id
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/50"
                        }`}>
                          {selectedBundle === bundle.bundle_id && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">
                          ₹{formatPrice(bundle.bundle_setupr_fee)}
                        </span>
                        <span className="text-sm text-muted-foreground">Setupr fee</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Includes {bundle.included_service_ids.length} services
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Individual Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold font-display mb-4">
                  Or Select Individual Services
                </h2>
                <div className="space-y-6">
                  {categories.map(category => {
                    const categoryServices = servicesByCategory[category.category_id] || [];
                    if (categoryServices.length === 0) return null;

                    return (
                      <div key={category.category_id} className="glass-card rounded-xl p-5">
                        <h3 className="font-medium text-foreground mb-4">{category.title}</h3>
                        <div className="space-y-3">
                          {categoryServices.map(service => (
                            <label
                              key={service.service_id}
                              className="flex items-start gap-3 cursor-pointer group"
                            >
                              <Checkbox
                                checked={selectedServices.includes(service.service_id)}
                                onCheckedChange={() => handleServiceToggle(service.service_id)}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {service.service_name}
                                  </span>
                                  <span className="text-sm text-primary font-medium">
                                    ₹{formatPrice(service.setupr_fee_inr)}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {service.description_short}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Price Summary - Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-lg font-semibold font-display mb-6">Your Estimate</h2>

                {calculations.serviceCount === 0 ? (
                  <div className="text-center py-8">
                    <CalcIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Select services or a bundle to see your estimate
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Services selected</span>
                        <span className="font-medium">{calculations.serviceCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Setupr fee</span>
                        <span className="font-medium">₹{formatPrice(calculations.setuprFee)}</span>
                      </div>
                      {calculations.savings > 0 && (
                        <div className="flex items-center justify-between text-green-500">
                          <span>Bundle savings</span>
                          <span className="font-medium">-₹{formatPrice(calculations.savings)}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-border/50 pt-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Total Setupr Fee</span>
                        <span className="text-2xl font-bold text-primary">
                          ₹{formatPrice(calculations.setuprFee)}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>{calculations.govtFeeNote}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button asChild className="w-full" onClick={handleProceed}>
                        <Link to="/services">
                          Proceed to Services
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSaveEstimate}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Save Estimate
                      </Button>
                    </div>
                  </>
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

export default Calculator;
