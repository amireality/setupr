import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceIntro from "@/components/services/ServiceIntro";
import ServiceCategories from "@/components/services/ServiceCategories";
import RecommendedSetups from "@/components/services/RecommendedSetups";
import ServicesCTA from "@/components/services/ServicesCTA";
import { AuroraBackground } from "@/components/ui/aurora-background";

export type ServiceId = 
  | "proprietorship" | "llp" | "pvt-ltd" | "gst" | "msme" | "pan-tan"
  | "website" | "domain-hosting" | "email" | "brand-identity"
  | "social-media" | "google-business" | "trust-assets";

const Services = () => {
  const [selectedServices, setSelectedServices] = useState<Set<ServiceId>>(new Set());

  const toggleService = (serviceId: ServiceId) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const applyRecommendation = (services: ServiceId[]) => {
    setSelectedServices(new Set(services));
  };

  return (
    <AuroraBackground className="min-h-screen">
      <div className="w-full relative z-10">
        <Navbar />
        <main className="pt-16">
          <ServiceIntro />
          <ServiceCategories 
            selectedServices={selectedServices} 
            onToggle={toggleService} 
          />
          <RecommendedSetups 
            selectedServices={selectedServices}
            onApply={applyRecommendation} 
          />
          <ServicesCTA selectedServices={selectedServices} />
        </main>
        <Footer />
      </div>
    </AuroraBackground>
  );
};

export default Services;