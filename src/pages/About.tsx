import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Shield, Users, Clock } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Clarity First",
    description: "No jargon, no confusion. We explain everything in plain language so you always know what's happening.",
  },
  {
    icon: Heart,
    title: "Founder-Focused",
    description: "We've been in your shoes. Every decision we make is designed to save you time and stress.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "Fast turnaround without cutting corners. Your business shouldn't wait for paperwork.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Upfront pricing, no hidden fees. What you see is what you pay.",
  },
];

const stats = [
  { value: "500+", label: "Businesses Launched" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "48hrs", label: "Avg. Turnaround" },
  { value: "24/7", label: "Support Available" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGridBackground className="opacity-40" />
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span
                className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About Us
              </motion.span>
              <motion.h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                We help founders{" "}
                <span className="gradient-text">focus on building</span>
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Starting a business in India shouldn't mean drowning in paperwork. 
                We handle the legal and compliance maze so you can do what you're best at—building something amazing.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 md:p-6 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="font-display text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
                    Our Mission
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Making business setup{" "}
                    <span className="gradient-text">actually simple</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We started Setupr because we experienced the frustration firsthand. 
                    Endless government portals, confusing requirements, and expensive consultants 
                    who speak in legalese.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe every entrepreneur deserves a clear, affordable path to getting 
                    their business legally set up—without the headaches.
                  </p>
                </motion.div>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 border border-primary/20 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/30 blur-2xl" />
                    <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      </div>
                      <p className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                        Built by founders
                      </p>
                      <p className="text-sm text-muted-foreground">
                        for founders
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
                  Our Values
                </span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  What we stand for
                </h2>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let's make your business official. No confusion, no hidden fees.
              </p>
              <a
                href="/intake"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-glow"
              >
                Start Your Journey
                <Clock className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
