import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Terminal, 
  Cpu, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  MessageSquare,
  Lock,
  Smartphone,
  CreditCard,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const InteractiveTechShowcase = () => {
  const [activeDemo, setActiveDemo] = useState<"social-autopilot" | "web-payments" | "formation">("social-autopilot");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    
    setTimeout(() => {
      setSimulationStep(2);
      setTimeout(() => {
        setSimulationStep(3);
        setTimeout(() => {
          setIsSimulating(false);
        }, 1500);
      }, 1000);
    }, 1000);
  };

  return (
    <section className="py-20 md:py-28 relative bg-[#090a0d] border-t border-white/[0.06] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Interactive Architecture Showcase</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Don&apos;t just read about it. <span className="gradient-text">Watch it execute</span>.
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Explore how Setupr&apos;s autonomous AI tools, web infrastructure, and corporate pipelines operate in real time.
            </p>

            {/* Interactive Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-[#0c0d12] border border-white/[0.08] rounded-2xl w-fit mx-auto shadow-xl">
              <button
                onClick={() => { setActiveDemo("social-autopilot"); setSimulationStep(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeDemo === "social-autopilot"
                    ? "bg-white/[0.1] text-white border border-white/[0.12] shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-primary" />
                <span>01. Blew Social Autopilot (MCP)</span>
              </button>
              <button
                onClick={() => { setActiveDemo("web-payments"); setSimulationStep(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeDemo === "web-payments"
                    ? "bg-white/[0.1] text-white border border-white/[0.12] shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>02. Web + Stripe + WhatsApp Flow</span>
              </button>
              <button
                onClick={() => { setActiveDemo("formation"); setSimulationStep(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeDemo === "formation"
                    ? "bg-white/[0.1] text-white border border-white/[0.12] shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>03. Turnkey Digital Formation</span>
              </button>
            </div>
          </div>

          {/* Interactive Visual Canvas Container */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#0c0d12]/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Top window chrome */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="ml-2 font-mono text-[11px] text-zinc-500">
                  {activeDemo === "social-autopilot" && "AGENT_WORKSPACE // BLEW_MCP_AUTOPILOT"}
                  {activeDemo === "web-payments" && "RUNTIME // EDGE_EVENT_DISPATCHER"}
                  {activeDemo === "formation" && "LEGAL_CORE // MCA_CORPORATE_VAULT"}
                </span>
              </div>

              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Visual Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* DEMO 1: BLEW SOCIAL AUTOPILOT */}
            {activeDemo === "social-autopilot" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: AI Prompt / MCP Socket */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs space-y-3">
                    <div className="text-zinc-500 flex items-center justify-between">
                      <span>cursor / claude_desktop</span>
                      <span className="text-emerald-400 text-[10px]">● CONNECTED</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                      <span className="text-primary font-bold">User:</span> &quot;Draft a high-signal launch announcement for Blew by Setupr and post it to X &amp; LinkedIn.&quot;
                    </div>
                    <div className="text-zinc-400 space-y-1 text-[11px]">
                      <div>&gt; Invoking tool: <span className="text-amber-400">mcp_blew_publish</span></div>
                      <div>&gt; Bypassing API paywall via session cookies... <span className="text-emerald-400">OK</span></div>
                      <div>&gt; Output: Post #8942 queued for timeline</div>
                    </div>
                  </div>

                  {/* Execution Progress Bar */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>MCP Payload Status</span>
                      <span className="text-primary">{simulationStep >= 2 ? "100% Dispatched" : isSimulating ? "Dispatching 60%..." : "Idle (Ready)"}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        animate={{ width: simulationStep >= 2 ? "100%" : isSimulating ? "60%" : "20%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Center: Animated Connecting Beams */}
                <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-zinc-500 font-mono text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span>MCP Pipe</span>
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <span className="text-[9px] text-zinc-600">320ms</span>
                  </div>
                </div>

                {/* Right: Live Interactive Social Preview */}
                <div className="lg:col-span-5">
                  <motion.div 
                    className="rounded-2xl border border-white/[0.1] bg-[#0e1017] p-5 shadow-2xl relative overflow-hidden"
                    animate={simulationStep === 2 ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                          S
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-zinc-100 flex items-center gap-1">
                            <span>Setupr HQ</span>
                            <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">✓</span>
                          </div>
                          <div className="text-[11px] text-zinc-500">@setuprhq · Automated via Blew MCP</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        LIVE TIMELINE
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-4">
                      🚀 Shipped Blew by Setupr: Zero-dashboard social autopilot for AI agents. Run `npx -y @setupr/blew` inside Claude Desktop or Cursor and never open another scheduler tab again.
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">❤️ <strong className="text-white">1,420</strong> Likes</span>
                      <span className="flex items-center gap-1.5">🔁 <strong className="text-white">384</strong> Reposts</span>
                      <span className="flex items-center gap-1.5">💬 <strong className="text-white">82</strong> Replies</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* DEMO 2: WEB + STRIPE + WHATSAPP */}
            {activeDemo === "web-payments" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step A: Customer Web Checkout */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#0e1017] p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-zinc-500">STEP 01</span>
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-bold text-sm text-zinc-100 mb-1">Web Platform &amp; Checkout</h4>
                      <p className="text-xs text-zinc-400 mb-4">Customer initiates order on modern React / Next.js storefront.</p>
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono space-y-1">
                        <div className="text-zinc-500">Order: #SET-8821</div>
                        <div className="text-zinc-200">Amount: ₹14,999</div>
                        <div className="text-emerald-400 text-[10px]">Edge Hydration: 24ms</div>
                      </div>
                    </div>
                  </div>

                  {/* Step B: Stripe Payment Gateway */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#0e1017] p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-zinc-500">STEP 02</span>
                        <CreditCard className="w-4 h-4 text-indigo-400" />
                      </div>
                      <h4 className="font-bold text-sm text-zinc-100 mb-1">Stripe Webhook Sync</h4>
                      <p className="text-xs text-zinc-400 mb-4">Instant payment settlement &amp; cryptographic webhook verification.</p>
                      <div className="p-3 rounded-lg bg-indigo-500/[0.05] border border-indigo-500/20 text-xs font-mono space-y-1">
                        <div className="text-indigo-300">event: payment_intent.succeeded</div>
                        <div className="text-emerald-400 text-[10px]">Signature: Validated 100%</div>
                        <div className="text-zinc-500 text-[10px]">Auto-ledger: Updated</div>
                      </div>
                    </div>
                  </div>

                  {/* Step C: Automated WhatsApp Dispatch */}
                  <div className="rounded-xl border border-emerald-500/20 bg-[#0e1017] p-5 flex flex-col justify-between shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-emerald-400">STEP 03</span>
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="font-bold text-sm text-zinc-100 mb-1">WhatsApp Cloud Bot</h4>
                      <p className="text-xs text-zinc-400 mb-4">Instant confirmation alert delivered directly to customer WhatsApp.</p>
                      <div className="p-3 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/25 text-xs text-emerald-300 space-y-1">
                        <div className="font-bold">WhatsApp Business:</div>
                        <div className="text-[11px] leading-relaxed text-zinc-200">
                          &quot;Hi Rahul! Your setup order #SET-8821 is confirmed. Your digital blueprint is ready.&quot;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 3: TURNKEY DIGITAL FORMATION */}
            {activeDemo === "formation" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Holographic Digital Certificate Mockup */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#131622] via-[#0d0e14] to-[#08090c] p-6 relative shadow-2xl overflow-hidden">
                    {/* Security watermark */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-[1.5px] shadow-lg">
                          <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-amber-400 text-xs">
                            MCA
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white tracking-wide uppercase">Certificate of Incorporation</div>
                          <div className="text-[10px] font-mono text-zinc-400">MINISTRY OF CORPORATE AFFAIRS // VERIFIED REGISTRY</div>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                        ACTIVE ENTITY
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-[10px] text-zinc-500 font-mono block">COMPANY NAME</span>
                        <span className="font-bold text-zinc-100 text-sm">SETUPR TECH PRIVATE LIMITED</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-[10px] text-zinc-500 font-mono block">CORPORATE ID (CIN)</span>
                        <span className="font-bold text-zinc-100 font-mono">U72900DL2026PTC392810</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400 pt-3 border-t border-white/[0.06]">
                      <div>PAN: <strong className="text-white">AAACS9821P</strong></div>
                      <div>TAN: <strong className="text-white">DELC19283E</strong></div>
                      <div>BANK: <strong className="text-emerald-400">READY</strong></div>
                    </div>
                  </div>
                </div>

                {/* Right: Milestone Flow */}
                <div className="lg:col-span-5 space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-zinc-200">Class 3 Digital Signatures (DSC)</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">Day 1</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-zinc-200">Director Identification (DIN)</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">Day 2</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-zinc-200">SPICe+ Incorporation Filing</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">Day 4</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-emerald-500/30 flex items-center justify-between bg-emerald-500/[0.02]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-white font-semibold">Corporate Bank Account &amp; PAN/TAN</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Issued</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
