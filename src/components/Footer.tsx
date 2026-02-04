import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

// Custom X (Twitter) icon since lucide doesn't have the new X logo
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("footer");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const tagline = getSetting("footer_tagline", "Your trusted partner for business setup & compliance in India.");
  const ownership = getSetting("footer_ownership", "Owned & operated by Altered.");
  const email = getSetting("footer_email", "info@setupr.com");
  const instagram = getSetting("footer_instagram", "https://www.instagram.com/setuprhq");
  const twitter = getSetting("footer_twitter", "https://x.com/setuprhq");
  const linkedin = getSetting("footer_linkedin", "https://linkedin.com/company/setupr");

  return (
    <footer className="bg-background py-12 md:py-16 relative z-20">
      {/* Gradient glow border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
      
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
              {tagline}
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
                <Link to="/career" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/guides/starting-business-india" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Starting a Business
                </Link>
              </li>
              <li>
                <Link to="/guides/business-types" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Business Types
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/company-registration" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Company Registration
                </Link>
              </li>
              <li>
                <Link to="/services/gst-registration" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  GST Registration
                </Link>
              </li>
              <li>
                <Link to="/services/domain-email" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Domain & Email
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
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Setupr. All Rights Reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              {ownership}
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${email}`} 
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href={instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href={twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all"
              aria-label="X (Twitter)"
            >
              <XIcon />
            </a>
            <a 
              href={linkedin} 
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