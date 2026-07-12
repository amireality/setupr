# Pivot Setupr to a global digital services platform

Reposition around three pillars: **business registration**, **website & feature integrations (WhatsApp, payments, CRM, etc.)**, and **automations**. India remains supported but is no longer the frontline identity. Positioning line to use everywhere:

> "We sit in the gap that makes your business legit and modern: registration, websites, feature integrations, and automations. One team, worldwide."

---

## 1. Copy & positioning changes (frontend only)

Update these components/pages to strip India-first language and land the new pillars. All copy driven by `site_settings` will be updated via the insert tool so live admin overrides carry through; hardcoded fallbacks in code will be updated in parallel.

- `src/components/HeroSection.tsx` — new headline, subtitle, pillar chips (Registration / Website & Integrations / Automations).
- `src/components/FinalCTA.tsx`, `src/components/TrustStats.tsx`, `src/components/GoalCards.tsx`, `src/components/HowItWorks.tsx`, `src/components/Testimonials.tsx`, `src/components/FAQ.tsx` — remove "India / Bharat / GST / MSME" phrasing.
- `src/components/services/ServiceIntro.tsx` — floating words → `Formation, Website, Automation, Integrations, AI, Global`.
- `src/components/Footer.tsx`, `src/components/Navbar.tsx` — drop "Built for Bharat" tag; keep a subtle "Serving founders worldwide".
- `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Career.tsx`, `src/pages/Intake.tsx`, `src/pages/Terms.tsx`, `src/pages/Privacy.tsx`, `src/pages/Refund.tsx` — neutralize regional wording; keep India as one of the served regions.
- `src/pages/Index.tsx`, `src/pages/Services.tsx`, `src/pages/Blog.tsx`, `src/pages/store/*` — updated `<Helmet>` title/description/OG for global search intent.
- `index.html` — new `<title>`, description, OG, JSON-LD Organization `areaServed: Worldwide`.
- `public/llms.txt` — rewrite as a global platform pitch.

## 2. Store checkout generalization

- `src/pages/store/StoreCheckout.tsx`, `StoreDashboard.tsx`, `StoreSignup.tsx` — "GSTIN (Optional)" → "Tax ID / VAT / GSTIN (Optional)"; make State/PIN optional so non-India buyers can complete checkout.
- Keep 18% GST logic only when the country is India (later infra; for now just relabel field and note in copy that tax applies per jurisdiction).

## 3. Services catalog reframe (right thing = keep visible but reframe)

I'll do a two-pass cleanup. Nothing is deleted permanently — India-specific rows get moved to a hidden "India Compliance" category so they stay recoverable and requestable, and the primary catalog becomes globally relevant.

**Reclassified as global (renamed + description rewritten):**
- `pvt-ltd`, `llp`, `opc`, `partnership`, `proprietorship` → grouped under a single "Business Registration" pillar with an "available regions" note (India today, more soon).
- `website`, `domain-hosting`, `email`, `payment-gateway`, `google-business` → "Website & Digital Presence" pillar.
- `ai-workflow`, `ai-chatbot`, `ai-crm`, `ai-tools`, `ai-agent` → "AI & Automations" pillar. Add new: `whatsapp-integration`, `crm-integration`, `workflow-automation`.

**Hidden from public UI (visibility='hidden', kept in DB):**
- `gst`, `msme`, `trademark`, `pan-tan`, `current-account`, `trade-license`, `shop-establishment`, `compliance-support`, `legal-docs`.

## 4. Guides & blog

- **Guides**: `StartingBusinessGuide.tsx` and `BusinessTypesGuide.tsx` rewritten to a global framing (types of entities, when each makes sense, with a short "India specifics" section at the bottom). Routes stay so existing links keep working.
- **Blog**: existing India-heavy posts (`gst-registration-complete-guide`, `complete-guide-to-llp-registration-india`, `pvt-ltd-vs-llp-which-is-right`, `annual-compliance-checklist-startups`) get `is_published=false` in Test only (Live remains untouched per our locked sync policy — you can unpublish on Live via `/admin` if you agree). Two new global drafts scaffolded so /blog isn't left thin: "How to launch a business online in 2026" and "WhatsApp + CRM automations that actually convert".

## 5. Database migration (Test only, then you publish schema to Live)

Single migration adds:
- `services.available_regions text[] default '{Global}'` and `services.is_regional boolean default false` so pages can render a "Available in: India" chip where relevant.

Data updates via the insert tool (Test):
- Set `visibility='hidden'` on the 9 India-only compliance rows above.
- Set `available_regions='{India}'`, `is_regional=true` on registration rows (Pvt Ltd, LLP, OPC, Partnership, Proprietorship) and any others tied to Indian law.
- Reset `service_categories` display names and descriptions.
- Update `site_settings` hero/subtitle/final-CTA keys for the new positioning.

Live data is **not** touched by this plan. After you verify Test looks right, we do a scoped Test→Live sync of only the new/changed keys with `ON CONFLICT DO NOTHING` for new rows and targeted `UPDATE` for the specific site_settings keys you approve — same policy locked in memory.

## 6. Memory rules update

Rewrite the "India-specific only" core rule to:

> Default positioning is global. Copy, SEO, and images target a worldwide audience. India-specific terms (GST, MSME, Pvt Ltd, etc.) only appear on pages explicitly about India services or in region-tagged content. Never assume any single jurisdiction in generic UX copy.

Also update the "Built for Bharat" note in the site-structure memory.

## 7. SEO

- New index.html title/description around "business registration, websites, integrations, automations".
- Refresh per-page Helmet on Index, Services, Store, About.
- Rebuild sitemap (dynamic already) so hidden services drop out automatically.
- Mark relevant open SEO findings fixed after edits.

---

## Technical details

**Files touched (approx.):** ~25 frontend files, 1 SQL migration, 1 insert batch, 2 memory files, `index.html`, `public/llms.txt`.

**Not touched:**
- Live database rows (only Test), per locked sync policy.
- Payment/Razorpay code (still needed for India customers).
- Ingram Micro / Store products.
- Auth, RLS, user_roles.

## Verification

1. `npm run build` passes.
2. Preview `/`, `/services`, `/about`, `/store`, `/blog` show new positioning.
3. `/services` no longer surfaces GST/MSME/Trademark cards; registration cards show an "Available in: India" chip.
4. Sitemap regenerates without hidden services.
5. Once approved on Test, we do a scoped Live sync of only the new site_settings keys and any newly-added service rows.

## What I need from you after approval

- Approve the migration when it appears.
- Review the preview and tell me if the tone lands.
- Decide when to unpublish India-heavy blog posts on Live (I won't touch Live data).
