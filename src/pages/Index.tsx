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
import { useSeoSettings } from "@/hooks/useSeoSettings";

const Index = () => {
  const { data: seo } = useSeoSettings("homepage");
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>{seo?.title || "Setupr | Global Business Registration & Setup Services"}</title>
        <meta name="description" content={seo?.description || "Company registration, custom AI setups (Agents, Chatbots & Tools), website engineering, and digital presence. All handled for freelancers and startups."} />
        <link rel="canonical" href="https://setupr.com/" />
        <meta property="og:title" content={seo?.ogTitle || seo?.title || "Setupr | Global Business Registration & Setup Services"} />
        <meta property="og:description" content={seo?.ogDescription || seo?.description || "Company registration, custom AI setups (Agents, Chatbots & Tools), website engineering, and digital presence. All handled for freelancers and startups."} />
        <meta property="og:url" content="https://setupr.com/" />
      </Helmet>
      {/* Global background removed for section differentiation */}
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
