import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type Announcement = {
  id: string;
  label: string;
  text: string;
  cta: string;
  href: string;
};

const announcements: Announcement[] = [
  {
    id: "brain",
    label: "New",
    text: "Give ChatGPT and Claude infinite memory. Discover the SetuprAI Brain MCP",
    cta: "Discover",
    href: "https://mcp.setupr.com",
  },
  {
    id: "extension",
    label: "New",
    text: "Introducing the SetuprAI Chrome Extension: Refine your prompts before you send them, right on top of your AI agents.",
    cta: "Install now",
    href: "https://chromewebstore.google.com/detail/setuprai/noeomffmnjlmdiolapemafcoabgenong",
  },
];

const AnnouncementBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const item = announcements[index];

  return (
    <div className="relative overflow-hidden border-b border-primary/15 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
      <div className="container px-4 md:px-6">
        <div className="relative flex h-10 items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            <motion.a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(item.href, "_blank", "noopener,noreferrer");
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group flex min-w-0 items-center gap-2 text-[11px] sm:text-xs md:text-sm text-foreground/90 hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                <Sparkles className="h-3 w-3" />
                {item.label}
              </span>
              <span className="truncate">{item.text}</span>
              <span className="hidden shrink-0 items-center gap-1 font-medium text-primary sm:inline-flex">
                {item.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary sm:hidden" />
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
