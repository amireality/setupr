import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User, Users, Building, CheckCircle2, XCircle, BookOpen } from "lucide-react";
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
    { "@type": "ListItem", "position": 3, "name": "Business Types Explained", "item": "https://setupr.com/guides/business-types" }
  ]
};

const BusinessTypesGuide = () => {
  const businessTypes = [
    {
      icon: User,
      name: "Sole Proprietorship",
      tagline: "Simplest option for solo operators",
      bestFor: "Freelancers, consultants, small service providers with revenue under ₹20-30 lakhs",
      pros: [
        "Minimal registration requirements",
        "Lowest compliance burden",
        "Easy to set up and operate",
        "Full control over business"
      ],
      cons: [
        "No separation of personal liability",
        "Harder to raise external funding",
        "May appear less credible to large clients"
      ],
      compliance: "GST returns (if registered), income tax filing",
      cost: "₹3,000 - ₹8,000 setup"
    },
    {
      icon: Users,
      name: "Limited Liability Partnership (LLP)",
      tagline: "Balance of flexibility and protection",
      bestFor: "Professional partnerships, consulting firms, small businesses wanting limited liability",
      pros: [
        "Limited liability for partners",
        "Lower compliance than Pvt Ltd",
        "Flexible profit sharing",
        "No minimum capital requirement"
      ],
      cons: [
        "Cannot raise equity funding",
        "All partners must be actively involved",
        "Less familiar to some investors"
      ],
      compliance: "Annual return, statement of accounts, ITR",
      cost: "₹8,000 - ₹15,000 setup"
    },
    {
      icon: Building,
      name: "Private Limited Company",
      tagline: "For growth and external funding",
      bestFor: "Startups planning to raise investment, scale, or build significant value",
      pros: [
        "Limited liability for shareholders",
        "Can raise equity funding",
        "Most credible structure for investors",
        "Perpetual succession"
      ],
      cons: [
        "Highest compliance requirements",
        "More expensive to maintain",
        "Complex documentation and governance"
      ],
      compliance: "Annual filings, board meetings, audits, ROC returns",
      cost: "₹15,000 - ₹25,000 setup"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Business Registration Types in India: Sole Prop vs LLP vs Pvt Ltd | Setupr</title>
        <meta name="description" content="Understand the differences between Sole Proprietorship, LLP, and Private Limited company in India. Find out which business structure is right for your startup or freelance business." />
        <link rel="canonical" href="https://setupr.com/guides/business-types" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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
            <span className="text-foreground">Business Types</span>
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
              Business Types in India: <span className="gradient-text">Which One Is Right for You?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A clear comparison of Sole Proprietorship, LLP, and Private Limited Company to help you make the right choice for your business stage.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span>By <Link to="/author/amir-khan" className="text-primary hover:underline">Amir Khan</Link></span>
              <span>•</span>
              <span>10 min read</span>
              <span>•</span>
              <span>Updated January 2025</span>
            </div>
          </motion.div>

          {/* Quick Decision Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-12"
          >
            <div className="glass-card rounded-xl p-6 md:p-8 border border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Decision Guide</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span><strong className="text-foreground">Solo freelancer/consultant with modest revenue?</strong> Start with Sole Proprietorship</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span><strong className="text-foreground">Two or more partners who want liability protection?</strong> Consider LLP</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span><strong className="text-foreground">Planning to raise investor funding?</strong> Go for Private Limited</span>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Business Types Detail */}
          <div className="space-y-8 mb-12">
            {businessTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-6 md:p-8 border border-border/50"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <type.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{type.name}</h3>
                    <p className="text-primary">{type.tagline}</p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Best for:</strong> {type.bestFor}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {type.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-400" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {type.cons.map((con, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm border-t border-border/50 pt-4">
                  <div className="px-3 py-1.5 bg-secondary rounded-lg">
                    <span className="text-muted-foreground">Compliance: </span>
                    <span className="text-foreground">{type.compliance}</span>
                  </div>
                  <div className="px-3 py-1.5 bg-secondary rounded-lg">
                    <span className="text-muted-foreground">Typical Cost: </span>
                    <span className="text-foreground">{type.cost}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="glass-card rounded-xl p-8 text-center border border-primary/20"
          >
            <h2 className="text-2xl font-bold font-display mb-4">Not sure which to choose?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Share your situation with us and we'll recommend the right structure for your business stage and goals.
            </p>
            <Button asChild size="lg">
              <Link to="/intake">
                Get Personalized Advice <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Related Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold mb-6">Related Guides & Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/guides/starting-business-india" className="glass-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors group">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Complete Guide to Starting a Business</h4>
                <p className="text-sm text-muted-foreground mt-1">Step-by-step process from registration to compliance</p>
              </Link>
              <Link to="/blog/freelancer-to-registered-business-guide" className="glass-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors group">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Freelancer to Registered Business</h4>
                <p className="text-sm text-muted-foreground mt-1">A practical guide for independent professionals</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessTypesGuide;
