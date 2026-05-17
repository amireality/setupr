"use client";

import { ServiceIllustration } from "@/components/ui/ServiceIllustration";
import { cn } from "@/lib/utils";

interface BlogThumbnailProps {
  category: string;
  className?: string;
}

const BlogThumbnail = ({ category, className }: BlogThumbnailProps) => {
  // Map blog categories to core illustration keys
  const getIllustrationCategory = (cat: string) => {
    switch (cat) {
      case "Business Formation":
        return "formation";
      case "Compliance":
      case "Tax Tips":
        return "compliance";
      case "Digital Setup":
        return "digital";
      case "AI & Automation":
      case "AI for Business":
      case "AI Setup":
        return "ai-business";
      default:
        return "formation";
    }
  };

  const illustrationCategory = getIllustrationCategory(category);

  return (
    <div 
      className={cn(
        "relative overflow-hidden transition-all duration-300 w-full h-full flex items-center justify-center p-2 rounded-xl group/thumbnail",
        className
      )}
    >
      <ServiceIllustration
        category={illustrationCategory}
        size="sm"
        className="w-full h-full border-0 bg-transparent hover:bg-transparent shadow-none hover:shadow-none p-0 overflow-visible"
      />
    </div>
  );
};

export default BlogThumbnail;
