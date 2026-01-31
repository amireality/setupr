import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/hooks/useBlogPosts";
import BlogThumbnail from "./BlogThumbnail";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
  variant?: "default" | "large";
}

const BlogCard = ({ post, index = 0, className, variant = "default" }: BlogCardProps) => {
  const isLarge = variant === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("h-full", className)}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden h-full relative"
      >
        {/* Gradient border effect on hover */}
        <div 
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "linear-gradient(135deg, hsl(24 95% 53% / 0.5) 0%, transparent 40%, transparent 60%, hsl(30 100% 50% / 0.3) 100%)",
          }}
        />
        
        <div className="relative glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-[0_0_40px_-8px_hsl(24_95%_53%/0.3)] group-hover:border-primary/30 flex flex-col">
          {/* Custom Thumbnail Graphic - flex-based height */}
          <div className={cn(
            "relative overflow-hidden",
            isLarge ? "flex-1 min-h-[200px]" : "h-[140px]"
          )}>
            <BlogThumbnail category={post.category} className="w-full h-full" />
          </div>

          {/* Content */}
          <div className={cn(
            "p-4 flex flex-col",
            isLarge ? "p-5" : "p-4"
          )}>
            {/* Category & Read time */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full border bg-primary/10 text-primary border-primary/30">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                <Clock className="w-2.5 h-2.5" />
                {post.read_time_minutes} min
              </span>
            </div>

            {/* Title - Bold White */}
            <h3 className={cn(
              "font-bold font-display text-foreground mb-1.5 group-hover:text-primary transition-colors",
              isLarge ? "text-xl line-clamp-3" : "text-sm line-clamp-2"
            )}>
              {post.title}
            </h3>

            {/* Excerpt - only show on large cards */}
            {isLarge && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
            )}

            {/* Read more */}
            <div className={cn(
              "flex items-center font-medium text-primary mt-auto",
              isLarge ? "text-sm" : "text-xs"
            )}>
              Read article
              <ArrowRight className={cn(
                "ml-1 group-hover:translate-x-1 transition-transform",
                isLarge ? "w-4 h-4" : "w-3 h-3"
              )} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
