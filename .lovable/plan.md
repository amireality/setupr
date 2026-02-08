
# Complete Database Content Architecture

## The Root Problem

Currently, only **6 rows** exist in your `site_settings` table (footer, legal docs, visibility flag). The components **are coded to read from the database** but no data was actually inserted. When you open Cloud > Database > site_settings, you see almost nothing because the rows were never created.

Additionally, service-specific content (FAQs, deliverables, timelines, comparisons) is still hardcoded in components, not stored in the database at all.

---

## Solution Overview

1. **Create two new tables** for easier FAQ and Deliverable management
2. **Seed 100+ rows** into `site_settings` for all pages
3. **Seed default FAQs and Deliverables** into the new tables
4. **Update components** to read from these new tables with fallbacks
5. **Provide a key reference guide** so you know exactly what key maps to what content

---

## Phase 1: Create New Database Tables

### Table: `service_faqs`
Stores FAQs per service (one row per FAQ item)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| service_id | text | Links to services.service_id (e.g., "gst", "partnership") |
| question | text | The FAQ question |
| answer | text | The FAQ answer |
| sort_order | integer | Display order (0, 1, 2...) |
| created_at | timestamp | Auto-set |
| updated_at | timestamp | Auto-set |

### Table: `service_deliverables`
Stores deliverables per service (one row per deliverable)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (auto-generated) |
| service_id | text | Links to services.service_id |
| label | text | The deliverable text (e.g., "Partnership Deed Drafting") |
| sort_order | integer | Display order |
| created_at | timestamp | Auto-set |
| updated_at | timestamp | Auto-set |

---

## Phase 2: Seed All Site Settings

Insert default rows for every editable field across all pages:

### Homepage Settings (16 rows)
```
homepage_hero_subtitle → "Company registration, GST, MSME..."
homepage_cta_primary → "Start Your Journey"
homepage_cta_secondary → "See How It Works"
homepage_stat_1_value → "500+"
homepage_stat_1_label → "Businesses Helped"
homepage_stat_1_desc → "Startups launched successfully"
homepage_stat_2_value → "15"
homepage_stat_2_label → "Avg. Days"
homepage_stat_2_desc → "To complete registration"
homepage_stat_3_value → "4.9/5"
homepage_stat_3_label → "Client Rating"
homepage_stat_3_desc → "Based on 200+ reviews"
homepage_stat_4_value → "100%"
homepage_stat_4_label → "Compliance Rate"
homepage_stat_4_desc → "No rejections, guaranteed"
homepage_faq_title → "Frequently Asked Questions"
```

### About Page Settings (15 rows)
```
about_hero_title → "We help freelancers and startups become legitimate businesses"
about_hero_subtitle → "Setupr is a business setup platform..."
about_stat_1_value → "500+"
about_stat_1_label → "Businesses Launched"
about_stat_2_value → "98%"
about_stat_2_label → "Client Satisfaction"
about_stat_3_value → "48hrs"
about_stat_3_label → "Avg. Turnaround"
about_stat_4_value → "24/7"
about_stat_4_label → "Support Available"
about_mission_title → "Built for freelancers, consultants & startups"
about_mission_content → "Setupr exists because talented professionals..."
about_founder_name → "Amir Khan"
about_founder_title → "Founder, Setupr"
about_founder_bio → "Amir Khan is the founder of Setupr..."
```

### Team Page Settings (3 rows)
```
team_page_title → "Meet the People Behind Setupr"
team_page_subtitle → "We're building systems and resources..."
team_about_setupr → "Setupr is a business setup platform..."
```

### Author Page Settings (2 rows)
```
author_articles_heading → "Articles by {name}"
author_about_setupr → "Setupr is a business setup platform..."
```

### Services Intro Settings (3 rows)
```
services_intro_title → "Business registration services in India"
services_intro_subtitle → "Company registration, GST, MSME..."
services_intro_note → "Pick individual services or choose a bundle..."
```

### Per-Service Settings (31 services × 4 fields = 124 rows)
For each service (gst, partnership, llp, pvt-ltd, etc.):
```
service_{service_id}_processing_time → "7-15 days"
service_{service_id}_who_its_for_scenarios → "Freelancers going legit..."
service_{service_id}_outcome_text → "A fully compliant, registered business..."
service_{service_id}_comparison_note → "Save 30+ hours and eliminate stress..."
```

---

## Phase 3: Seed Default FAQs

Insert 4 default FAQs for each of the 31 services into `service_faqs`:

Example for "gst" service:
| service_id | question | answer | sort_order |
|------------|----------|--------|------------|
| gst | How long does GST registration take? | Typically 7-10 business days... | 0 |
| gst | What documents do I need? | PAN, Aadhaar, address proof... | 1 |
| gst | Can I track my application status? | Yes! You'll receive updates... | 2 |
| gst | What if my application is rejected? | With our 100% compliance guarantee... | 3 |

---

## Phase 4: Seed Default Deliverables

Insert default deliverables for each service into `service_deliverables`:

Example for "partnership" service:
| service_id | label | sort_order |
|------------|-------|------------|
| partnership | Partnership Deed Drafting | 0 |
| partnership | Firm Registration Certificate | 1 |
| partnership | PAN Card for Partnership Firm | 2 |
| partnership | GST Registration (if applicable) | 3 |

---

## Phase 5: Update Components

### ServiceFAQ.tsx
- Primary: Fetch from `service_faqs` table where `service_id = currentService`
- Fallback: Use hardcoded category-based FAQs if no rows found

### ServiceDetail.tsx
- Fetch deliverables from `service_deliverables` table
- Fetch per-service settings from `site_settings`
- Use ProcessTimeline and ServiceComparison with database values

### ProcessTimeline.tsx
- Accept optional `serviceId` prop
- Fetch `service_{serviceId}_timeline` JSON from site_settings
- Fallback to default steps if not found

### ServiceComparison.tsx
- Accept optional `serviceId` prop
- Fetch `service_{serviceId}_comparison` JSON from site_settings
- Fallback to default comparisons if not found

---

## How to Edit Content After Implementation

### Method 1: Cloud > Database > site_settings
1. Open Lovable Cloud
2. Go to Database > Tables > `site_settings`
3. Find the key you want (e.g., `about_hero_title`)
4. Click the row, edit the `value` column
5. Save - site updates immediately

### Method 2: Cloud > Database > service_faqs
1. Go to Database > Tables > `service_faqs`
2. Find the service_id (e.g., "partnership")
3. Edit questions/answers directly
4. Add new FAQ: Insert row with service_id, question, answer, sort_order

### Method 3: Cloud > Database > service_deliverables
1. Go to Database > Tables > `service_deliverables`
2. Find the service_id
3. Edit or add deliverable labels

---

## Key Reference Guide

### How Keys Map to Pages

**When you see a key like `service_partnership_processing_time`:**
- `service_` = This is for an individual service page
- `partnership` = The service_id (matches `/services/partnership` URL)
- `processing_time` = The specific field on that page

**When you see `about_stat_2_label`:**
- `about_` = About page
- `stat_2_` = Second stat box
- `label` = The label text under the number

**You do NOT need to enter UUIDs** - the system auto-generates them. You only need to set:
- `key` = The identifier (e.g., `about_hero_title`)
- `value` = The content
- `category` = The page group (e.g., `about`, `homepage`, `services`)

---

## Files to Create/Modify

| File | Action |
|------|--------|
| Database migration | Create `service_faqs` and `service_deliverables` tables |
| Database insert | Seed all 160+ settings rows |
| Database insert | Seed 124 FAQ rows (4 per service × 31 services) |
| Database insert | Seed 124 deliverable rows |
| `src/hooks/useServiceFaqs.ts` | New hook to fetch FAQs |
| `src/hooks/useServiceDeliverables.ts` | New hook to fetch deliverables |
| `src/components/ServiceFAQ.tsx` | Use new hook with fallback |
| `src/pages/ServiceDetail.tsx` | Use new deliverables hook |
| `src/components/ProcessTimeline.tsx` | Accept serviceId, fetch from settings |
| `src/components/ServiceComparison.tsx` | Accept serviceId, fetch from settings |

---

## Technical Summary

After implementation:
- **160+ site_settings rows** visible in Cloud immediately
- **124 FAQ rows** in dedicated `service_faqs` table
- **124 deliverable rows** in dedicated `service_deliverables` table
- **No UUIDs needed** when adding content - just set key, value, category
- **Easy to add more FAQs** - just insert new row with service_id
- **Graceful fallbacks** - if you delete a row, original content shows
