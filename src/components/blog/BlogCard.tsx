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
  variant?: "default" | "large" | "wide" | "tall";
}

const BlogCard = ({ post, index = 0, className, variant = "default" }: BlogCardProps) => {
  const isLarge = variant === "large";
  const isWide = variant === "wide";
  const isTall = variant === "tall";
  const showExcerpt = isLarge || isWide || isTall;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.04, 0.25), duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
        
        <div className={cn(
          "relative glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-[0_0_40px_-8px_hsl(24_95%_53%/0.3)] group-hover:border-primary/30",
          isWide ? "flex flex-row" : "flex flex-col"
        )}>
          {/* Custom Thumbnail Graphic */}
          <div className={cn(
            "relative overflow-hidden",
            isLarge && "flex-1 min-h-[200px]",
            isWide && "w-2/5 min-w-[200px]",
            isTall && "flex-1 min-h-[180px]",
            !isLarge && !isWide && !isTall && "h-[120px] md:h-[140px]"
          )}>
            {post.featured_image_url ? (
              <img
                src={post.featured_image_url}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            ) : (
              <BlogThumbnail category={post.category} className="w-full h-full" />
            )}
            {/* Edge blend with background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background) / 0.55) 85%, hsl(var(--background)) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className={cn(
            "flex flex-col",
            isLarge && "p-5 md:p-6",
            isWide && "p-4 md:p-5 flex-1 justify-center",
            isTall && "p-4",
            !isLarge && !isWide && !isTall && "p-3 md:p-4"
          )}>
            {/* Category & Read time */}
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "font-medium rounded-full border bg-primary/10 text-primary border-primary/30",
                isLarge || isWide ? "px-2.5 py-0.5 text-xs" : "px-2 py-0.5 text-[10px]"
              )}>
                {post.category}
              </span>
              <span className={cn(
                "flex items-center gap-1 text-muted-foreground/60",
                isLarge || isWide ? "text-xs" : "text-[10px]"
              )}>
                <Clock className={cn(isLarge || isWide ? "w-3 h-3" : "w-2.5 h-2.5")} />
                {post.read_time_minutes} min
              </span>
            </div>

            {/* Title */}
            <h3 className={cn(
              "font-bold font-display text-foreground group-hover:text-primary transition-colors",
              isLarge && "text-xl md:text-2xl line-clamp-3 mb-2",
              isWide && "text-lg md:text-xl line-clamp-2 mb-2",
              isTall && "text-base md:text-lg line-clamp-3 mb-2",
              !isLarge && !isWide && !isTall && "text-sm line-clamp-2 mb-1.5"
            )}>
              {post.title}
            </h3>

            {/* Excerpt - only show on larger cards */}
            {showExcerpt && (
              <p className={cn(
                "text-muted-foreground flex-1",
                isLarge && "text-sm md:text-base line-clamp-3 mb-3",
                isWide && "text-sm line-clamp-2 mb-3",
                isTall && "text-sm line-clamp-2 mb-2"
              )}>
                {post.excerpt}
              </p>
            )}

            {/* Read more */}
            <div className={cn(
              "flex items-center font-medium text-primary mt-auto",
              isLarge || isWide ? "text-sm" : "text-xs"
            )}>
              Read article
              <ArrowRight className={cn(
                "ml-1 group-hover:translate-x-1 transition-transform",
                isLarge || isWide ? "w-4 h-4" : "w-3 h-3"
              )} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
