import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StoreSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const StoreSearchBar = ({ value, onChange, placeholder = "Search products, vendors..." }: StoreSearchBarProps) => {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
      />
    </div>
  );
};

export default StoreSearchBar;
