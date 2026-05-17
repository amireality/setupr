import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogThumbnail from "@/components/blog/BlogThumbnail";
import { ServiceIllustration } from "@/components/ui/ServiceIllustration";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuthorByName } from "@/hooks/useAuthors";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { renderMarkdown } from "@/lib/markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();
  const { data: authorData } = useAuthorByName(post?.author_name || "");

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 2);

  // Generate author link
  const authorSlug = authorData?.slug || post?.author_name?.toLowerCase().replace(/\s+/g, "-") || "amir-khan";

  // Generate Article schema
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featured_image_url ? [post.featured_image_url] : undefined,
    "author": {
      "@type": "Person",
      "name": post.author_name,
      "url": `https://setupr.com/team/${authorSlug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Setupr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://setupr.com/favicon.png"
      }
    },
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://setupr.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.read_time_minutes}M`
  } : null;

  // Generate BreadcrumbList schema
  const breadcrumbSchema = post ? {
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
        "name": post.title,
        "item": `https://setupr.com/blog/${post.slug}`
      }
    ]
  } : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 flex justify-center items-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Setupr Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content={post.author_name} />
        <link rel="canonical" href={`https://setupr.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://setupr.com/blog/${post.slug}`} />
        <meta property="article:author" content={post.author_name} />
        <meta property="article:section" content={post.category} />
        {post.published_at && (
          <meta property="article:published_time" content={post.published_at} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Navbar />
      <main className="pt-16 pb-16">
        {/* Immersive Scroll-Driven Backdrop for Blog Hero */}
        <section className="relative w-full overflow-hidden bg-background pt-16 pb-12 md:py-20 mb-10 border-b border-primary/20 flex items-center min-h-[340px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 z-0" />
          
          {/* Immersive scroll-driven illustration backdrop based on the blog's category */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full opacity-25 md:opacity-85 pointer-events-none z-0 overflow-visible flex items-center justify-center">
            <ServiceIllustration
              category={post.category}
              size="lg"
              className="w-[160%] h-[160%] max-w-[550px] aspect-square border-0 bg-transparent shadow-none hover:shadow-none hover:bg-transparent overflow-visible"
            />
          </div>
          
          <div className="container px-4 md:px-6 max-w-4xl mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary transition-all">
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </motion.div>

            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <Link 
                to={`/team/${authorSlug}`} 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-primary font-medium">{post.author_name}</span>
              </Link>
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.published_at), "MMM d, yyyy")}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.read_time_minutes} min read
              </span>
            </div>
          </div>
        </section>

        <article className="container px-4 md:px-6 max-w-4xl mx-auto">
          {/* Cinematic glassmorphic featured image in reading flow */}
          {post.featured_image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative mb-10 rounded-2xl overflow-hidden border border-primary/10 shadow-[0_0_50px_rgba(234,88,12,0.08)] bg-secondary/15 p-1"
            >
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full rounded-xl aspect-[21/9] object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                loading="eager"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, hsl(var(--background) / 0.4) 100%)",
                }}
              />
            </motion.div>
          )}

          {/* Content - using shared markdown renderer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            {renderMarkdown(post.content)}
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AuthorBio authorName={post.author_name} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 glass-card rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold font-display mb-3">
              Need Help with {post.category}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Setupr helps freelancers, startups, and small businesses in India with business registration, compliance, and digital presence.
            </p>
            <Button asChild>
              <Link to="/services">
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-display mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group glass-card glass-card-hover rounded-xl p-6"
                  >
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold font-display group-hover:text-primary transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;