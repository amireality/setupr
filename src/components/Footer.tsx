import { Link } from "react-router-dom";
import setuprLogo from "@/assets/setupr-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border/50 py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={setuprLogo} 
              alt="Setupr" 
              className="h-[30px] md:h-[36px] w-auto"
            />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a 
              href="https://www.instagram.com/setuprhq?igsh=cWUwbjZlZWVtbGY4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a href="mailto:info@setupr.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              info@setupr.com
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Setupr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
