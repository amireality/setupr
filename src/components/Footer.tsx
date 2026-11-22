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

  const tagline = getSetting("footer_tagline", "Autonomous AI tools, custom web engineering, and global business setup. One technology ecosystem.");
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/setupr-logo-animated.gif"
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

          {/* Setupr Lab Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>Setupr Lab</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded-full bg-primary/20 text-primary border border-primary/30">
                R&D
              </span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/lab" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Lab Overview
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/amireality/blew-by-setupr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Blew (Social MCP)
                </a>
              </li>
              <li>
                <Link to="/lab" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  MCP Servers Hub
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/amireality" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub @amireality
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/services/website" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Websites &amp; Apps
                </Link>
              </li>
              <li>
                <Link to="/services/ai-workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI &amp; Automations
                </Link>
              </li>
              <li>
                <Link to="/services/pvt-ltd" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Business Setup
                </Link>
              </li>
            </ul>
          </div>

          {/* Cloud & Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Ecosystem</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/store" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cloud Marketplace
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Setupr
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
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
                  Terms &amp; Conditions
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
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-1">
              <p className="text-xs text-muted-foreground/60">
                {ownership}
              </p>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground">
                Serving founders <span className="font-medium text-muted-foreground/70">worldwide</span>
              </p>
            </div>
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