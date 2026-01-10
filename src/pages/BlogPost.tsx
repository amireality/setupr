import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 2);

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
              <li key={i}>{item}</li>
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Headers
      if (trimmedLine.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold font-display mt-8 mb-4">
            {trimmedLine.replace("## ", "")}
          </h2>
        );
      } else if (trimmedLine.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold font-display mt-6 mb-3">
            {trimmedLine.replace("### ", "")}
          </h3>
        );
      }
      // Bold text markers
      else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        flushList();
        elements.push(
          <p key={index} className="font-semibold text-foreground my-2">
            {trimmedLine.replace(/\*\*/g, "")}
          </p>
        );
      }
      // List items
      else if (trimmedLine.startsWith("- ")) {
        listType = "ul";
        currentList.push(trimmedLine.replace("- ", ""));
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
            {trimmedLine}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
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
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author_name}
              </span>
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
              Our experts are ready to guide you through every step.
            </p>
            <Button asChild>
              <Link to="/services">
                Get Started
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
