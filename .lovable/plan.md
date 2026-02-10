
# Advanced CMS: Complete Database Integration

## Current Gap Analysis

The database has 140 rows in `site_settings`, 96 rows in `service_faqs`, and 92 rows in `service_deliverables` -- but many components either don't read from the database at all, or read from the wrong table. Here's exactly what's broken:

### Components NOT reading from the database at all
| Component | What's hardcoded |
|-----------|-----------------|
| `ServiceComparison.tsx` | All 4 comparison rows (Time, Expertise, Risk, Cost) |
| `ProcessTimeline.tsx` | All 4 timeline steps + total time text |
| `FAQ.tsx` (homepage) | All 9 homepage FAQs across 3 tabs |
| `GoalCards.tsx` | All 3 goal cards (Dream It, Own It, Grow It) |
| `About.tsx` values section | All 4 value cards (Clarity, Founder-Focused, Speed, Trust) |

### Components reading from WRONG source
| Component | Current source | Should use |
|-----------|---------------|-----------|
| `ServiceFAQ.tsx` | `site_settings` JSON blob | `service_faqs` table (96 rows already exist) |
| `ServiceDetail.tsx` deliverables | `site_settings` JSON blob | `service_deliverables` table (92 rows already exist) |

### Missing database seeds (components reference keys that don't exist)
| Keys needed | Used by |
|-------------|---------|
| `homepage_how_it_works_title`, `homepage_step1_title/desc` x3 | HowItWorks.tsx |
| `homepage_final_cta_title`, `homepage_final_cta_subtitle` | FinalCTA.tsx |
| `homepage_trust_stats_badge`, `homepage_trust_stats_title`, `homepage_trust_stats_subtitle` | TrustStats.tsx |
| `contact_title`, `contact_subtitle`, `contact_success_title`, `contact_success_message` | Contact.tsx |
| `career_title`, `career_subtitle`, `career_disclaimer` | Career.tsx |
| `footer_email`, `footer_instagram`, `footer_twitter`, `footer_linkedin` | Footer.tsx |
| `homepage_goal_*` x9 (3 cards x 3 fields) | GoalCards.tsx |
| `about_value_*` x8 (4 cards x 2 fields) | About.tsx |

---

## Implementation Plan

### Step 1: Seed missing settings rows (~40 new rows)

Insert all missing keys that components already reference or will reference:

**Homepage additions (11 rows):**
- `homepage_how_it_works_title`, `homepage_step1_title`, `homepage_step1_desc`, `homepage_step2_title`, `homepage_step2_desc`, `homepage_step3_title`, `homepage_step3_desc`
- `homepage_final_cta_title`, `homepage_final_cta_subtitle`
- `homepage_trust_stats_title`, `homepage_trust_stats_subtitle`

**Contact page (4 rows):**
- `contact_title`, `contact_subtitle`, `contact_success_title`, `contact_success_message`

**Career page (3 rows):**
- `career_title`, `career_subtitle`, `career_disclaimer`

**Footer additions (4 rows):**
- `footer_email`, `footer_instagram`, `footer_twitter`, `footer_linkedin`

**GoalCards (9 rows):**
- `homepage_goal_1_title`, `homepage_goal_1_desc`, `homepage_goal_1_link` (x3 cards)

**About values (8 rows):**
- `about_value_1_title`, `about_value_1_desc` (x4 cards)

### Step 2: Create new hooks for dedicated tables

**`src/hooks/useServiceFaqs.ts`** -- Fetches FAQs from the `service_faqs` table by `service_id`, with hardcoded fallback if no rows found.

**`src/hooks/useServiceDeliverables.ts`** -- Fetches deliverables from `service_deliverables` table by `service_id`, with hardcoded fallback.

### Step 3: Rewire ServiceFAQ.tsx

- Replace `site_settings` JSON lookup with `useServiceFaqs(serviceId)` hook
- Primary source: `service_faqs` table (row-based, easy to edit)
- Fallback: existing hardcoded category FAQs

### Step 4: Rewire ServiceDetail.tsx deliverables

- Replace `site_settings` JSON lookup with `useServiceDeliverables(serviceId)` hook
- Primary source: `service_deliverables` table
- Fallback: existing hardcoded defaults

### Step 5: Make ProcessTimeline database-driven

- Accept optional `serviceId` prop
- Fetch `service_{id}_timeline` JSON from `site_settings`
- Fallback: current hardcoded 4-step timeline
- Also make "Total estimated time" text use `service_{id}_processing_time`

### Step 6: Make ServiceComparison database-driven

- Accept optional `serviceId` prop
- Fetch `service_{id}_comparison` JSON from `site_settings`
- Fallback: current hardcoded 4-row comparison

### Step 7: Make Homepage FAQ database-driven

- Create a `homepage_faqs` table OR use JSON in `site_settings` with keys like `homepage_faq_getting_started`, `homepage_faq_pricing_process`, `homepage_faq_after_setup`
- Keep existing tab structure
- Fallback: current hardcoded FAQ groups

### Step 8: Make GoalCards database-driven

- Read `homepage_goal_1_title`, `homepage_goal_1_desc`, `homepage_goal_1_link` (x3) from `site_settings`
- Fallback: current hardcoded items

### Step 9: Make About values database-driven

- Read `about_value_1_title`, `about_value_1_desc` (x4) from `site_settings`
- Fallback: current hardcoded values

### Step 10: Make TrustStats header database-driven

- Read `homepage_trust_stats_title` and `homepage_trust_stats_subtitle` from `site_settings`
- Fallback: current hardcoded text

---

## Technical Details

### New files to create
| File | Purpose |
|------|---------|
| `src/hooks/useServiceFaqs.ts` | Hook to query `service_faqs` by service_id |
| `src/hooks/useServiceDeliverables.ts` | Hook to query `service_deliverables` by service_id |

### Files to modify
| File | Change |
|------|--------|
| `ServiceFAQ.tsx` | Switch from `site_settings` JSON to `service_faqs` table |
| `ServiceDetail.tsx` | Switch deliverables from JSON to `service_deliverables` table; pass `serviceId` to ProcessTimeline and ServiceComparison |
| `ProcessTimeline.tsx` | Add `serviceId` prop, fetch timeline JSON from `site_settings` |
| `ServiceComparison.tsx` | Add `serviceId` prop, fetch comparison JSON from `site_settings` |
| `FAQ.tsx` | Read homepage FAQs from `site_settings` with JSON fallback |
| `GoalCards.tsx` | Read card content from `site_settings` |
| `TrustStats.tsx` | Read section header from `site_settings` |
| `About.tsx` | Read values section from `site_settings` |

### Database changes
- Insert ~40 new seed rows into `site_settings`
- No new tables needed (existing `service_faqs` and `service_deliverables` are already created and populated)

### Pattern used everywhere
```typescript
// Every component follows the same graceful fallback pattern:
const dbValue = settings.find(s => s.key === "some_key")?.value;
const displayValue = dbValue || "hardcoded default";
```

After this implementation, every visible text block on the site will be editable directly from the database without touching code.
