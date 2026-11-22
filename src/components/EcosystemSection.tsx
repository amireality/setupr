import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Layers, Boxes, ArrowRight, Sparkles, ExternalLink, Bot, Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EcosystemSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-black/60 border-y border-border/40">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono text-primary mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SETUPR ECOSYSTEM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            One Parent Ecosystem. Three High-Impact <span className="gradient-text">Divisions</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Just as modern tech leaders unify research, platforms, and services, Setupr scales your vision through specialized, interoperable divisions.
          </motion.p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Pillar 1: Setupr Lab */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-primary/40 bg-gradient-to-b from-card/90 via-card/50 to-background p-6 sm:p-8 flex flex-col justify-between relative group hover:border-primary transition-all duration-300 shadow-[0_0_40px_-15px_hsl(var(--primary)/0.15)]"
          >
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-mono font-bold text-primary">
              FEATURED PRODUCT: BLEW
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-2">
                Division 01 • Products &amp; R&amp;D
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Setupr Lab
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our autonomous software lab. Home to <strong className="text-foreground">Blew by Setupr</strong> (the zero-dashboard social media autopilot for AI agents), Model Context Protocol (MCP) servers, and open-source founder toolkits.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-muted-foreground font-mono">
                <li className="flex items-center gap-2 text-foreground/90">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span>Blew MCP Server &amp; Extension</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                  <span>Agent-to-Social Autopilots (X &amp; LinkedIn)</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Open-source developer utilities</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border/50 flex items-center justify-between">
              <Button variant="hero" size="sm" asChild className="shadow-glow">
                <Link to="/lab" className="inline-flex items-center gap-1.5">
                  Enter Setupr Lab
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <a 
                href="https://github.com/amireality/blew-by-setupr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Pillar 2: Setupr Services */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-border/70 bg-card/40 p-6 sm:p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center text-foreground mb-6">
                <Layers className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Division 02 • Digital Solutions
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Setupr Services
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                End-to-end digital infrastructure for modern businesses. Custom website engineering, WhatsApp &amp; payment gateway integrations, CRM workflows, and global company setup.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-muted-foreground font-mono">
                <li className="flex items-center gap-2 text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Custom React / Next.js Web Development</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>WhatsApp API, Stripe &amp; CRM Integrations</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Turnkey Business Registration &amp; Formation</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/services" className="inline-flex items-center justify-center gap-1.5">
                  Explore Services Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Pillar 3: Setupr Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-border/70 bg-card/40 p-6 sm:p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center text-foreground mb-6">
                <Boxes className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Division 03 • Cloud &amp; Subscriptions
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Setupr Cloud
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Direct enterprise SaaS provisioning. Get Google Workspace, Microsoft 365, AWS, and Zoho subscriptions with localized billing, instant onboarding, and support.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-muted-foreground font-mono">
                <li className="flex items-center gap-2 text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Google Workspace &amp; Microsoft 365</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>AWS &amp; Zoho Business Subscriptions</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Unified Invoicing &amp; Setup Assistance</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/store" className="inline-flex items-center justify-center gap-1.5">
                  Browse Cloud Store
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
