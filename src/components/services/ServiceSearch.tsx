import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 bg-secondary/50 border-border/30 focus:border-primary/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full text-xs",
            !selectedCategory
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          )}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.category_id}
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(cat.category_id)}
            className={cn(
              "rounded-full text-xs",
              selectedCategory === cat.category_id
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            )}
          >
            {cat.title.split("&")[0].trim()}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSearch;
