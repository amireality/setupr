import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Terminal, Code2, Globe, Shield, Sparkles, CheckCircle2, Layers, Cpu, ExternalLink, Play, Check, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

export const HeroSection = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  const [activeTab, setActiveTab] = useState<"lab" | "architecture" | "setup">("lab");
  const [simulatedPostStatus, setSimulatedPostStatus] = useState<"idle" | "posting" | "posted">("idle");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const handleSimulatePost = () => {
    setSimulatedPostStatus("posting");
    setTimeout(() => {
      setSimulatedPostStatus("posted");
      setTimeout(() => setSimulatedPostStatus("idle"), 4000);
    }, 1200);
  };

  const heroSubtitle = getSetting(
    "homepage_hero_subtitle", 
    "From open-source AI tools and MCP servers at Setupr Lab (like Blew), to bespoke web engineering, WhatsApp & payment integrations, and turnkey company formation."
  );

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-start overflow-hidden pt-32 md:pt-38 pb-20 md:pb-28">
      {/* 3D Marquee Dynamic Background (Retained & Elevated) */}
      <div className="absolute inset-0 overflow-hidden opacity-35 pointer-events-none z-0">
        <ThreeDMarquee />
      </div>

      {/* Radial and bottom gradient overlays to blend the 3D plane smoothly */}
      <div className="absolute inset-0 bg-background/55 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_25%,transparent_30%,#090a0d_100%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/80 to-transparent pointer-events-none z-0" />

      {/* Precision architectural background micro-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_15%,#000_70%,transparent_100%)] pointer-events-none z-0" />

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
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center"
                  >
                    {/* Left: Terminal & MCP Execution */}
                    <div className="lg:col-span-6 space-y-3">
                      <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-white/[0.06]">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Terminal className="w-3.5 h-3.5 text-primary" />
                          <span>mcp://blew.setupr.local:3000</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                          SOCKET ACTIVE
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-[11px] space-y-1.5">
                        <div className="text-zinc-500">$ blew publish --target all</div>
                        <div className="text-zinc-400">→ Authenticating Chrome cookie jar... <span className="text-emerald-400">OK</span></div>
                        <div className="text-primary">&gt; Dispatching multi-platform thread...</div>
                        <div className="text-zinc-400 text-[10px]">
                          Payload: &quot;Autonomous agents now operate social channels without dashboard logins.&quot;
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={handleSimulatePost}
                          disabled={simulatedPostStatus !== "idle"}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                            simulatedPostStatus === "posted"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                          }`}
                        >
                          {simulatedPostStatus === "posting" ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Dispatching...</span>
                            </>
                          ) : simulatedPostStatus === "posted" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Dispatched in 380ms!</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current" />
                              <span>Simulate AI Dispatch</span>
                            </>
                          )}
                        </button>
                        <span className="text-[11px] text-zinc-500 font-mono">Zero dashboard logins required</span>
                      </div>
                    </div>

                    {/* Right: Realistic Live Social Post Visual Card */}
                    <div className="lg:col-span-6">
                      <div className="rounded-xl border border-white/[0.08] bg-[#0e1017] p-4 relative shadow-xl overflow-hidden group">
                        {/* Status bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                              S
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1">
                                <span>Setupr Lab</span>
                                <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                              </div>
                              <div className="text-[10px] text-zinc-500">@setuprhq · Just now</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                            X &amp; LinkedIn Live
                          </span>
                        </div>

                        {/* Post content */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                          Shipped our autonomous MCP social autopilot today. AI agents can now syndicate verified announcements straight from IDE to timeline with zero dashboard friction. ⚡
                        </p>

                        {/* Interactive Engagement Counters */}
                        <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                          <span className="hover:text-primary transition-colors flex items-center gap-1">
                            💬 <span>24</span>
                          </span>
                          <span className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                            🔁 <span>142</span>
                          </span>
                          <span className="hover:text-red-400 transition-colors flex items-center gap-1">
                            ❤️ <span>890</span>
                          </span>
                          <span className="text-zinc-600">
                            👁️ <span>12.4k views</span>
                          </span>
                        </div>
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
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-white/[0.05]">
                      <span className="font-mono">LIVE ARCHITECTURE CANVAS // REAL-TIME EVENT STREAM</span>
                      <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        GLOBAL TTFB: 22ms
                      </span>
                    </div>

                    {/* Visual Animated Pipeline Graph */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative py-2">
                      {/* Node 1: Client */}
                      <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] hover:border-white/[0.18] transition-all relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-zinc-500">ORIGIN</span>
                          <Globe className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="text-xs font-bold text-zinc-200">React 18 / Next.js</div>
                        <div className="text-[10px] text-zinc-500 mt-1">Client Viewport</div>
                        <div className="mt-2 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded w-fit">
                          Hydrated 0.2s
                        </div>
                      </div>

                      {/* Node 2: Cloudflare Edge */}
                      <div className="p-3.5 rounded-xl bg-[#0e1017] border border-primary/30 hover:border-primary/50 transition-all relative overflow-hidden group shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-primary">EDGE CDN</span>
                          <Cpu className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="text-xs font-bold text-zinc-200">Global Edge Routing</div>
                        <div className="text-[10px] text-zinc-400 mt-1">310+ PoPs worldwide</div>
                        <div className="mt-2 text-[10px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded w-fit">
                          28ms Latency
                        </div>
                      </div>

                      {/* Node 3: Stripe API */}
                      <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] hover:border-white/[0.18] transition-all relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-zinc-500">PAYMENTS</span>
                          <Shield className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <div className="text-xs font-bold text-zinc-200">Stripe &amp; Gateways</div>
                        <div className="text-[10px] text-zinc-500 mt-1">Instant Webhooks</div>
                        <div className="mt-2 text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded w-fit">
                          256-bit TLS
                        </div>
                      </div>

                      {/* Node 4: WhatsApp Automation */}
                      <div className="p-3.5 rounded-xl bg-[#0e1017] border border-emerald-500/30 hover:border-emerald-500/50 transition-all relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-emerald-400">DISPATCHER</span>
                          <Send className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="text-xs font-bold text-zinc-200">WhatsApp Cloud API</div>
                        <div className="text-[10px] text-zinc-500 mt-1">Instant notifications</div>
                        <div className="mt-2 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded w-fit">
                          Automated Bot
                        </div>
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
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center"
                  >
                    {/* Left: Interactive Corporate Certificate Card */}
                    <div className="lg:col-span-7">
                      <div className="rounded-xl border border-white/[0.1] bg-gradient-to-br from-[#12141c] via-[#0d0e14] to-[#090a0d] p-4 sm:p-5 relative overflow-hidden shadow-2xl">
                        {/* Holographic metallic header seal */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1px]">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-amber-400">
                                ★
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-zinc-100 uppercase tracking-wide">Corporate Formation Charter</div>
                              <div className="text-[9px] font-mono text-zinc-500">REGISTRATION CERTIFICATE #SET-2026</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            GOVT APPROVED
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <span className="text-[10px] text-zinc-500 font-mono block">ENTITY TYPE</span>
                            <span className="font-semibold text-zinc-200">Private Limited / LLC</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <span className="text-[10px] text-zinc-500 font-mono block">JURISDICTION</span>
                            <span className="font-semibold text-zinc-200">Global &amp; India MCA</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.06]">
                          <span>DIN, DSC, PAN, TAN &amp; BANK READINESS INCLUDED</span>
                          <span className="text-primary font-semibold">100% Guaranteed</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Checklist Telemetry */}
                    <div className="lg:col-span-5 space-y-2 text-xs font-mono text-zinc-300">
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Class 3 Digital Signatures Issued</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Ministry Name Approval Reserved</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Corporate Current Bank Account Provisioned</span>
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
