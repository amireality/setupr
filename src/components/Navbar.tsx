import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useDbCategories, useDbServices } from "@/hooks/useServices";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: categories = [] } = useDbCategories();
  const { data: services = [] } = useDbServices();

  const isActive = (path: string) => location.pathname === path;

  const publicServices = services.filter(s => s.visibility === 'public');

  const getServicesByCategory = (categoryId: string) => {
    return publicServices.filter(s => s.category === categoryId).slice(0, 6);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-transparent relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary/50 after:to-transparent after:shadow-[0_0_8px_hsl(var(--primary)/0.4)]">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/setupr-logo.svg" 
              alt="Setupr" 
              className="h-[30px] md:h-[40px] w-auto"
              width={84}
              height={30}
              fetchPriority="high"
            />
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
            
            {/* Services Mega Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link 
                    to="/services"
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive('/services') || location.pathname.startsWith('/services/')
                        ? 'text-foreground bg-secondary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    )}
                  >
                    Services
                  </Link>
                  <NavigationMenuTrigger 
                    className={cn(
                      "px-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-transparent -ml-2",
                      "text-muted-foreground hover:text-foreground",
                      "data-[state=open]:bg-secondary/50"
                    )}
                  >
                    <span className="sr-only">Open services menu</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4 bg-card border border-border rounded-xl shadow-xl">
                      <div className="grid grid-cols-3 gap-4">
                        {categories.slice(0, 6).map((category) => (
                          <div key={category.id} className="group">
                            <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                              {category.title}
                            </h4>
                            <ul className="space-y-1">
                              {getServicesByCategory(category.category_id).map((service) => (
                                <li key={service.id}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={`/services/${service.service_id}`}
                                      className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1"
                                    >
                                      {service.service_name}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/services" 
                            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            View all services →
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              to="/blog" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/blog') || location.pathname.startsWith('/blog/') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              Resources
            </Link>

            <Link 
              to="/contact" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/contact') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Button variant="default" size="sm" asChild>
              <Link to="/intake">Get Started</Link>
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
              <Link 
                to="/blog" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/blog') || location.pathname.startsWith('/blog/')
                    ? 'text-foreground bg-secondary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/contact')
                    ? 'text-foreground bg-secondary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 mt-2 border-t border-border/50">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link to="/intake" onClick={() => setIsOpen(false)}>Get Started</Link>
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
