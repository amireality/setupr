import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceIntro from "@/components/services/ServiceIntro";
import ServiceCategories from "@/components/services/ServiceCategories";
import RecommendedSetups from "@/components/services/RecommendedSetups";
import ServicesCTA from "@/components/services/ServicesCTA";
import ServiceSearch from "@/components/services/ServiceSearch";
import CompareBar from "@/components/services/CompareBar";
import CompareModal from "@/components/services/CompareModal";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useDbServices, useDbCategories, useDbBundles } from "@/hooks/useServices";
import type { ServiceId } from "@/data/services";

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
    }
  ]
};

const Services = () => {
  const [selectedServices, setSelectedServices] = useState<Set<ServiceId>>(new Set());
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: services = [], isLoading: loadingServices } = useDbServices();
  const { data: categories = [], isLoading: loadingCategories } = useDbCategories();
  const { data: bundles = [] } = useDbBundles();

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = searchQuery === "" || 
        service.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description_short.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory && service.visibility === "public";
    });
  }, [services, searchQuery, selectedCategory]);

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

  const toggleCompare = (serviceId: string) => {
    setCompareList(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, serviceId];
    });
  };

  const applyRecommendation = (serviceIds: ServiceId[]) => {
    setSelectedServices(new Set(serviceIds));
  };

  if (loadingServices || loadingCategories) {
    return (
      <AuroraBackground className="min-h-screen">
        <div className="w-full relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-muted-foreground">Loading services...</div>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground className="min-h-screen">
      <Helmet>
        <title>Business Registration Services in India | Setupr</title>
        <meta name="description" content="Company registration, GST, MSME, compliance, website, and digital presence services for freelancers, consultants, and startups in India. Transparent pricing, no hidden fees." />
        <link rel="canonical" href="https://setupr.com/services" />
        <meta property="og:title" content="Business Registration Services in India | Setupr" />
        <meta property="og:description" content="Company registration, GST, MSME, compliance, website, and digital presence services for freelancers, consultants, and startups in India." />
        <meta property="og:url" content="https://setupr.com/services" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="w-full relative z-10">
        <Navbar />
        <main className="pt-16">
          <ServiceIntro />
          
          {/* Search and Filter */}
          <section className="py-8">
            <div className="container px-4 md:px-6">
              <ServiceSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
              />
            </div>
          </section>

          <ServiceCategories 
            selectedServices={selectedServices} 
            onToggle={toggleService}
            compareList={compareList}
            onToggleCompare={toggleCompare}
            services={filteredServices}
            categories={categories}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
          <RecommendedSetups 
            selectedServices={selectedServices}
            onApply={applyRecommendation}
            bundles={bundles}
            services={services}
          />
          <ServicesCTA selectedServices={selectedServices} services={services} />
        </main>
        <Footer />

        {/* Compare Bar */}
        <CompareBar
          compareList={compareList}
          services={services}
          onRemove={(id) => setCompareList(prev => prev.filter(s => s !== id))}
          onClear={() => setCompareList([])}
          onCompare={() => setShowCompareModal(true)}
        />

        {/* Compare Modal */}
        <CompareModal
          isOpen={showCompareModal}
          onClose={() => setShowCompareModal(false)}
          compareList={compareList}
          services={services}
          categories={categories}
        />
      </div>
    </AuroraBackground>
  );
};

export default Services;
