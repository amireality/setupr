import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/hooks/useBlogPosts";
import BlogThumbnail from "./BlogThumbnail";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden h-full relative"
      >
        {/* Gradient border effect on hover */}
        <div 
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, hsl(24 95% 53% / 0.5) 0%, transparent 40%, transparent 60%, hsl(30 100% 50% / 0.3) 100%)",
          }}
        />
        
        <div className="relative glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-[0_0_40px_-8px_hsl(24_95%_53%/0.3)] group-hover:border-primary/30">
          {/* Custom Thumbnail Graphic */}
          <div className="aspect-video">
            <BlogThumbnail category={post.category} className="w-full h-full" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category & Read time */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-primary/10 text-primary border-primary/30">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                <Clock className="w-3 h-3" />
                {post.read_time_minutes} min read
              </span>
            </div>

            {/* Title - Bold White */}
            <h3 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Read more */}
            <div className="flex items-center text-sm font-medium text-primary">
              Read article
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
