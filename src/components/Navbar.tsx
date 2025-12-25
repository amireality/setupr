import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl gradient-accent shadow-lg group-hover:shadow-glow transition-shadow duration-300" />
            <span className="font-display text-xl font-bold text-foreground tracking-tight">LegitBiz</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/services') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              Services
            </Link>
            <a 
              href="/#how-it-works" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
            >
              How It Works
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Button variant="default" size="sm" asChild>
              <Link to="/services">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              <Link 
                to="/" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-foreground bg-secondary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/services') 
                    ? 'text-foreground bg-secondary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <a 
                href="/#how-it-works" 
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <div className="pt-4 mt-2 border-t border-border/50">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link to="/services" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
