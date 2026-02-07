import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStats from "@/components/TrustStats";
import GoalCards from "@/components/GoalCards";
import RecommendedBundles from "@/components/RecommendedBundles";
import CollapsibleServices from "@/components/CollapsibleServices";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { PageEditorWrapper } from "@/components/admin/PageEditor";

const Index = () => {
  const { data: visibilitySettings = [] } = useSiteSettingsByCategory("visibility");

  // Check if a section is visible (default to true if no setting exists)
  const isSectionVisible = (sectionId: string): boolean => {
    const key = `homepage_section_${sectionId}_visible`;
    const setting = visibilitySettings.find((s) => s.key === key);
    return setting ? setting.value !== "false" : true;
  };

  return (
    <PageEditorWrapper>
      <div className="min-h-screen bg-background relative">
        {/* Global Animated Background */}
        <AnimatedGridBackground />
        
        <Navbar />
        <main className="relative z-10">
          {isSectionVisible("hero") && <HeroSection />}
          {isSectionVisible("trust_stats") && <TrustStats />}
          {isSectionVisible("goal_cards") && <GoalCards />}
          {isSectionVisible("bundles") && <RecommendedBundles />}
          {isSectionVisible("services") && <CollapsibleServices />}
          {isSectionVisible("how_it_works") && <HowItWorks />}
          {isSectionVisible("testimonials") && <Testimonials />}
          {isSectionVisible("faq") && <FAQ />}
          {isSectionVisible("final_cta") && <FinalCTA />}
        </main>
        <Footer />
      </div>
    </PageEditorWrapper>
  );
};

export default Index;
