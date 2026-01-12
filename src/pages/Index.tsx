import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import GoalCards from "@/components/GoalCards";
import ServicePillars from "@/components/ServicePillars";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { ScrollStackContainer } from "@/components/ui/scroll-stack-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ScrollStackContainer>
          <HeroSection />
          <TrustBadges />
          <GoalCards />
          <ServicePillars />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </ScrollStackContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
