import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorBio from "@/components/blog/AuthorBio";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 2);

  // Generate Article schema
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author_name,
      "url": "https://setupr.com/author/amir-khan"
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

  // Parse inline markdown (bold and links)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      // Check for markdown link [text](url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      // Check for bold **text**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

      // Find which comes first
      const linkIndex = linkMatch ? remaining.indexOf(linkMatch[0]) : -1;
      const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;

      if (linkIndex === -1 && boldIndex === -1) {
        // No more markdown, add remaining text
        parts.push(remaining);
        break;
      }

      // Determine which match comes first
      let firstMatchIndex: number;
      let matchType: 'link' | 'bold';
      
      if (linkIndex === -1) {
        firstMatchIndex = boldIndex;
        matchType = 'bold';
      } else if (boldIndex === -1) {
        firstMatchIndex = linkIndex;
        matchType = 'link';
      } else {
        firstMatchIndex = Math.min(linkIndex, boldIndex);
        matchType = linkIndex < boldIndex ? 'link' : 'bold';
      }

      // Add text before the match
      if (firstMatchIndex > 0) {
        parts.push(remaining.substring(0, firstMatchIndex));
      }

      if (matchType === 'link' && linkMatch) {
        const [fullMatch, linkText, linkUrl] = linkMatch;
        parts.push(
          <Link 
            key={`link-${keyIndex++}`} 
            to={linkUrl} 
            className="text-primary hover:underline"
          >
            {linkText}
          </Link>
        );
        remaining = remaining.substring(firstMatchIndex + fullMatch.length);
      } else if (matchType === 'bold' && boldMatch) {
        const [fullMatch, boldText] = boldMatch;
        parts.push(
          <strong key={`bold-${keyIndex++}`} className="font-semibold text-foreground">
            {boldText}
          </strong>
        );
        remaining = remaining.substring(firstMatchIndex + fullMatch.length);
      }
    }

    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
  };

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag key={elements.length} className={`${listType === "ul" ? "list-disc" : "list-decimal"} list-inside space-y-2 my-4 text-muted-foreground`}>
            {currentList.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item)}</li>
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip horizontal rules
      if (trimmedLine === "---" || trimmedLine === "***") {
        flushList();
        elements.push(<hr key={index} className="my-6 border-border/50" />);
        return;
      }

      // Headers
      if (trimmedLine.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold font-display mt-8 mb-4">
            {parseInlineMarkdown(trimmedLine.replace("## ", ""))}
          </h2>
        );
      } else if (trimmedLine.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold font-display mt-6 mb-3">
            {parseInlineMarkdown(trimmedLine.replace("### ", ""))}
          </h3>
        );
      }
      // Unordered list items
      else if (trimmedLine.startsWith("- ")) {
        if (listType === "ol") flushList();
        listType = "ul";
        currentList.push(trimmedLine.replace("- ", ""));
      }
      // Ordered list items (1. 2. 3. etc)
      else if (/^\d+\.\s/.test(trimmedLine)) {
        if (listType === "ul") flushList();
        listType = "ol";
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ""));
      }
      // Blockquotes
      else if (trimmedLine.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote 
            key={index} 
            className="border-l-4 border-primary/50 pl-4 my-6 italic text-muted-foreground bg-primary/5 py-3 pr-4 rounded-r-lg"
          >
            {parseInlineMarkdown(trimmedLine.replace("> ", ""))}
          </blockquote>
        );
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ""));
      }
      // Empty lines
      else if (trimmedLine === "") {
        flushList();
      }
      // Regular paragraphs
      else {
        flushList();
        elements.push(
          <p key={index} className="text-muted-foreground leading-relaxed my-4">
            {parseInlineMarkdown(trimmedLine)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

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
      <main className="pt-24 pb-16">
        <article className="container px-4 md:px-6 max-w-4xl mx-auto">
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

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Link 
                to="/author/amir-khan" 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-primary">{post.author_name}</span>
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
          </motion.header>

          {/* Featured image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl flex items-center justify-center mb-10"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            {renderContent(post.content)}
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
              <h2 className="text-2xl font-bold font-display mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
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
