import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Building2, FileText, Shield, Globe, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const iconMap: Record<string, React.ElementType> = {
  FileText, Building2, Shield, Globe, BookOpen, ArrowRight,
};

const defaultGuides = [
  { icon: "FileText", title: "Complete Guide to Starting a Business in India", description: "A step-by-step guide covering business registration, compliance, and digital presence for freelancers, startups, and small businesses.", link: "/guides/starting-business-india", readTime: "15 min read" },
  { icon: "Building2", title: "Business Types Explained: Sole Prop vs LLP vs Pvt Ltd", description: "Understand the differences between business structures in India to make the right choice for your situation.", link: "/guides/business-types", readTime: "10 min read" },
  { icon: "Shield", title: "Compliance Checklist for New Businesses", description: "What to do after company registration. Ongoing compliance requirements for startups and small businesses.", link: "/blog/compliance-checklist-after-company-registration", readTime: "8 min read" },
  { icon: "Globe", title: "Digital Presence Checklist for Startups", description: "Essential steps to establish online credibility: domain, email, website, and more.", link: "/blog/how-to-build-credibility-as-new-business-india", readTime: "6 min read" },
];

const GuidesIndex = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("guides");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  const pageTitle = getSetting("guides_page_title", "Practical Guides for Early-Stage Founders");
  const pageSubtitle = getSetting("guides_page_subtitle", "Comprehensive, educational resources on business registration, compliance, and digital presence in India—written for freelancers, consultants, and startup founders.");
  const ctaTitle = getSetting("guides_cta_title", "Need hands-on help?");
  const ctaDesc = getSetting("guides_cta_desc", "These guides give you the knowledge. Setupr gives you the execution—handling registration, compliance, and digital setup so you can focus on your work.");

  const guides = (() => {
    try {
      const raw = getSetting("guides_cards", "");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
    return defaultGuides;
  })();

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Business Guides for Startups & Freelancers in India | Setupr</title>
        <meta name="description" content="Practical guides on business registration, compliance, and digital presence for freelancers, startups, and small businesses in India." />
        <link rel="canonical" href="https://setupr.com/guides" />
      </Helmet>
      
      <AnimatedGridBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4 md:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              <BookOpen className="w-3.5 h-3.5" />
              CORNERSTONE GUIDES
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
              {pageTitle.includes("Early-Stage Founders") ? (
                <>Practical Guides for <span className="gradient-text">Early-Stage Founders</span></>
              ) : pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{pageSubtitle}</p>
          </motion.div>

          <div className="space-y-6">
            {guides.map((guide: any, index: number) => {
              const Icon = iconMap[guide.icon] || FileText;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}>
                  <Link to={guide.link} className="group block glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-[0_0_40px_-8px_hsl(24_95%_53%/0.2)]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{guide.title}</h2>
                        <p className="text-muted-foreground mb-3">{guide.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground/60">{guide.readTime}</span>
                          <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read guide <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-16 text-center">
            <div className="glass-card rounded-xl p-8 border border-primary/20">
              <h2 className="text-2xl font-bold font-display mb-4">{ctaTitle}</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{ctaDesc}</p>
              <Link to="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                Explore our services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuidesIndex;
