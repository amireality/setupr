import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Layers, Boxes, ArrowRight, Sparkles, ExternalLink, Bot, Code2, Globe, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EcosystemSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-y border-white/[0.06] bg-[#090a0d]/60">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>THE SETUPR ECOSYSTEM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4 text-balance"
          >
            One Unified Architecture. Three Strategic <span className="gradient-text">Divisions</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-400 leading-relaxed text-balance"
          >
            Just as modern tech ecosystems operate distinct research and commercial arms, Setupr scales your venture through three specialized, interoperable divisions.
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
            className="rounded-2xl border border-white/[0.12] bg-[#141726]/90 hover:bg-[#171b2d] hover:border-white/[0.22] p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(245,158,11,0.08)]"
          >
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono font-medium text-zinc-300 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>FLAGSHIP: BLEW</span>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Cpu className="w-5 h-5" />
              </div>

              <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-2">
                Division 01 • Products &amp; R&amp;D
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Setupr Lab
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Our autonomous software lab. Home to <strong className="text-zinc-100 font-semibold">Blew by Setupr</strong> (the zero-dashboard social media autopilot for AI agents), Model Context Protocol (MCP) servers, and open-source founder toolkits.
              </p>

              {/* Visual Micro Product Artifact */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs mb-5 space-y-1">
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>BLEW MCP SERVER</span>
                  <span className="text-emerald-400 font-mono">● LIVE RUNTIME</span>
                </div>
                <div className="text-zinc-200 font-semibold flex items-center justify-between pt-0.5">
                  <span>Autonomous Multi-Platform Engine</span>
                  <span className="text-primary text-[10px] font-mono">INSTANT SYNC</span>
                </div>
                <div className="text-[10px] text-zinc-400">Direct syndication across X, LinkedIn &amp; Threads</div>
              </div>

              <ul className="space-y-2 mb-6 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span>Blew MCP Server &amp; Chrome Extension</span>
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                  <span>Agent-to-Social Autopilots (X &amp; LinkedIn)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Open-source developer utilities</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <Button variant="hero" size="sm" asChild className="rounded-lg shadow-sm">
                <Link to="/lab" className="inline-flex items-center gap-1.5">
                  Enter Setupr Lab
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <a 
                href="https://github.com/amireality/blew-by-setupr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1 transition-colors"
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
            className="rounded-2xl border border-white/[0.12] bg-[#141726]/90 hover:bg-[#171b2d] hover:border-white/[0.22] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(99,102,241,0.08)]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-200 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Layers className="w-5 h-5 text-primary" />
              </div>

              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Division 02 • Digital Solutions
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Setupr Services
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                End-to-end digital infrastructure for modern businesses. Custom website engineering, WhatsApp &amp; payment gateway integrations, CRM workflows, and global company setup.
              </p>

              {/* Visual Micro Architecture Artifact */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs mb-5 space-y-1">
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>EDGE ARCHITECTURE</span>
                  <span className="text-primary font-mono font-bold">22ms TTFB</span>
                </div>
                <div className="text-zinc-200 flex items-center gap-2 pt-0.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>React 18 + Stripe + WhatsApp Bot</span>
                </div>
                <div className="text-[10px] text-zinc-400">Live webhook synchronization</div>
              </div>

              <ul className="space-y-2 mb-6 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Custom React / Next.js Web Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>WhatsApp API, Stripe &amp; CRM Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Turnkey Business Registration &amp; Formation</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <Button variant="outline" size="sm" asChild className="w-full rounded-lg bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] text-zinc-200">
                <Link to="/services" className="inline-flex items-center justify-center gap-1.5">
                  Explore Services Catalog
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Pillar 3: Setupr Automations */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/[0.12] bg-[#141726]/90 hover:bg-[#171b2d] hover:border-white/[0.22] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(16,185,129,0.08)]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-200 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Workflow className="w-5 h-5 text-primary" />
              </div>

              <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Division 03 • AI &amp; Workflow Systems
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Setupr Automations
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Automated operations for modern scale. Custom WhatsApp bots, automated payment reconciliation, multi-app CRM sync, and AI assistants.
              </p>

              {/* Visual Micro Automation Artifact */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs mb-5 space-y-1">
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>AUTOMATION ENGINE</span>
                  <span className="text-emerald-400 font-mono font-semibold">● 24/7 ACTIVE</span>
                </div>
                <div className="text-zinc-200 flex items-center justify-between pt-0.5 font-medium">
                  <span>Webhook → AI Triage → WhatsApp</span>
                  <span className="text-primary text-[10px] font-mono font-bold">0ms DELAY</span>
                </div>
                <div className="text-[10px] text-zinc-400">Autonomous workflow orchestration</div>
              </div>

              <ul className="space-y-2 mb-6 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>WhatsApp Cloud API &amp; Customer Bots</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Stripe &amp; Payment Gateway Automations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Custom CRM Pipelines &amp; Lead Ingestion</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <Button variant="outline" size="sm" asChild className="w-full rounded-lg bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] text-zinc-200">
                <Link to="/services" className="inline-flex items-center justify-center gap-1.5">
                  Explore Automations
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
