

# CMS Autonomy Audit: Remaining Gaps and Improvements

## Current State

After the previous implementation, many core components (Hero, HowItWorks, FinalCTA, GoalCards, TrustStats, FAQ, Footer, Contact, Career, About, Team, Services Intro) are now database-driven. However, a significant number of components still have fully hardcoded content, and there are structural improvements that would make the CMS more powerful.

---

## Gap 1: Still-Hardcoded Components

These components have zero database integration -- all text is hardcoded:

| Component | Hardcoded Content |
|-----------|------------------|
| `TrustBadges.tsx` | 3 badges: "Transparent Pricing", "Guided Setup", "Human Support" with descriptions |
| `ServicePillars.tsx` | 4 service pillar cards: "Business formation", "Digital presence", "Basic compliance", "Ongoing help" with descriptions and feature chips |
| `CollapsibleServices.tsx` | `categoryHighlights` object with hardcoded titles/descriptions for 4 categories (formation, digital, compliance, expert) |
| `WhatsIncluded.tsx` (Pricing) | 4 inclusion items: "Full setup handling", "Document guidance", "Direct support", "Secure handover" |
| `TrustNote.tsx` (Pricing) | Title "Done right, every time" and description |
| `PricingConfirmation.tsx` | Title "Here's your setup plan" and subtitle |
| `RecommendedBundles.tsx` | Section header "Popular service bundles for new businesses" and subtitle |
| `Testimonials.tsx` | Section header "Trusted by Entrepreneurs" and subtitles |
| `HowItWorks.tsx` | The subtitle paragraph below the title ("Simple 3-step process...") |
| `CollapsibleServices.tsx` | Section header "Business registration and setup services we offer" and subtitle |
| `GuidesIndex.tsx` | All 4 guide cards with titles, descriptions, and links |
| `Blog.tsx` | Page title "Resources & Guides" and subtitle |
| `HeroSection.tsx` | The `businessTypes` array for the typer effect ("Business", "Agency", "Startup", "Venture", "Company") and the headline text "Set up your... The right way." |
| `Career.tsx` | The 4 highlight cards ("Real Exposure", "Founder Access", etc.) and all form section headers |

---

## Gap 2: Missing Admin UI for Key Tables

The admin panel currently has no way to manage:

| Data | Where it lives | Admin UI? |
|------|---------------|-----------|
| Service FAQs | `service_faqs` table (96 rows) | No CRUD interface |
| Service Deliverables | `service_deliverables` table (92 rows) | No CRUD interface |
| Homepage FAQ content | `site_settings` JSON blobs | Fields exist in Settings but editing JSON is clunky |
| Service-specific settings | `site_settings` (processing_time, comparison_note, etc.) | Only accessible through per-service Settings accordion |

---

## Gap 3: Structural Improvements for Better CMS Autonomy

### 3a. SEO Meta Tags are Hardcoded
Pages like About, Blog, Services, Team all have hardcoded `<Helmet>` meta tags (title, description, og:title, og:description). These should be editable via `site_settings` so admins can optimize SEO without code changes.

### 3b. Navigation Links are Hardcoded
The Navbar and Footer link structures (Company, Resources, Services, Legal) are entirely hardcoded. Admins can't add, remove, or reorder pages.

### 3c. No Image Management via CMS
Currently there's no storage bucket for CMS-managed images (hero backgrounds, author avatars, blog thumbnails uploaded via admin). All images are either in `/public` or external URLs.

---

## Implementation Plan

### Phase 1: Make remaining components database-driven (seed + connect)

**Seed ~25 new rows** in `site_settings`:

- `homepage_trust_badges` (JSON array of badge objects)
- `homepage_service_pillars` (JSON array of pillar objects)
- `homepage_collapsible_title`, `homepage_collapsible_subtitle`
- `homepage_bundles_title`, `homepage_bundles_subtitle`
- `homepage_testimonials_badge`, `homepage_testimonials_title`, `homepage_testimonials_subtitle`, `homepage_testimonials_tagline`
- `homepage_how_it_works_subtitle`
- `homepage_hero_headline_prefix`, `homepage_hero_headline_suffix`, `homepage_hero_typer_words` (JSON array)
- `pricing_confirmation_title`, `pricing_confirmation_subtitle`
- `pricing_whats_included` (JSON array)
- `pricing_trust_note_title`, `pricing_trust_note_desc`
- `blog_page_title`, `blog_page_subtitle`
- `guides_page_title`, `guides_page_subtitle`

**Update components** to use the `useSiteSettingsByCategory` hook with graceful fallback:
- `TrustBadges.tsx`
- `ServicePillars.tsx`
- `CollapsibleServices.tsx` (section header only; category data already comes from DB)
- `WhatsIncluded.tsx`
- `TrustNote.tsx`
- `PricingConfirmation.tsx`
- `RecommendedBundles.tsx` (section header)
- `Testimonials.tsx` (section header)
- `HowItWorks.tsx` (add subtitle)
- `HeroSection.tsx` (headline and typer words)
- `Blog.tsx` (page header)

### Phase 2: Admin CRUD for Service FAQs and Deliverables

Create two new admin management components:

**`src/components/admin/ServiceFaqManagement.tsx`**
- Table view of all FAQs grouped by service
- Add/Edit/Delete individual FAQ rows
- Drag-to-reorder (sort_order)
- Filter by service

**`src/components/admin/ServiceDeliverableManagement.tsx`**
- Table view of all deliverables grouped by service
- Add/Edit/Delete individual deliverable rows
- Drag-to-reorder (sort_order)
- Filter by service

Add these as sub-sections under the existing "Services" tab in the Admin panel.

### Phase 3: SEO Meta Tags via CMS

Seed keys for each page's SEO:
- `seo_{page}_title`, `seo_{page}_description`, `seo_{page}_og_title`, `seo_{page}_og_description`
- Pages: homepage, about, blog, services, team, career, contact, guides

Create a `useSeoSettings(page)` hook and update each page's `<Helmet>` to pull from the database.

Add a new "SEO Settings" accordion section in the Admin Settings panel for managing these per-page.

### Phase 4: Storage Bucket for CMS Images

Create a `cms-assets` storage bucket for admin-uploaded images (blog thumbnails, hero backgrounds, team avatars). This enables the admin panel to support image uploads without relying on external URLs.

---

## Technical Details

### New files to create
| File | Purpose |
|------|---------|
| `src/components/admin/ServiceFaqManagement.tsx` | CRUD interface for `service_faqs` table |
| `src/components/admin/ServiceDeliverableManagement.tsx` | CRUD interface for `service_deliverables` table |
| `src/hooks/useSeoSettings.ts` | Hook to fetch SEO meta tags per page |
| `src/components/admin/settings/SeoSettingsSection.tsx` | Admin UI for per-page SEO fields |

### Files to modify
| File | Change |
|------|--------|
| `TrustBadges.tsx` | Read badges from `site_settings` JSON |
| `ServicePillars.tsx` | Read pillars from `site_settings` JSON |
| `CollapsibleServices.tsx` | Read section header from `site_settings` |
| `WhatsIncluded.tsx` | Read inclusions from `site_settings` JSON |
| `TrustNote.tsx` | Read title/desc from `site_settings` |
| `PricingConfirmation.tsx` | Read title/subtitle from `site_settings` |
| `RecommendedBundles.tsx` | Read section header from `site_settings` |
| `Testimonials.tsx` | Read section header from `site_settings` |
| `HowItWorks.tsx` | Add subtitle from `site_settings` |
| `HeroSection.tsx` | Read headline text and typer words |
| `Blog.tsx` | Read page header from `site_settings` |
| `About.tsx`, `Blog.tsx`, `Services.tsx`, `TeamPage.tsx`, etc. | Add SEO hook for dynamic meta tags |
| `Admin.tsx` | Add Service FAQ and Deliverable management tabs |
| `SettingsManagement.tsx` | Add SEO settings accordion |
| `PageSettingsSection.tsx` | Add missing fields (trust badges, pillars, pricing text, blog/guides headers) |

### Database changes
- Insert ~25 new seed rows into `site_settings`
- Insert ~8 SEO seed rows per page (~50 rows)
- Create `cms-assets` storage bucket with public read access

### Summary of CMS coverage after implementation

| Area | Before | After |
|------|--------|-------|
| Hardcoded text components | ~14 components | 0 |
| Admin-editable service FAQs | No UI | Full CRUD |
| Admin-editable deliverables | No UI | Full CRUD |
| SEO meta tags | All hardcoded | All database-driven |
| Image management | No storage bucket | CMS assets bucket |
| Total `site_settings` rows | ~140 | ~215 |

