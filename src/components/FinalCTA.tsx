import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const FinalCTA = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const ctaTitle = getSetting("homepage_final_cta_title", "Ready to make your business official?");
  const ctaSubtitle = getSetting("homepage_final_cta_subtitle", "From freelancer to registered business in India. Company registration, GST, website, and compliance — we handle it all.");
  const ctaButtonText = getSetting("homepage_cta_primary", "Start with your journey");

  return (
    <section className="relative overflow-hidden">
      <LampContainer>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center"
        >
          {ctaTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto text-center"
        >
          {ctaSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Button variant="hero" size="xl" asChild className="shadow-glow">
            <Link to="/intake">
              {ctaButtonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </LampContainer>
    </section>
  );
};

export default FinalCTA;
