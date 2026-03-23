import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStats from "@/components/TrustStats";
import GoalCards from "@/components/GoalCards";
import RecommendedBundles from "@/components/RecommendedBundles";
import StorePromo from "@/components/StorePromo";
import CollapsibleServices from "@/components/CollapsibleServices";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import LoansSection from "@/components/LoansSection";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useSeoSettings } from "@/hooks/useSeoSettings";

const Index = () => {
  const { data: seo } = useSeoSettings("homepage");
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>{seo?.title || "Setupr | Business Registration & Setup Services in India"}</title>
        <meta name="description" content={seo?.description || "Company registration, GST, MSME, website, and compliance. All handled for freelancers, consultants, and startups in India."} />
        <link rel="canonical" href="https://setupr.com/" />
        <meta property="og:title" content={seo?.ogTitle || seo?.title || "Setupr | Business Registration & Setup Services in India"} />
        <meta property="og:description" content={seo?.ogDescription || seo?.description || "Company registration, GST, MSME, website, and compliance. All handled for freelancers, consultants, and startups in India."} />
        <meta property="og:url" content="https://setupr.com/" />
      </Helmet>
      {/* Global Animated Background */}
      <AnimatedGridBackground />
      
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TrustStats />
        <GoalCards />
        <RecommendedBundles />
        <StorePromo />
        <CollapsibleServices />
        <HowItWorks />
        <LoansSection />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
