import { Landmark, ShieldCheck, FileStack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/section-header";

const features = [
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Comprehensive Options",
    description:
      "Easily apply for business loans, personal loans, home loans, and car loans in one place.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Maximum Approval Chances",
    description:
      "We match your specific financial profile with the perfect institution from our extensive network.",
  },
  {
    icon: <FileStack className="w-6 h-6" />,
    title: "Effortless Processing",
    description:
      "We handle the tedious bank interactions and documentation so you do not have to stress about it.",
  },
];

const LoansSection = () => {
  return (
    <section className="py-20 md:py-28 relative bg-secondary/20 border-t border-primary/20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[180px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <SectionHeader
            icon={<Landmark />}
            badge="Financing Simplified"
            title={
              <>
                Setupr <span className="text-primary">Loans</span>
              </>
            }
            subtitle="Need a loan? We make it easy to get funded. Setupr has established partnerships with almost every major bank and NBFC in India. We connect you with the right lender to get the capital you need for your business or personal goals."
            alignment="center"
          />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl p-6 bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-center"
          >
            <Button asChild size="lg" variant="hero">
              <Link to="/apply-loan">Apply Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoansSection;
