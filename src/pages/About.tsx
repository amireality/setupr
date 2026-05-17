import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Shield, Users, Clock, MapPin, Building, ArrowRight } from "lucide-react";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "@/components/ui/section-header";
import { LinkedInBadge } from "@/components/LinkedInBadge";

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
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://setupr.com/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://setupr.com/about" }
  ]
};

const About = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("about");
  const getSetting = (key: string, fallback: string) => settings.find((s) => s.key === key)?.value || fallback;

  const stats = defaultStats.map((defaultStat, index) => {
    const statNum = index + 1;
    return {
      value: getSetting(`about_stat_${statNum}_value`, defaultStat.value),
      label: getSetting(`about_stat_${statNum}_label`, defaultStat.label),
    };
  });

  const heroTitle = getSetting("about_hero_title", "We help freelancers and startups become legitimate businesses");
  const heroSubtitle = getSetting("about_hero_subtitle", "Setupr is a business setup platform that helps professionals in India register their companies, get GST and MSME, build digital presence, integrate custom AI setups (Agents, Chatbots & Tools), and stay compliant without expensive CAs or multiple vendors.");
  const missionTitle = getSetting("about_mission_title", "Built for freelancers, consultants & startups");
  const missionContent = getSetting("about_mission_content", "Setupr exists because talented professionals shouldn't struggle with bureaucracy. We help people who ask: \"Should I register a company?\", \"Do I need GST?\", \"How do I look credible to clients?\"");
  const founderName = getSetting("about_founder_name", "Amir Khan");
  const founderTitle = getSetting("about_founder_title", "Founder, Setupr");
  const founderBio = getSetting("about_founder_bio", "Amir Khan is the founder of Setupr, a platform focused on simplifying business setup, compliance, and digital presence for freelancers, startups, and small teams in India. He works on building systems and resources to help early founders start with clarity.");
  const founderInitials = founderName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Helmet>
        <title>About Setupr | Business Setup Platform for India</title>
        <meta name="description" content="Setupr is a business setup platform founded by Amir Khan. We help freelancers, startups, and small businesses in India with company registration, GST, MSME, compliance, and digital presence." />
        <link rel="canonical" href="https://setupr.com/about" />
        <meta property="og:title" content="About Setupr | Business Setup Platform for India" />
        <meta property="og:description" content="Setupr is a business setup platform founded by Amir Khan. We help freelancers, startups, and small businesses in India with company registration, compliance, and digital presence." />
        <meta property="og:url" content="https://setupr.com/about" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                ${JSON.stringify(breadcrumbSchema)},
                {
                  "@type": "WebPage",
                  "@id": "https://setupr.com/about/#webpage",
                  "url": "https://setupr.com/about",
                  "name": "About Setupr | Business Setup Platform for India",
                  "description": "Setupr is a business setup platform founded by Amir Khan. We help freelancers, startups, and small businesses in India with company registration, GST, MSME, compliance, and digital presence.",
                  "isPartOf": { "@id": "https://setupr.com/#website" }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-primary/5 blur-[150px] pointer-events-none rounded-full transform -translate-y-1/2 z-0" />
      <AnimatedGridBackground className="opacity-40" />
      <Navbar />
      
      <main className="relative z-10">
        {/* Pro Max Hero Section */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium tracking-wide uppercase mb-8 shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                About Setupr
              </motion.div>
              
              <motion.h1 
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                {heroTitle.includes("become") ? (
                  <>
                    {heroTitle.split("become")[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 relative inline-block">
                      become
                      <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-full -z-10" />
                    </span>
                    {heroTitle.split("become")[1]}
                  </>
                ) : (
                  heroTitle
                )}
              </motion.h1>
              
              <motion.p 
                className="text-muted-foreground text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                {heroSubtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Premium Bento Grid: Entity & Stats */}
        <section className="pb-24">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
            >
              {/* Primary Entity Box */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="md:col-span-7 lg:col-span-8 glass-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden group border border-primary/10 hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">The Setupr Entity</h3>
                    <p className="text-muted-foreground text-lg max-w-md">
                      A centralized platform designed to handle all bureaucratic, compliance, and foundational needs for the modern Indian founder.
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-border/50">
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Platform</p>
                      <p className="text-base font-medium text-foreground">Setupr</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Founder</p>
                      <Link to="/team/amir-khan" className="text-base font-medium text-primary hover:underline underline-offset-4">
                        {founderName}
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Location</p>
                      <p className="text-base font-medium text-foreground">India</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="md:col-span-5 lg:col-span-4 grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="glass-card rounded-[2rem] p-6 flex flex-col justify-center text-center group border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="absolute -inset-2 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="font-display text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 mb-2 relative z-10">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium relative z-10">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section - Pro Max Overlap Layout */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-secondary/20 skew-y-[-2deg] origin-left -z-10" />
          <div className="container px-4 md:px-6">
            <SectionHeader 
              icon={<Target />}
              badge="Who We Help"
              title={
                missionTitle.includes("freelancers") ? (
                  <>Built for <span className="text-primary">freelancers, consultants & startups</span></>
                ) : missionTitle
              }
              subtitle="We handle the complexity of compliance so you can focus on building your vision."
              alignment="center"
              className="max-w-4xl mx-auto"
            />
            
            <div className="max-w-5xl mx-auto mt-12">
              <div className="grid md:grid-cols-12 gap-8 md:gap-0 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-7 glass-card rounded-[2rem] p-8 md:p-12 z-10 relative border-r-0 md:rounded-r-none border border-primary/20 bg-background/80 backdrop-blur-xl"
                >
                  <p className="text-foreground/90 text-lg leading-relaxed mb-6 font-medium">
                    {missionContent}
                  </p>
                  <div className="space-y-6 text-muted-foreground">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <p>
                        <strong className="text-foreground font-semibold block mb-1">What we provide:</strong>
                        Company registration (Private Limited, LLP, OPC, Proprietorship), GST registration, MSME/Udyam registration, custom AI setups (Agents, Chatbots & Tools), professional website, business email, domain setup, Google Business Profile, and ongoing compliance support.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <p>
                        <strong className="text-foreground font-semibold block mb-1">The outcome:</strong>
                        A fully registered, compliant business with professional digital presence, ready to invoice clients, open a current account, and build credibility.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="md:col-span-5 relative z-0 md:-ml-8"
                >
                  <div className="aspect-square md:aspect-[4/5] rounded-[2rem] md:rounded-l-none bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/30 p-8 border border-primary/10 overflow-hidden flex flex-col justify-center items-center text-center relative">
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
                    
                    <div className="relative z-10 glass-card rounded-2xl p-6 border border-white/5 shadow-2xl backdrop-blur-md max-w-xs w-full">
                      <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mb-6 mx-auto shadow-inner">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-display text-2xl font-bold text-foreground mb-2">
                        Built by founders
                      </p>
                      <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">
                        for founders
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section - Editorial Layout with LinkedIn Badge */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
          <div className="container px-4 md:px-6">
            <SectionHeader 
              icon={<Users />}
              badge="Leadership"
              title="The person behind Setupr"
              subtitle="Meet the founder dedicated to simplifying business setup."
              alignment="center"
              className="max-w-4xl mx-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-5xl mx-auto mt-16"
            >
              {/* Editorial Card */}
              <div className="relative glass-card rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-primary/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                {/* Floating Abstract Element */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                  {/* Left: Founder Info & Avatar */}
                  <div className="lg:col-span-7 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                    <div className="relative flex-shrink-0">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl border border-white/10 overflow-hidden">
                        <span className="text-5xl md:text-6xl font-display font-bold text-foreground drop-shadow-md">
                          {founderInitials}
                        </span>
                      </div>
                      {/* Decorative Badge */}
                      <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <Shield className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">
                        {founderName}
                      </h3>
                      <p className="text-primary font-medium tracking-wide uppercase text-sm mb-6 flex items-center justify-center md:justify-start gap-2">
                        <span className="w-8 h-[2px] bg-primary rounded-full" />
                        {founderTitle}
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {founderBio}
                      </p>
                      
                      <div className="bg-secondary/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm mb-8">
                        <p className="text-foreground italic font-medium leading-relaxed relative">
                          <span className="text-primary text-4xl absolute -top-4 -left-2 opacity-50">"</span>
                          Our mission is to simplify the early founder journey so that talented people can focus on their craft, not paperwork.
                          <span className="text-primary text-4xl absolute -bottom-6 -right-2 opacity-50 rotate-180">"</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <Button asChild size="lg" className="rounded-full shadow-glow font-semibold">
                          <Link to="/team/amir-khan">Read Articles</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="rounded-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-secondary">
                          <Link to="/team">Meet Our Team</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right: LinkedIn Profile Badge Widget */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[320px] rounded-2xl p-1 bg-gradient-to-b from-primary/30 via-primary/5 to-transparent">
                      <div className="bg-background rounded-xl p-4 overflow-hidden min-h-[350px] shadow-2xl flex items-center justify-center">
                        <LinkedInBadge 
                          vanity="amireality" 
                          name={founderName} 
                          url="https://in.linkedin.com/in/amireality?trk=profile-badge" 
                          size="large"
                          theme="dark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pro Max Values Section */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6">
            <SectionHeader 
              icon={<Heart />}
              badge="Our Values"
              title="What we stand for"
              subtitle="The core principles that drive every decision we make."
              alignment="center"
              className="max-w-4xl mx-auto mb-16"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {defaultValues.map((defaultVal, index) => {
                const num = index + 1;
                const title = getSetting(`about_value_${num}_title`, defaultVal.title);
                const description = getSetting(`about_value_${num}_desc`, defaultVal.description);
                return (
                  <motion.div
                    key={title}
                    className="glass-card rounded-3xl p-8 border border-border/20 hover:border-primary/40 hover:bg-secondary/40 transition-all duration-300 group hover:-translate-y-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-inner">
                      <defaultVal.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pro Max CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
          
          <div className="container px-4 md:px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center glass-card rounded-[3rem] p-12 md:p-16 border border-primary/20 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to make it official?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join hundreds of founders who started their journey with clarity. No confusion, no hidden fees.
              </p>
              
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold shadow-glow group">
                <a href="/intake">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
