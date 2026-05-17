import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ServiceSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: Array<{ category_id: string; title: string }>;
}

const ServiceSearch = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ServiceSearchProps) => {
  const allCategories = [
    { category_id: "__all__", title: "All" },
    ...categories,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="sticky top-[72px] z-30 py-4 -mx-4 px-4 md:-mx-6 md:px-6"
    >
      <div className="max-w-3xl mx-auto backdrop-blur-xl bg-background/70 border border-border/30 rounded-2xl p-3 shadow-lg">
        {/* Search input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-secondary/30 border-border/20 focus:border-primary/50 rounded-xl h-11 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filter pills with animated background */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {allCategories.map((cat) => {
            const isActive =
              cat.category_id === "__all__"
                ? !selectedCategory
                : selectedCategory === cat.category_id;

            return (
              <button
                key={cat.category_id}
                onClick={() =>
                  onCategoryChange(
                    cat.category_id === "__all__" ? null : cat.category_id
                  )
                }
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-category-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {cat.category_id === "__all__"
                    ? "All"
                    : cat.title.split("&")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceSearch;
