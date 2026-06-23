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
        <title>{seo?.title || "Company Registration Online in India | Pvt Ltd, LLP, GST, MSME | Setupr"}</title>
        <meta name="description" content={seo?.description || "Register your Private Limited, LLP, OPC or Proprietorship company online in India. GST, MSME, trademark, compliance, website and business email handled end to end. Starts at ₹999."} />
        <link rel="canonical" href="https://setupr.com/" />
        <meta property="og:title" content={seo?.ogTitle || seo?.title || "Company Registration Online in India | Pvt Ltd, LLP, GST | Setupr"} />
        <meta property="og:description" content={seo?.ogDescription || seo?.description || "Register Pvt Ltd, LLP, OPC or Proprietorship online in India. GST, MSME, trademark, compliance and website handled end to end."} />
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
