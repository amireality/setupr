import { Link } from "react-router-dom";

const StoreFooter = () => {
  return (
    <footer className="bg-background py-8 relative z-20 border-t border-border/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Setupr
            </Link>
            <Link to="/store" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Store Home
            </Link>
            <Link to="/store/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Setupr Cloud Marketplace
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
