import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Terminal, Code2, Globe, Shield, Sparkles, CheckCircle2, Layers, Cpu, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

export const HeroSection = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  const [activeTab, setActiveTab] = useState<"lab" | "architecture" | "setup">("lab");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const heroSubtitle = getSetting(
    "homepage_hero_subtitle", 
    "From open-source AI tools and MCP servers at Setupr Lab (like Blew), to bespoke web engineering, WhatsApp & payment integrations, and turnkey company formation."
  );

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-start overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
      {/* Precision architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_15%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Subtle top ambient warmth (refined, non-harsh) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          {/* Eyebrow Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 mb-6 shadow-sm hover:border-white/[0.15] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-200 font-medium">Setupr Ecosystem</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Autonomous Tech &amp; Digital Infrastructure</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] tracking-tight mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Technology Ecosystem for Modern Founders. <br />
            <span className="gradient-text">Engineered for Autonomy.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroSubtitle}
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              asChild 
              className="rounded-xl px-7 shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Link to="/intake" className="inline-flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="rounded-xl px-6 bg-white/[0.03] border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] text-zinc-200 transition-all"
            >
              <Link to="/lab" className="inline-flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                Explore Setupr Lab
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="lg" 
              asChild 
              className="rounded-xl px-5 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <Link to="/services">
                Services Catalog
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Hero Interactive Centerpiece: The Setupr System Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/[0.1] bg-[#0c0d12]/90 backdrop-blur-2xl shadow-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            {/* Terminal Window Header Bar */}
            <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="ml-2 font-mono text-[11px] text-zinc-500 tracking-wider">SET-SYS // ECOSYSTEM CONSOLE v2.4</span>
              </div>

              {/* Console Tabs */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.05]">
                <button
                  onClick={() => setActiveTab("lab")}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeTab === "lab"
                      ? "bg-white/[0.1] text-zinc-100 border border-white/[0.1] shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Cpu className="w-3 h-3 text-primary" />
                  <span>Setupr Lab (Blew)</span>
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeTab === "architecture"
                      ? "bg-white/[0.1] text-zinc-100 border border-white/[0.1] shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Layers className="w-3 h-3 text-primary" />
                  <span>Web Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab("setup")}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeTab === "setup"
                      ? "bg-white/[0.1] text-zinc-100 border border-white/[0.1] shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Shield className="w-3 h-3 text-primary" />
                  <span>Turnkey Setup</span>
                </button>
              </div>
            </div>

            {/* Console Content Area */}
            <div className="p-6 font-mono text-xs min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeTab === "lab" && (
                  <motion.div
                    key="lab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-white/[0.05]">
                      <span>TARGET: @setupr/blew (Model Context Protocol Autopilot)</span>
                      <span className="text-emerald-400">STATUS: READY</span>
                    </div>
                    <div className="text-zinc-300 space-y-1.5 leading-relaxed">
                      <div className="text-zinc-500">$ npx -y @setupr/blew --mcp-server</div>
                      <div className="text-zinc-400">→ Initializing MCP tool context for Cursor &amp; Claude Desktop...</div>
                      <div className="text-zinc-200">
                        &gt; agent.execute(&quot;<span className="text-amber-400">post_to_social</span>&quot;, &#123; platforms: [&quot;x&quot;, &quot;linkedin&quot;], thread: true &#125;)
                      </div>
                      <div className="text-emerald-400 font-semibold">
                        ✔ Browser session authenticated (zero SaaS dashboard required)
                      </div>
                      <div className="text-zinc-400">
                        ✔ Content dispatched to X and LinkedIn in 420ms.
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "architecture" && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-white/[0.05]">
                      <span>STACK: High-Performance Next.js / Edge Network</span>
                      <span className="text-emerald-400">LATENCY: 28ms</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-zinc-500 text-[10px] uppercase">Engine</div>
                        <div className="text-zinc-200 font-bold mt-1">Edge CDN &amp; SSR</div>
                        <div className="text-emerald-400 text-[10px] mt-1">99.99% Uptime</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-zinc-500 text-[10px] uppercase">Integrations</div>
                        <div className="text-zinc-200 font-bold mt-1">WhatsApp &amp; Stripe</div>
                        <div className="text-emerald-400 text-[10px] mt-1">Direct Webhooks</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-zinc-500 text-[10px] uppercase">Automation</div>
                        <div className="text-zinc-200 font-bold mt-1">AI Ingest Bot</div>
                        <div className="text-emerald-400 text-[10px] mt-1">Active Pipeline</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "setup" && (
                  <motion.div
                    key="setup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-white/[0.05]">
                      <span>FORMATION: Global Corporate &amp; Legal Readiness</span>
                      <span className="text-emerald-400">VERIFIED</span>
                    </div>
                    <div className="space-y-2 text-zinc-300 pt-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Entity Selection (Pvt Ltd, LLP, LLC, Sole Proprietorship)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tax Identification, Corporate Bylaws &amp; Operating Agreements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Corporate Banking &amp; Merchant Gateway Readiness</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Console Footer */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Ecosystem Telemetry Operational
                </span>
                <Link to="/lab" className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                  Read Technical Docs <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
