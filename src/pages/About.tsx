import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Shield, Users, Clock, MapPin, Building } from "lucide-react";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const defaultValues = [
  { icon: Target, title: "Clarity First", description: "No jargon, no confusion. We explain everything in plain language so you always know what's happening." },
  { icon: Heart, title: "Founder-Focused", description: "We've been in your shoes. Every decision we make is designed to save you time and stress." },
  { icon: Zap, title: "Speed Matters", description: "Fast turnaround without cutting corners. Your business shouldn't wait for paperwork." },
  { icon: Shield, title: "Trust & Transparency", description: "Upfront pricing, no hidden fees. What you see is what you pay." },
];

const defaultStats = [
  { value: "500+", label: "Businesses Launched" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "48hrs", label: "Avg. Turnaround" },
  { value: "24/7", label: "Support Available" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://setupr.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://setupr.com/about"
    }
  ]
};

const About = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("about");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  // Build stats from database or use defaults
  const stats = defaultStats.map((defaultStat, index) => {
    const statNum = index + 1;
    return {
      value: getSetting(`about_stat_${statNum}_value`, defaultStat.value),
      label: getSetting(`about_stat_${statNum}_label`, defaultStat.label),
    };
  });

  const heroTitle = getSetting("about_hero_title", "We help freelancers and startups become legitimate businesses");
  const heroSubtitle = getSetting("about_hero_subtitle", "Setupr is a business setup platform that helps professionals in India register their companies, get GST and MSME, build digital presence, and stay compliant — without expensive CAs or multiple vendors.");
  const missionTitle = getSetting("about_mission_title", "Built for freelancers, consultants & startups");
  const missionContent = getSetting("about_mission_content", "Setupr exists because talented professionals shouldn't struggle with bureaucracy. We help people who ask: \"Should I register a company?\", \"Do I need GST?\", \"How do I look credible to clients?\"");
  const founderName = getSetting("about_founder_name", "Amir Khan");
  const founderTitle = getSetting("about_founder_title", "Founder, Setupr");
  const founderBio = getSetting("about_founder_bio", "Amir Khan is the founder of Setupr, a platform focused on simplifying business setup, compliance, and digital presence for freelancers, startups, and small teams in India. He works on building systems and resources to help early founders start with clarity.");
  const founderInitials = founderName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>About Setupr | Business Setup Platform for India</title>
        <meta name="description" content="Setupr is a business setup platform founded by Amir Khan. We help freelancers, startups, and small businesses in India with company registration, GST, MSME, compliance, and digital presence." />
        <link rel="canonical" href="https://setupr.com/about" />
        <meta property="og:title" content="About Setupr | Business Setup Platform for India" />
        <meta property="og:description" content="Setupr is a business setup platform founded by Amir Khan. We help freelancers, startups, and small businesses in India with company registration, compliance, and digital presence." />
        <meta property="og:url" content="https://setupr.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
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
                About Setupr
              </motion.span>
              <motion.h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {heroTitle.includes("become") ? (
                  <>
                    {heroTitle.split("become")[0]}
                    <span className="gradient-text">become{heroTitle.split("become")[1]}</span>
                  </>
                ) : (
                  heroTitle
                )}
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {heroSubtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Entity Definition Block - For AI/SEO */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto glass-card rounded-2xl p-6 border border-primary/20"
            >
              <div className="grid sm:grid-cols-3 gap-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                  <Building className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Platform</p>
                    <p className="text-sm font-medium text-foreground">Setupr</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Founder</p>
                    <Link to="/team/amir-khan" className="text-sm font-medium text-primary hover:underline">
                      {founderName}
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-foreground">India</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
                    Who We Help
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {missionTitle.includes("freelancers") ? (
                      <>
                        Built for <span className="gradient-text">freelancers, consultants & startups</span>
                      </>
                    ) : (
                      missionTitle
                    )}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {missionContent}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <strong>What we provide:</strong> Company registration (Private Limited, LLP, OPC, Proprietorship), 
                    GST registration, MSME/Udyam registration, professional website, business email, domain setup, 
                    Google Business Profile, and ongoing compliance support.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>The outcome:</strong> A fully registered, compliant business with professional digital presence — 
                    ready to invoice clients, open a current account, and build credibility.
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

        {/* Founder Section */}
        <section className="py-16 md:py-24 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
                  Meet the Founder
                </span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  The person behind Setupr
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-display font-bold text-primary">{founderInitials}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-display font-bold mb-1">
                      <span className="text-primary">{founderName}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{founderTitle}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {founderBio}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>Mission:</strong> Simplify the early founder journey so that talented people 
                      can focus on their craft, not paperwork.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                      <Link 
                        to="/team/amir-khan" 
                        className="text-sm text-primary hover:underline"
                      >
                        Read articles by {founderName} →
                      </Link>
                      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                        <Link to="/team">Meet Our Team</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
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
                {defaultValues.map((defaultVal, index) => {
                  const num = index + 1;
                  const title = getSetting(`about_value_${num}_title`, defaultVal.title);
                  const description = getSetting(`about_value_${num}_desc`, defaultVal.description);
                  return (
                    <motion.div
                      key={title}
                      className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <defaultVal.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What is Setupr - Definition Block */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
                  What is Setupr?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Setupr is a business registration and setup platform based in India. We help freelancers, 
                  consultants, startups, and small businesses with:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Company Registration:</strong> Private Limited, LLP, OPC, Proprietorship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Tax & Compliance:</strong> GST registration, MSME/Udyam, Professional Tax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Digital Presence:</strong> Professional website, business email, domain, Google Business Profile</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Our mission:</strong> Simplify the early founder journey. We handle the paperwork 
                  so you can focus on building your business.
                </p>
              </motion.div>
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
