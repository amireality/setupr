import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

const FinalCTA = () => {
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
          Ready to make it official?
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
          Forget your worries, and let us build the strategy that will shape the rise of your business.
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
            <Link to="/services">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </LampContainer>
    </section>
  );
};

export default FinalCTA;
