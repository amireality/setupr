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
    <section className="py-20 md:py-28 relative bg-[#090a0d] border-t border-white/[0.06] overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <SectionHeader
            icon={<Landmark />}
            badge="Financing Simplified"
            title={
              <>
                Setupr <span className="gradient-text">Capital & Credit</span>
              </>
            }
            subtitle="Need capital? We connect your business with institutional credit. Setupr has established partnerships with leading financial institutions to match your balance sheet with low-friction growth financing."
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
                className="group rounded-2xl p-6 bg-[#0c0d12]/70 hover:bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary mb-4 group-hover:border-primary/30 group-hover:bg-primary/[0.08] transition-colors duration-300">
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
              <Link to="/apply-loan">Explore Capital Options</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoansSection;
