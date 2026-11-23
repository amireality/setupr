import { useEffect, useState } from "react";

const ROBOTS_TXT_CONTENT = `#                                       -dmNNmh-
#  -shhhhhdddddmmmmmmmmdo             :hNNNNNNNNmy-
# dNNNNNNNNNNNNNNNNNNNNNNs           yNNNNNNNNNNNNNms:
# NNNNNNNNNNNNNNNNNNNNNNNd         smNNNNNNNNNNNNNNNNNdo
# mNNNNNNNNNNNNNNNNNNNNNNm       omNNNNNNNNNNNNNNNNNNNNNmd+
# mNNNNNNNNNNNNNNNNNNNNNNm     +mNNNNNNNNNNNNNNNNNNNNNNNNNNm
# hNNNNNNNNNNNNNNNNNNNNNNm    hNNNNNNNNNNNNNNNNNNNNNNNNNNNNm
# yNNNNNNNNNNNNNNNNNNNNNNN:   dNNNNNNNNNNNNNNNNNNNNNNNNNNNy
# sNNNNNNNNNNNNNNNNNNNNNNN-    smNNNNNNNNNNNNNNNNNNNNNNNh:
# oNNNNNNNNNNNNNNNNNNNNNNN+      -ymNNNNNNNNNNNNNNNNNNd-
#  mNNNNNNNNNNNNNNNNNNNNNd          -ymNNNNNNNNNNNNNd+
#   shddhhhhhyyyyyssssoo:              +hmNNNNNNNNmo
#                           -+oyhdhy+     ohmNNmmo
#                 -+osydmmmNNNNNNNNNNy       ::
#              smmNNNNNNNNNNNNNNNNNNNN:
#             oNNNNNNNNNNNNNNNNNNNNNNNd
#             :mNNNNNNNNNNNNNNNNNNNNNNN+
#              sNNNNNNNNNNNNNNNNNNNNNNNm
#               mNNNNNNNNNNNNNNNNNNNNNNNo
#               oNNNNNNNNNNNNNNNNNNNNNNNm
#                mNNNNNNNNNNNNNNNNNNNNNNNo
#                +NNNNNNNNNNNNNNNNNNNNNNm:
#                 dNNNNNNNNNNNNNmmmdhso-
#                  hmNNNmmdyso+:
#
# ==============================================================================
#  SETUPR TECHNOLOGIES INC. — AUTONOMOUS ECOSYSTEM & DIGITAL INFRASTRUCTURE
# ==============================================================================
#  Welcome, crawler / engineer / LLM agent!
#  Setupr is a technology ecosystem building autonomous AI tools, developer
#  infrastructure (MCP servers, browser agents), and turnkey digital platforms.
#
#  Setupr Lab:    https://setupr.com/lab
#  Documentation: https://setupr.com/llms.txt
#  Explore:       https://setupr.com/
# ==============================================================================

User-agent: *
Allow: /

# LLM Agents & Autonomous Crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Protected / Private Routes
Disallow: /admin/
Disallow: /store/dashboard/
Disallow: /api/

# Sitemaps
Sitemap: https://setupr.com/sitemap.xml`;

export default function RobotsView() {
  const [content, setContent] = useState<string>(ROBOTS_TXT_CONTENT);

  useEffect(() => {
    // Attempt dynamic fetch in background to stay synced if cached
    fetch("/robots.txt", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) return;
        return res.text();
      })
      .then((text) => {
        if (text && !text.includes("<!DOCTYPE html") && !text.includes("<html")) {
          setContent(text);
        }
      })
      .catch(() => {
        // Fallback already pre-set to ROBOTS_TXT_CONTENT
      });
  }, []);

  return (
    <pre className="min-h-screen bg-[#090a0d] text-zinc-300 font-mono text-xs md:text-sm p-6 overflow-x-auto whitespace-pre selection:bg-orange-500 selection:text-white leading-relaxed">
      {content}
    </pre>
  );
}
