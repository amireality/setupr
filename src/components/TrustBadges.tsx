import { Shield, CheckCircle, Users, Lock } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Shield,
    label: "MCA Registered",
    description: "Official registration partner",
  },
  {
    icon: CheckCircle,
    label: "100+ Businesses",
    description: "Successfully registered",
  },
  {
    icon: Lock,
    label: "Secure & Encrypted",
    description: "Your data is protected",
  },
  {
    icon: Users,
    label: "Expert Support",
    description: "Dedicated team assistance",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 md:py-12 border-y border-border/30 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <badge.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
