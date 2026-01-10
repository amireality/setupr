import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-transparent py-8 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/50 before:to-transparent before:shadow-[0_0_8px_hsl(var(--primary)/0.4)]">

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/setupr-logo.svg" 
              alt="Setupr" 
              className="h-[28px] md:h-[32px] w-auto"
              width={78}
              height={28}
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
          <a href="mailto:info@setupr.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            info@setupr.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
