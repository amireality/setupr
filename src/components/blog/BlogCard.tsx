import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/hooks/useBlogPosts";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const categoryColors: Record<string, string> = {
    "Business Formation": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Compliance": "bg-green-500/10 text-green-400 border-green-500/20",
    "Digital Setup": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Tax Tips": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block glass-card glass-card-hover rounded-2xl overflow-hidden h-full"
      >
        {/* Image placeholder */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category & Read time */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${
              categoryColors[post.category] || "bg-primary/10 text-primary border-primary/20"
            }`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.read_time_minutes} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold font-display mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
      </Link>
    </motion.article>
  );
};

export default BlogCard;
