import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Cpu, 
  Globe, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Play, 
  Check, 
  Send, 
  MessageSquare, 
  Heart, 
  Repeat, 
  Share2, 
  Zap, 
  Smartphone,
  CreditCard,
  Building2,
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

export const HeroSection = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  const [activeTab, setActiveTab] = useState<"blew" | "commerce" | "formation">("blew");
  
  // Interactive state for Tab 1 (Blew Social Studio)
  const [blewStatus, setBlewStatus] = useState<"idle" | "dispatching" | "dispatched">("idle");
  const [likes, setLikes] = useState<number>(342);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [reposts, setReposts] = useState<number>(68);
  const [hasReposted, setHasReposted] = useState<boolean>(false);

  // Interactive state for Tab 2 (Web & WhatsApp Commerce)
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "processing" | "confirmed">("idle");

  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const handleDispatchBlew = () => {
    setBlewStatus("dispatching");
    setTimeout(() => {
      setBlewStatus("dispatched");
      setTimeout(() => setBlewStatus("idle"), 5000);
    }, 1100);
  };

  const handleSimulateCheckout = () => {
    setCheckoutStatus("processing");
    setTimeout(() => {
      setCheckoutStatus("confirmed");
      setTimeout(() => setCheckoutStatus("idle"), 6000);
    }, 1200);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(l => l + 1);
      setHasLiked(true);
    } else {
      setLikes(l => l - 1);
      setHasLiked(false);
    }
  };

  const handleRepost = () => {
    if (!hasReposted) {
      setReposts(r => r + 1);
      setHasReposted(true);
    } else {
      setReposts(r => r - 1);
      setHasReposted(false);
    }
  };

  const heroSubtitle = getSetting(
    "homepage_hero_subtitle", 
    "From autonomous AI tools and MCP servers at Setupr Lab (like Blew), to high-speed web engineering, WhatsApp & payment integrations, and turnkey company formation."
  );

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-start overflow-hidden pt-32 md:pt-36 pb-20 md:pb-28">
      {/* 3D Marquee Dynamic Background (Retained & Ambiently Lit) */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none z-0">
        <ThreeDMarquee />
      </div>

      {/* Atmospheric multi-chromatic glow fields */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-primary/15 via-indigo-500/10 to-amber-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Radial and bottom gradient overlays to blend the 3D plane smoothly */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_20%,transparent_35%,hsl(var(--background))_100%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none z-0" />

      {/* Precision architectural background micro-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_15%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          {/* Eyebrow Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.09] text-xs font-mono text-zinc-300 mb-6 shadow-sm hover:border-white/[0.2] transition-colors"
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
              className="rounded-xl px-6 bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.22] text-zinc-200 transition-all"
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
              className="rounded-xl px-5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
            >
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Hero Interactive Centerpiece: Setupr Studio (Intuitive, Visual & User-Friendly) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/[0.12] bg-[#121522]/90 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(245,158,11,0.08)] overflow-hidden">
            {/* Studio Header Bar */}
            <div className="px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-1" />
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-[10px] font-bold">
                    S
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 tracking-wide">
                    Setupr Studio
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
                    v3.2 Live
                  </span>
                </div>
              </div>

              {/* Intuitive Visual Studio Tabs */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/[0.06]">
                <button
                  onClick={() => setActiveTab("blew")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                    activeTab === "blew"
                      ? "bg-white/[0.12] text-white border border-white/[0.12] shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Blew Social Studio</span>
                </button>
                <button
                  onClick={() => setActiveTab("commerce")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                    activeTab === "commerce"
                      ? "bg-white/[0.12] text-white border border-white/[0.12] shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Web &amp; WhatsApp</span>
                </button>
                <button
                  onClick={() => setActiveTab("formation")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                    activeTab === "formation"
                      ? "bg-white/[0.12] text-white border border-white/[0.12] shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Company Launch</span>
                </button>
              </div>
            </div>

            {/* Studio Canvas Area */}
            <div className="p-5 md:p-7 min-h-[310px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* TAB 1: Blew Social Studio (Consumer-Friendly Creator Visuals) */}
                {activeTab === "blew" && (
                  <motion.div
                    key="blew"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left: Visual Content Autopilot Composer */}
                    <div className="lg:col-span-6 space-y-4">
                      {/* Active Channels Selector */}
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Target Channels</span>
                          <span className="text-emerald-400 font-mono text-[10px]">● 3 CONNECTED</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] border border-white/[0.1] text-zinc-200 flex items-center gap-1.5">
                            <span className="text-sky-400 font-bold">𝕏</span> Twitter / X
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] border border-white/[0.1] text-zinc-200 flex items-center gap-1.5">
                            <span className="text-blue-500 font-bold">in</span> LinkedIn
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] border border-white/[0.1] text-zinc-200 flex items-center gap-1.5">
                            <span className="text-purple-400 font-bold">✦</span> Threads
                          </span>
                        </div>
                      </div>

                      {/* Visual Prompt Card */}
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span>AI Campaign Prompt</span>
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">Tone: Founder Impact</span>
                        </div>
                        <p className="text-xs text-zinc-200 leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                          &ldquo;Autonomous agents now operate social channels with zero dashboard friction. Shipped the new Blew MCP server today.&rdquo;
                        </p>
                      </div>

                      {/* Interactive Dispatch Trigger */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          onClick={handleDispatchBlew}
                          disabled={blewStatus !== "idle"}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                            blewStatus === "dispatched"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_16px_-4px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                          }`}
                        >
                          {blewStatus === "dispatching" ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Syndicating Across Networks...</span>
                            </>
                          ) : blewStatus === "dispatched" ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span>Published across 3 platforms in 340ms!</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 fill-current" />
                              <span>Test One-Click Syndication</span>
                            </>
                          )}
                        </button>
                        <span className="text-[11px] text-zinc-500">No manual copy-pasting</span>
                      </div>
                    </div>

                    {/* Right: Realistic High-Fidelity Social Preview Card */}
                    <div className="lg:col-span-6">
                      <div className="rounded-xl border border-white/[0.1] bg-gradient-to-b from-[#181c2c] to-[#121522] p-4.5 relative shadow-xl overflow-hidden group">
                        {/* Profile header */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-amber-600 p-[1px] shadow-sm">
                              <div className="w-full h-full rounded-xl bg-zinc-950 flex items-center justify-center text-primary font-bold text-sm">
                                S
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                                <span>Setupr Lab</span>
                                <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">
                                  ✓
                                </span>
                              </div>
                              <div className="text-[11px] text-zinc-400">@setuprhq · Just now</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Multi-Stream Live
                          </span>
                        </div>

                        {/* Post content */}
                        <p className="text-xs text-zinc-200 leading-relaxed mb-3">
                          Shipped our autonomous MCP social autopilot today. AI agents can now syndicate verified announcements straight from the editor with zero dashboard friction. ⚡
                        </p>

                        {/* Visual Media Attachment Mockup */}
                        <div className="rounded-lg bg-black/40 border border-white/[0.06] p-2.5 mb-3.5 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-zinc-200 truncate">blew.setupr.com • Open Source Tool</div>
                            <div className="text-[10px] text-zinc-400">Autonomous multi-channel distribution for modern creators</div>
                          </div>
                        </div>

                        {/* Interactive Engagement Counters (Clickable!) */}
                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                          <button 
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 transition-colors ${
                              hasLiked ? "text-rose-400 font-semibold" : "hover:text-rose-400"
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-current" : ""}`} />
                            <span>{likes}</span>
                          </button>
                          <button 
                            onClick={handleRepost}
                            className={`flex items-center gap-1.5 transition-colors ${
                              hasReposted ? "text-emerald-400 font-semibold" : "hover:text-emerald-400"
                            }`}
                          >
                            <Repeat className="w-3.5 h-3.5" />
                            <span>{reposts}</span>
                          </button>
                          <span className="flex items-center gap-1.5 text-zinc-500">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>24</span>
                          </span>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            14.2k views
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: Web & WhatsApp Commerce Flow */}
                {activeTab === "commerce" && (
                  <motion.div
                    key="commerce"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left: Customer Instant Web Checkout */}
                    <div className="lg:col-span-6 space-y-4">
                      <div className="rounded-xl border border-white/[0.1] bg-black/40 p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.06]">
                          <span className="font-semibold text-zinc-200">Instant Customer Checkout</span>
                          <span className="text-emerald-400 font-mono text-[10px]">256-BIT ENCRYPTED</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-medium text-zinc-100">Global Launch Plan</div>
                            <div className="text-[10px] text-zinc-400">Edge Web + WhatsApp Integration</div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-zinc-100">$49</span>
                            <span className="text-[10px] text-zinc-500 block">one-time</span>
                          </div>
                        </div>

                        <button
                          onClick={handleSimulateCheckout}
                          disabled={checkoutStatus !== "idle"}
                          className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                            checkoutStatus === "confirmed"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-emerald-500 text-black hover:bg-emerald-400 font-bold shadow-md"
                          }`}
                        >
                          {checkoutStatus === "processing" ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              <span>Authorizing &amp; Firing Webhook...</span>
                            </>
                          ) : checkoutStatus === "confirmed" ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span>Order Processed &amp; WhatsApp Alert Sent!</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Simulate Customer Order ($49)</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Instant Webhook triggered → WhatsApp bot replies in 120ms</span>
                      </div>
                    </div>

                    {/* Right: Simulated Mobile WhatsApp Business Screen */}
                    <div className="lg:col-span-6">
                      <div className="rounded-2xl border border-white/[0.12] bg-[#0c1317] p-3.5 shadow-2xl relative max-w-sm mx-auto">
                        {/* Mobile WhatsApp Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                              <Smartphone className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-zinc-100 flex items-center gap-1">
                                <span>Setupr Concierge</span>
                                <span className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-white">✓</span>
                              </div>
                              <div className="text-[10px] text-emerald-400">Official Business Account</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">WhatsApp Cloud</span>
                        </div>

                        {/* Chat Messages */}
                        <div className="space-y-2.5 text-xs py-1">
                          <div className="bg-[#1f2c34] p-3 rounded-xl rounded-tl-none border border-white/[0.04] text-zinc-200 space-y-1.5 shadow-sm">
                            <p className="leading-relaxed">
                              Hey Alex! 👋 Your order is confirmed. Your custom domain &amp; edge deployment are live at <span className="text-emerald-400 font-mono">alex.setupr.app</span>
                            </p>
                            <div className="text-[9px] text-zinc-400 text-right">10:42 AM · Delivered</div>
                          </div>

                          <div className="bg-[#1f2c34] p-2.5 rounded-xl border border-white/[0.04] space-y-2">
                            <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Live Status: Webhooks Connected</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                              <div className="p-1.5 rounded bg-black/30 text-zinc-300">
                                <span className="text-zinc-500 block">PAYMENT</span>
                                <span>Stripe Webhook OK</span>
                              </div>
                              <div className="p-1.5 rounded bg-black/30 text-zinc-300">
                                <span className="text-zinc-500 block">HOSTING</span>
                                <span>Cloudflare Edge Active</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: Turnkey Company Launch (Executive Founder Credentials) */}
                {activeTab === "formation" && (
                  <motion.div
                    key="formation"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left: Luxury Corporate Charter Seal */}
                    <div className="lg:col-span-7">
                      <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-[#1c1a16] via-[#14151e] to-[#0e1017] p-5 relative overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1.5px] shadow-sm">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-amber-400">
                                ★
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-zinc-100 uppercase tracking-wide">
                                Corporate Charter &amp; Formation
                              </div>
                              <div className="text-[10px] font-mono text-zinc-400">
                                JURISDICTION // DELAWARE LLC &amp; INDIA PVT LTD
                              </div>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            GOVT VERIFIED
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs mb-3.5">
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-[10px] text-zinc-400 block mb-0.5">ENTITY RECOGNITION</span>
                            <span className="font-semibold text-zinc-100">100% Legitimacy Guaranteed</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-[10px] text-zinc-400 block mb-0.5">DIGITAL SIGNATURES</span>
                            <span className="font-semibold text-zinc-100">Class 3 DSC Included</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/[0.06]">
                          <span>PAN, TAN, Bank Account &amp; Compliance Handled</span>
                          <span className="text-primary font-semibold">Turnkey Delivery</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Telemetry Milestones */}
                    <div className="lg:col-span-5 space-y-2.5 text-xs text-zinc-300">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-medium text-zinc-200">Name Approval Clearance</div>
                          <div className="text-[10px] text-zinc-400">Guaranteed reservation</div>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-medium text-zinc-200">Articles of Incorporation</div>
                          <div className="text-[10px] text-zinc-400">Full corporate structuring</div>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-medium text-zinc-200">Business Bank Account</div>
                          <div className="text-[10px] text-zinc-400">Immediate debit card issuance</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Studio Footer Status */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Setupr Ecosystem Active Worldwide</span>
                </span>
                <Link to="/services" className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 font-medium">
                  Browse All 3 Pillars <ArrowRight className="w-3.5 h-3.5" />
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
