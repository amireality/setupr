import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
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
              className="h-[30px] md:h-[40px] w-auto transition-transform duration-300 group-hover:scale-105"
              width={84}
              height={30}
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive('/') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              Home
              {isActive('/') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
            
            {/* Services Mega Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link 
                    to="/services"
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive('/services') || location.pathname.startsWith('/services/')
                        ? 'text-foreground bg-secondary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    )}
                  >
                    Services
                    {(isActive('/services') || location.pathname.startsWith('/services/')) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
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
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-[600px] p-4 bg-card border border-border rounded-xl shadow-xl"
                    >
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
                                      className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 hover:translate-x-1 transition-transform"
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
                            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1 group"
                          >
                            View all services 
                            <motion.span
                              className="inline-block"
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              →
                            </motion.span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              to="/blog" 
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive('/blog') || location.pathname.startsWith('/blog/') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              Resources
              {(isActive('/blog') || location.pathname.startsWith('/blog/')) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>

            <Link 
              to="/contact" 
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive('/contact') 
                  ? 'text-foreground bg-secondary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              Contact
              {isActive('/contact') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Button variant="default" size="sm" asChild className="group">
              <Link to="/intake">
                Get Started
                <motion.span
                  className="inline-block ml-1"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <div className="py-4">
                <div className="flex flex-col gap-1">
                  <motion.div variants={mobileItemVariants}>
                    <Link 
                      to="/" 
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 block",
                        isActive('/') 
                          ? 'text-foreground bg-secondary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link 
                      to="/services" 
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 block",
                        isActive('/services') 
                          ? 'text-foreground bg-secondary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link 
                      to="/blog" 
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 block",
                        isActive('/blog') || location.pathname.startsWith('/blog/')
                          ? 'text-foreground bg-secondary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Resources
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link 
                      to="/contact" 
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 block",
                        isActive('/contact')
                          ? 'text-foreground bg-secondary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants} className="pt-4 mt-2 border-t border-border/50">
                    <Button variant="default" size="sm" className="w-full" asChild>
                      <Link to="/intake" onClick={() => setIsOpen(false)}>Get Started</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
