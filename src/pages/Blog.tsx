import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogThumbnail from "@/components/blog/BlogThumbnail";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlogPosts";

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
    }
  ]
};

const Blog = () => {
  const { data: posts = [], isLoading: postsLoading } = useBlogPosts();
  const { data: categories = [], isLoading: categoriesLoading } = useBlogCategories();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoading = postsLoading || categoriesLoading;

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Featured post (first one)
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative">
        <AnimatedGridBackground />
        <Navbar />
        <main className="pt-24 pb-16 relative z-10">
          <div className="container px-4 md:px-6 flex justify-center items-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Business Guides & Resources | Setupr Blog</title>
        <meta name="description" content="Expert guides on company registration, GST, MSME, compliance, and building credibility for freelancers, consultants, and startup founders in India." />
        <link rel="canonical" href="https://setupr.com/blog" />
        <meta property="og:title" content="Business Guides & Resources | Setupr Blog" />
        <meta property="og:description" content="Expert guides on company registration, GST, MSME, compliance, and building credibility for freelancers, consultants, and startup founders in India." />
        <meta property="og:url" content="https://setupr.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <AnimatedGridBackground />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-medium tracking-wide text-primary bg-primary/10 rounded-full border border-primary/20">
              <BookOpen className="w-3.5 h-3.5" />
              BUSINESS GUIDES & RESOURCES
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
              How to <span className="gradient-text">register and grow</span> your business in India
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert guides on company registration, GST, MSME, compliance, and building credibility — written for freelancers, consultants, and startup founders.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 mb-10"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "shadow-[0_0_20px_-5px_hsl(24_95%_53%/0.4)]" : ""}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "shadow-[0_0_20px_-5px_hsl(24_95%_53%/0.4)]" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-12"
                >
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="group block rounded-2xl overflow-hidden relative"
                  >
                    {/* Gradient border effect on hover */}
                    <div 
                      className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(135deg, hsl(24 95% 53% / 0.5) 0%, transparent 40%, transparent 60%, hsl(30 100% 50% / 0.3) 100%)",
                      }}
                    />
                    
                    <div className="relative glass-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_60px_-12px_hsl(24_95%_53%/0.3)] group-hover:border-primary/30">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Custom Thumbnail Graphic */}
                        <div className="aspect-video md:aspect-auto min-h-[250px]">
                          <BlogThumbnail category={featuredPost.category} className="w-full h-full" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col justify-center">
                          <span className="inline-block w-fit px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/30 mb-4">
                            {featuredPost.category}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground/60">
                            <span>{featuredPost.author_name}</span>
                            <span>•</span>
                            <span>{featuredPost.read_time_minutes} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Bento Grid Layout */}
              {remainingPosts.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4">
                  {remainingPosts.map((post, index) => {
                    // Extended bento pattern with more variety - 10 card cycle
                    const pattern = index % 10;
                    let gridClass = "";
                    let variant: "default" | "large" | "wide" | "tall" = "default";
                    
                    switch (pattern) {
                      case 0: // Hero large - spans 6 cols, 2 rows
                        gridClass = "col-span-2 md:col-span-4 lg:col-span-6 row-span-2";
                        variant = "large";
                        break;
                      case 1: // Tall right - spans 3 cols, 2 rows
                        gridClass = "col-span-1 md:col-span-2 lg:col-span-3 row-span-2";
                        variant = "tall";
                        break;
                      case 2: // Standard top right
                        gridClass = "col-span-1 md:col-span-2 lg:col-span-3";
                        variant = "default";
                        break;
                      case 3: // Wide horizontal - spans 8 cols
                        gridClass = "col-span-2 md:col-span-4 lg:col-span-8";
                        variant = "wide";
                        break;
                      case 4: // Standard
                        gridClass = "col-span-1 md:col-span-2 lg:col-span-4";
                        variant = "default";
                        break;
                      case 5: // Medium - spans 4 cols, 2 rows
                        gridClass = "col-span-2 md:col-span-2 lg:col-span-4 row-span-2";
                        variant = "tall";
                        break;
                      case 6: // Standard
                        gridClass = "col-span-1 md:col-span-2 lg:col-span-4";
                        variant = "default";
                        break;
                      case 7: // Standard
                        gridClass = "col-span-1 md:col-span-2 lg:col-span-4";
                        variant = "default";
                        break;
                      case 8: // Wide bottom - spans 6 cols
                        gridClass = "col-span-2 md:col-span-4 lg:col-span-6";
                        variant = "wide";
                        break;
                      case 9: // Tall end - spans 6 cols
                        gridClass = "col-span-2 md:col-span-4 lg:col-span-6";
                        variant = "wide";
                        break;
                      default:
                        gridClass = "col-span-1 md:col-span-2 lg:col-span-4";
                    }
                    
                    return (
                      <BlogCard 
                        key={post.id} 
                        post={post} 
                        index={index} 
                        className={gridClass}
                        variant={variant}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center relative"
          >
            {/* Gradient border */}
            <div 
              className="absolute -inset-[1px] rounded-2xl"
              style={{
                background: "linear-gradient(135deg, hsl(24 95% 53% / 0.3) 0%, transparent 40%, transparent 60%, hsl(30 100% 50% / 0.2) 100%)",
              }}
            />
            <div className="relative glass-card rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                Ready to register your business?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Setupr handles company registration, GST, MSME, website, and compliance for freelancers and startups in India.
              </p>
              <Button asChild size="lg" className="shadow-[0_0_30px_-8px_hsl(24_95%_53%/0.5)]">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
