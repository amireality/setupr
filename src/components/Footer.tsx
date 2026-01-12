import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-transparent py-12 md:py-16 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/50 before:to-transparent before:shadow-[0_0_8px_hsl(var(--primary)/0.4)]">
      <div className="container px-4 md:px-6 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/setupr-logo.svg" 
                alt="Setupr" 
                className="h-[32px] md:h-[36px] w-auto"
                width={88}
                height={32}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for business setup & compliance in India.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Business Formation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Digital Presence
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Setupr. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/setuprhq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/setuprhq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/setupr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
