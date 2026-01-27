import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amir Khan",
  "url": "https://setupr.com/author/amir-khan",
  "jobTitle": "Founder",
  "description": "Amir Khan is the founder of Setupr, a platform focused on simplifying business setup, compliance, and digital presence for freelancers, startups, and small teams in India.",
  "worksFor": {
    "@type": "Organization",
    "name": "Setupr",
    "url": "https://setupr.com"
  },
  "sameAs": [
    "https://x.com/setuprhq",
    "https://linkedin.com/company/setupr"
  ]
};

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
      "name": "Blog",
      "item": "https://setupr.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Amir Khan",
      "item": "https://setupr.com/author/amir-khan"
    }
  ]
};

const AuthorPage = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  // Filter posts by author
  const authorPosts = posts.filter(
    (post) => post.author_name.toLowerCase() === "amir khan"
  );

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Amir Khan - Founder of Setupr | Articles on Business Setup</title>
        <meta name="description" content="Amir Khan is the founder of Setupr, a platform focused on simplifying business setup, compliance, and digital presence for freelancers, startups, and small teams in India." />
        <link rel="canonical" href="https://setupr.com/author/amir-khan" />
        <meta property="og:title" content="Amir Khan - Founder of Setupr" />
        <meta property="og:description" content="Amir Khan is the founder of Setupr. Read articles on business registration, compliance, and startup setup in India." />
        <meta property="og:url" content="https://setupr.com/author/amir-khan" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <AnimatedGridBackground />
      <Navbar />

      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>

          {/* Author Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-display font-bold text-primary">
                  AK
                </span>
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  <span className="text-primary">Amir Khan</span>
                </h1>
                <p className="text-sm text-muted-foreground mb-4">
                  Founder, Setupr
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Amir Khan is the founder of Setupr, a platform focused on
                  simplifying business setup, compliance, and digital presence
                  for freelancers, startups, and small teams in India. He works
                  on building systems and resources to help early founders start
                  with clarity.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://x.com/setuprhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a
                    href="https://linkedin.com/company/setupr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Author's Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-semibold">
                Articles by Amir Khan
              </h2>
              <span className="text-sm text-muted-foreground">
                ({authorPosts.length})
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : authorPosts.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl">
                <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No articles yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {authorPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Entity Info for AI/SEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 glass-card rounded-2xl p-6 text-center"
          >
            <h3 className="font-display font-semibold mb-2">About Setupr</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Setupr is a business setup platform that helps freelancers,
              consultants, and startups in India with company registration, GST,
              MSME, compliance, and digital presence. Founded by Amir Khan,
              Setupr's mission is to simplify the early founder journey.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorPage;
