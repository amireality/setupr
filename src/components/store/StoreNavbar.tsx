import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStoreAuth } from "@/hooks/useStoreAuth";

const StoreNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useStoreAuth();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: "/store", label: "Store Home" },
    { to: "/store/products", label: "All Products" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-transparent relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary/50 after:to-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/store" className="flex items-center group">
              <img
                src="/setupr-logo.svg"
                alt="Setupr Store"
                className="h-[28px] md:h-[36px] w-auto"
              />
              <span className="ml-2 text-sm font-semibold text-primary">Store</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.to)
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled className="opacity-50" title="Cart — Coming Soon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {user ? (
              <Button variant="outline" size="sm" asChild>
                <Link to="/store/dashboard">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/store/login">Sign In</Link>
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <div className="py-4 flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-all block",
                      isActive(link.to)
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <Link
                    to="/store/dashboard"
                    className="px-4 py-3 rounded-lg text-sm font-medium text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/store/login"
                    className="px-4 py-3 rounded-lg text-sm font-medium text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default StoreNavbar;
