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

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
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
        <Testimonials />
        <LoansSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
