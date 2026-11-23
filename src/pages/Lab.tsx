import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Bot, 
  Terminal, 
  Sparkles, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  Chrome, 
  ArrowRight, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  Code2, 
  Globe, 
  ShieldCheck, 
  Workflow, 
  Zap,
  Boxes
} from "lucide-react";
import { useSeoSettings } from "@/hooks/useSeoSettings";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://setupr.com/" },
    { "@type": "ListItem", "position": 2, "name": "Setupr Lab", "item": "https://setupr.com/lab" }
  ]
};

const blewSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Blew by Setupr",
  "operatingSystem": "All (Claude Desktop, Cursor, Antigravity, Chrome)",
  "applicationCategory": "DeveloperApplication",
  "description": "Zero-dashboard social media autopilot for AI agents. Model Context Protocol (MCP) server and browser extension enabling direct publishing to X (Twitter) and LinkedIn from AI chat interfaces.",
  "url": "https://github.com/amireality/blew-by-setupr",
  "publisher": {
    "@type": "Organization",
    "name": "Setupr",
    "url": "https://setupr.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const Lab = () => {
  const { data: seo } = useSeoSettings("lab");
  const [copiedCode, setCopiedCode] = useState(false);

  const mcpConfigCode = `{
  "mcpServers": {
    "blew-by-setupr": {
      "command": "npx",
      "args": ["-y", "@setupr/blew"]
    }
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mcpConfigCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Helmet>
        <title>{seo?.title || "Setupr Lab | Open-Source AI Tools, MCP Servers & Extensions"}</title>
        <meta 
          name="description" 
          content={seo?.description || "Explore Setupr Lab: creator of Blew by Setupr (social media autopilot for AI agents), Model Context Protocol (MCP) servers, and developer toolkits."} 
        />
        <link rel="canonical" href="https://setupr.com/lab" />
        <meta property="og:title" content={seo?.ogTitle || seo?.title || "Setupr Lab | Autonomous AI Tools & Developer Products"} />
        <meta property="og:description" content={seo?.ogDescription || seo?.description || "Engineering open-source AI tools, MCP servers, and autonomous browser extensions for founders."} />
        <meta property="og:url" content="https://setupr.com/lab" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(blewSoftwareSchema)}
        </script>
      </Helmet>

      {/* Ambient background micro-glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.04] blur-[140px] pointer-events-none z-0" />
      <AnimatedGridBackground className="opacity-20" />
      
      <Navbar />

      <main className="relative z-10 pt-28 md:pt-36 pb-24">
        {/* Hero Section */}
        <div className="container px-4 md:px-6 mb-20 md:mb-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Lab Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Setupr Lab • Product &amp; R&amp;D Hub</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 text-balance"
            >
              Where AI Agents & Modern Software Are <span className="gradient-text">Engineered</span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Setupr is an ecosystem. Beyond our bespoke digital solutions, <strong className="text-foreground font-semibold">Setupr Lab</strong> builds open-source developer infrastructure, autonomous AI tools, Model Context Protocol (MCP) servers, and browser extensions for modern founders.
            </motion.p>

            {/* Quick Stats/Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground"
            >
              <span className="px-3 py-1.5 rounded-lg bg-card/60 border border-border/60 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-primary" /> Open Source First
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-card/60 border border-border/60 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-primary" /> MCP Native
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-card/60 border border-border/60 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" /> Zero Dashboard Overhead
              </span>
            </motion.div>
          </div>
        </div>

        {/* Flagship Product: Blew by Setupr */}
        <section className="container px-4 md:px-6 mb-24 md:mb-32">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl border border-white/[0.1] bg-[#0c0d12]/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl">
              {/* Subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Product Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Flagship Product
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                    Blew by Setupr
                  </h2>

                  <p className="text-xl font-medium text-zinc-200 leading-snug">
                    The zero-dashboard social media autopilot for AI agents &amp; founders.
                  </p>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Say goodbye to clunky social media schedulers, complicated API keys, and monthly subscription traps. <strong className="text-foreground">Blew</strong> allows AI agents in Cursor, Claude Desktop, Antigravity, or ChatGPT to publish and syndicate high-engagement content straight to <strong className="text-foreground">X (Twitter)</strong> and <strong className="text-foreground">LinkedIn</strong> using your authenticated browser session.
                  </p>

                  {/* Feature checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Model Context Protocol (MCP) native</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Zero SaaS dashboards to log into</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Multi-platform: X & LinkedIn</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Free & open-source on GitHub</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      asChild 
                      className="shadow-glow"
                    >
                      <a 
                        href="https://github.com/amireality/blew-by-setupr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on GitHub
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      asChild
                      className="border-border hover:border-primary/40"
                    >
                      <Link to="/contact" className="inline-flex items-center gap-2">
                        Request Enterprise Setup
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right Column: Code & Architecture Preview */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-border/80 bg-black/90 p-5 font-mono text-xs shadow-2xl relative">
                    {/* Window Controls */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[11px] text-muted-foreground font-sans">claude_desktop_config.json</span>
                      <button 
                        onClick={handleCopyCode} 
                        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
                        title="Copy configuration"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <pre className="text-zinc-300 overflow-x-auto leading-relaxed text-[11px] mb-4">
                      <code>{mcpConfigCode}</code>
                    </pre>

                    {/* Terminal Simulation */}
                    <div className="pt-3 border-t border-white/10 text-[11px] space-y-1.5">
                      <div className="text-muted-foreground flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-primary" />
                        <span>agent@setupr-lab:~$</span>
                      </div>
                      <div className="text-primary font-medium">
                        &gt; blew publish --x &quot;Launching Blew by Setupr!&quot; --linkedin
                      </div>
                      <div className="text-emerald-400">
                        ✔ Published to X (@amireality)
                      </div>
                      <div className="text-emerald-400">
                        ✔ Distributed to LinkedIn Post #8492
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Setupr Ecosystem: 3 Pillars */}
        <section className="container px-4 md:px-6 mb-24 md:mb-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block font-semibold">
                Architecture & Divisions
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Setupr Technology Ecosystem
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Just like modern tech conglomerates operate distinct product and cloud lines, Setupr scales your business across three unified divisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Division 1: Setupr Lab */}
              <div className="rounded-2xl border border-white/[0.1] bg-[#0c0d12]/80 hover:bg-[#0c0d12] hover:border-white/[0.2] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary mb-5">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-medium text-zinc-300 mb-3">
                    DIVISION 01 • R&amp;D
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Setupr Lab
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Open-source software, Model Context Protocol (MCP) servers, browser extensions (Blew), and autonomous AI agent toolkits.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] text-xs text-primary font-medium flex items-center gap-1">
                  Active Innovation Hub <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Division 2: Setupr Services */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d12]/60 hover:bg-[#0c0d12] hover:border-white/[0.18] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary mb-5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-medium text-zinc-400 mb-3">
                    DIVISION 02 • SOLUTIONS
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Setupr Services
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Bespoke web engineering, WhatsApp &amp; payment gateway integrations, custom CRM automations, and turnkey business formation.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06]">
                  <Link to="/services" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    Explore Services Catalog <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Division 3: Setupr Cloud */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d12]/60 hover:bg-[#0c0d12] hover:border-white/[0.18] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-foreground mb-5">
                    <Boxes className="w-6 h-6" />
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-[10px] font-mono font-bold text-muted-foreground mb-3">
                    DIVISION 03 • CLOUD
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Setupr Cloud &amp; Store
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Enterprise SaaS provisioning, Google Workspace, Microsoft 365, AWS, and Zoho subscriptions with localized billing and support.
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <Link to="/store" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    Visit Cloud Marketplace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Lab Initiatives */}
        <section className="container px-4 md:px-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-border/70 bg-secondary/10 p-8 md:p-12">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block font-semibold">
                  What's Next at Setupr Lab
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Building the Infrastructure for 1-Person Billion Dollar Startups.
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  We believe future companies will be run by autonomous AI agents paired with visionary founders. Setupr Lab is crafting the open protocols, connectors, and browser tooling that bridge autonomous reasoning with real-world execution.
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="hero" asChild className="shadow-glow">
                    <a 
                      href="https://github.com/amireality" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Follow on GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Collaborate with Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Lab;
