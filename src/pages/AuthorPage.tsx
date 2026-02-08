import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuthor } from "@/hooks/useAuthors";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const AuthorPage = () => {
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const { data: author, isLoading: authorLoading, error: authorError } = useAuthor(authorSlug || "");
  const { data: posts = [], isLoading: postsLoading } = useBlogPosts();
  const { data: settings = [] } = useSiteSettingsByCategory("author");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  const articlesHeadingTemplate = getSetting("author_articles_heading", "Articles by {name}");
  const aboutSetupr = getSetting("author_about_setupr", "Setupr is a business setup platform that helps freelancers, consultants, and startups in India with company registration, GST, MSME, compliance, and digital presence. Our mission is to simplify the early founder journey.");

  // Filter posts by this author
  const authorPosts = posts.filter(
    (post) => post.author_name.toLowerCase() === author?.name.toLowerCase()
  );

  // Generate dynamic schema
  const personSchema = author
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: author.name,
        url: `https://setupr.com/team/${author.slug}`,
        jobTitle: author.title,
        description: author.bio,
        worksFor: {
          "@type": "Organization",
          name: "Setupr",
          url: "https://setupr.com",
        },
        sameAs: [author.twitter_url, author.linkedin_url].filter(Boolean),
      }
    : null;

  const breadcrumbSchema = author
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://setupr.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Team",
            item: "https://setupr.com/team",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: author.name,
            item: `https://setupr.com/team/${author.slug}`,
          },
        ],
      }
    : null;

  if (authorLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authorError || !author) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Author not found</h1>
            <p className="text-muted-foreground mb-6">
              The author you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/team">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Team Members
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>
          {author.name} - {author.title} | Setupr
        </title>
        <meta name="description" content={author.bio} />
        <link rel="canonical" href={`https://setupr.com/team/${author.slug}`} />
        <meta property="og:title" content={`${author.name} - ${author.title}`} />
        <meta property="og:description" content={author.bio} />
        <meta
          property="og:url"
          content={`https://setupr.com/team/${author.slug}`}
        />
        {personSchema && (
          <script type="application/ld+json">
            {JSON.stringify(personSchema)}
          </script>
        )}
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
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
              <Link to="/team">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team
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
                  {author.avatar_initials}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  <span className="text-primary">{author.name}</span>
                </h1>
                <p className="text-sm text-muted-foreground mb-4">
                  {author.title}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {author.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {author.twitter_url && (
                    <a
                      href={author.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  {author.linkedin_url && (
                    <a
                      href={author.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
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
                {articlesHeadingTemplate.replace("{name}", author.name)}
              </h2>
              <span className="text-sm text-muted-foreground">
                ({authorPosts.length})
              </span>
            </div>

            {postsLoading ? (
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
              {aboutSetupr}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorPage;
