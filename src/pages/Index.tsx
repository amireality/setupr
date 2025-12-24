import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoalCards from "@/components/GoalCards";
import ServicePillars from "@/components/ServicePillars";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <GoalCards />
        <ServicePillars />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
