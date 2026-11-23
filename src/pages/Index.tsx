import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import TrustStats from "@/components/TrustStats";
import { InteractiveTechShowcase } from "@/components/visual/InteractiveTechShowcase";
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
import { useSeoSettings } from "@/hooks/useSeoSettings";

const Index = () => {
  const { data: seo } = useSeoSettings("homepage");
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>{seo?.title || "Setupr | Tech Ecosystem, AI Tools, Custom Websites & Business Setup"}</title>
        <meta name="description" content={seo?.description || "Setupr is a technology ecosystem building autonomous AI tools (Blew), custom web engineering, feature integrations, and turnkey business setup for global founders."} />
        <link rel="canonical" href="https://setupr.com/" />
        <meta property="og:title" content={seo?.ogTitle || seo?.title || "Setupr | Tech Ecosystem, AI Tools, Custom Websites & Business Setup"} />
        <meta property="og:description" content={seo?.ogDescription || seo?.description || "Setupr is a technology ecosystem building autonomous AI tools (Blew), custom web engineering, feature integrations, and turnkey business setup for global founders."} />
        <meta property="og:url" content="https://setupr.com/" />
      </Helmet>
      {/* Global background removed for section differentiation */}
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TrustStats />
        <InteractiveTechShowcase />
        <EcosystemSection />
        <GoalCards />
        <RecommendedBundles />
        {/* Store & Loans hidden temporarily as requested */}
        {/* <StorePromo /> */}
        <CollapsibleServices />
        <HowItWorks />
        {/* <LoansSection /> */}
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
