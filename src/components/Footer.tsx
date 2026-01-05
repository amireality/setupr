import { Link } from "react-router-dom";
import setuprLogo from "@/assets/setupr-logo.svg";
import tileClusterAccent from "@/assets/tile-cluster-accent.png";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border/30 py-8 relative overflow-hidden">
      {/* Subtle tile accent */}
      <img 
        src={tileClusterAccent} 
        alt="" 
        className="absolute -bottom-6 -right-6 w-20 opacity-30 pointer-events-none"
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={setuprLogo} 
              alt="Setupr" 
              className="h-[28px] md:h-[32px] w-auto"
            />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
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
          </nav>

          {/* Email */}
          <a href="mailto:email@setupr.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            email@setupr.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
