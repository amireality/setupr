import { cn } from "@/lib/utils";
import { StoreCategory } from "@/hooks/useStoreCategories";

interface StoreCategoryFilterProps {
  categories: StoreCategory[];
  selected: string | null;
  onChange: (categoryId: string | null) => void;
}

const StoreCategoryFilter = ({ categories, selected, onChange }: StoreCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
          !selected
            ? "bg-primary text-primary-foreground"
            : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            selected === cat.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default StoreCategoryFilter;
