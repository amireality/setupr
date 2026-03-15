import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Building2, Shield, Globe, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://setupr.com/" },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://setupr.com/guides" },
    { "@type": "ListItem", "position": 3, "name": "Starting a Business in India", "item": "https://setupr.com/guides/starting-business-india" }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to Starting a Business in India (2025)",
  "author": { "@type": "Person", "name": "Amir Khan" },
  "publisher": { "@type": "Organization", "name": "Setupr" },
  "description": "A step-by-step guide covering business registration, compliance, and digital presence for freelancers, startups, and small businesses in India."
};

const StartingBusinessGuide = () => {
  const steps = [
    {
      icon: FileText,
      title: "1. Choose Your Business Structure",
      content: "Decide between Sole Proprietorship (simplest, for individuals), LLP (limited liability, for partnerships), or Private Limited (for growth and funding). Each has different compliance requirements and tax implications.",
      link: "/blog/freelancer-to-registered-business-guide"
    },
    {
      icon: Building2,
      title: "2. Complete Business Registration",
      content: "Register with the appropriate authority. Sole Proprietorship requires minimal registration, LLP and Private Limited need MCA registration with proper documentation.",
      link: "/services/company-registration"
    },
    {
      icon: Shield,
      title: "3. Get Essential Registrations",
      content: "Apply for GST (if turnover exceeds ₹20L), MSME/Udyam registration (for government benefits), and PAN for the business entity.",
      link: "/services/gst-registration"
    },
    {
      icon: Globe,
      title: "4. Set Up Professional Presence",
      content: "Register a domain, create professional email, and build a simple website. This establishes credibility with clients and partners.",
      link: "/services/domain-email"
    },
    {
      icon: CheckCircle2,
      title: "5. Open Business Banking",
      content: "Open a current account in your business name. Keep personal and business finances separate from day one.",
      link: "/services"
    },
    {
      icon: BookOpen,
      title: "6. Stay Compliant",
      content: "Understand ongoing compliance requirements: GST returns, annual filings, tax returns, and any industry-specific requirements.",
      link: "/blog/compliance-checklist-after-company-registration"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Complete Guide to Starting a Business in India (2025) | Setupr</title>
        <meta name="description" content="Step-by-step guide to starting a business in India. Covers business registration, GST, compliance, and digital presence for freelancers and startups." />
        <link rel="canonical" href="https://setupr.com/guides/starting-business-india" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      
      <AnimatedGridBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4 md:px-6 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/guides" className="hover:text-foreground transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-foreground">Starting a Business</span>
          </nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              <BookOpen className="w-3.5 h-3.5" />
              CORNERSTONE GUIDE
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
              Complete Guide to <span className="gradient-text">Starting a Business</span> in India
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A practical, step-by-step guide for freelancers, consultants, and startup founders who want to start a legitimate business in India.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span>By <Link to="/author/amir-khan" className="text-primary hover:underline">Amir Khan</Link></span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>Updated January 2025</span>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="prose prose-invert max-w-none mb-12"
          >
            <div className="glass-card rounded-xl p-6 md:p-8 border border-border/50">
              <h2 className="text-xl font-semibold text-foreground mt-0 mb-4">Who is this guide for?</h2>
              <p className="text-muted-foreground mb-4">
                This guide is designed for freelancers, consultants, solopreneurs, and early-stage startup founders in India who:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Want to transition from informal to formal business operation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Need to understand which registrations are required vs. optional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Are confused about compliance and want clarity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Want to build professional credibility with clients</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Steps */}
          <div className="space-y-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.content}</p>
                    <Link 
                      to={step.link} 
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="glass-card rounded-xl p-8 text-center border border-primary/20"
          >
            <h2 className="text-2xl font-bold font-display mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Setupr helps freelancers, consultants, and startups in India handle business registration, compliance, and digital presence so you can focus on your work.
            </p>
            <Button asChild size="lg">
              <Link to="/intake">
                Start Your Setup <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Related Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold mb-6">Related Guides & Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/guides/business-types" className="glass-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors group">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Business Types Explained</h4>
                <p className="text-sm text-muted-foreground mt-1">Sole Prop vs LLP vs Pvt Ltd: which is right for you?</p>
              </Link>
              <Link to="/blog/compliance-checklist-after-company-registration" className="glass-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors group">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Compliance Checklist</h4>
                <p className="text-sm text-muted-foreground mt-1">What to do after company registration</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StartingBusinessGuide;
