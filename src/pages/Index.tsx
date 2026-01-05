import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoalCards from "@/components/GoalCards";
import ServicePillars from "@/components/ServicePillars";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import gridGlowBg from "@/assets/grid-glow-bg.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Single unified background for entire page */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${gridGlowBg})` }}
      />
      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <GoalCards />
          <ServicePillars />
          <HowItWorks />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;