
# Complete Database-Driven Content Architecture

## Overview

This plan connects **all pages** to the `site_settings` database table so you can edit content directly in Lovable Cloud. Currently, only 6 settings exist in the database - most page content is hardcoded.

---

## Current State

| Page | Admin Fields Defined | Connected to Database |
|------|---------------------|----------------------|
| Home (Hero, HowItWorks, FinalCTA) | 13 fields | Partially (3 components) |
| Home (TrustStats, FAQ) | 0 fields | No - hardcoded |
| About | 15 fields | No - hardcoded |
| Team | 0 fields | No - hardcoded |
| Author Pages | 0 fields | No - hardcoded |
| Individual Service Pages | Editor exists | No - hardcoded |
| Contact | 4 fields | Yes - working |
| Career | 3 fields | Yes - working |

**Current database keys:**
- `footer_ownership`, `footer_tagline` (content)
- `privacy_content`, `refund_content`, `terms_content` (legal)
- `homepage_section_hero_visible` (visibility)

---

## What You'll Be Able to Edit After Implementation

### In Lovable Cloud > Database > site_settings table:

**Homepage (16 keys)**
| Key | Current Value |
|-----|---------------|
| `homepage_hero_subtitle` | Company registration, GST, MSME, website... |
| `homepage_cta_primary` | Start with your journey |
| `homepage_cta_secondary` | See How It Works |
| `homepage_stat_1_value` | 500+ |
| `homepage_stat_1_label` | Businesses Helped |
| `homepage_stat_1_desc` | Startups launched successfully |
| `homepage_stat_2_value` | 15 |
| `homepage_stat_2_label` | Avg. Days |
| `homepage_stat_2_desc` | To complete registration |
| `homepage_stat_3_value` | 4.9/5 |
| `homepage_stat_3_label` | Client Rating |
| `homepage_stat_3_desc` | Based on 200+ reviews |
| `homepage_stat_4_value` | 100% |
| `homepage_stat_4_label` | Compliance Rate |
| `homepage_stat_4_desc` | No rejections, guaranteed |
| `homepage_faq_title` | Frequently Asked Questions |

**About Page (15 keys)**
| Key | Current Value |
|-----|---------------|
| `about_hero_title` | We help freelancers and startups become legitimate businesses |
| `about_hero_subtitle` | Setupr is a business setup platform... |
| `about_stat_1_value` | 500+ |
| `about_stat_1_label` | Businesses Launched |
| `about_stat_2_value` | 98% |
| `about_stat_2_label` | Client Satisfaction |
| `about_stat_3_value` | 48hrs |
| `about_stat_3_label` | Avg. Turnaround |
| `about_stat_4_value` | 24/7 |
| `about_stat_4_label` | Support Available |
| `about_mission_title` | Built for freelancers, consultants & startups |
| `about_mission_content` | Setupr exists because talented professionals... |
| `about_founder_name` | Amir Khan |
| `about_founder_title` | Founder, Setupr |
| `about_founder_bio` | Amir Khan is the founder of Setupr... |

**Team Page (3 keys)**
| Key | Current Value |
|-----|---------------|
| `team_page_title` | Meet the People Behind Setupr |
| `team_page_subtitle` | We're building systems and resources... |
| `team_about_setupr` | Setupr is a business setup platform... |

**Author Pages (2 keys)**
| Key | Current Value |
|-----|---------------|
| `author_articles_heading` | Articles by {name} |
| `author_about_setupr` | Setupr is a business setup platform... |

**Individual Service Pages (per service, ~7 keys each)**
| Key Pattern | Description |
|-------------|-------------|
| `service_{id}_who_its_for_scenarios` | Custom "Common scenarios" text |
| `service_{id}_deliverables` | JSON array of deliverables |
| `service_{id}_outcome_text` | "The outcome:" paragraph |
| `service_{id}_processing_time` | Typical processing time |
| `service_{id}_faq` | JSON array of Q&A pairs |
| `service_{id}_comparison` | JSON for Setupr vs DIY table |
| `service_{id}_timeline` | JSON for process steps |

---

## Implementation Plan

### Phase 1: Connect TrustStats Component

**File:** `src/components/TrustStats.tsx`

Changes:
- Add `useSiteSettingsByCategory("homepage")` hook
- Replace hardcoded `stats` array with dynamic values
- Fallback to original values if not in database

```tsx
// Pattern to use:
const getSetting = (key: string, fallback: string) => 
  settings.find((s) => s.key === key)?.value || fallback;

const stats = [
  {
    value: getSetting("homepage_stat_1_value", "500+"),
    label: getSetting("homepage_stat_1_label", "Businesses Helped"),
    description: getSetting("homepage_stat_1_desc", "Startups launched successfully"),
  },
  // ... repeat for all 4 stats
];
```

### Phase 2: Connect FAQ Component

**File:** `src/components/FAQ.tsx`

Changes:
- Add settings hook
- Fetch FAQ title from database
- For full FAQ customization: fetch JSON-formatted FAQ groups

### Phase 3: Connect About Page

**File:** `src/pages/About.tsx`

Changes:
- Add `useSiteSettingsByCategory("about")` hook
- Replace hardcoded hero title, subtitle
- Replace hardcoded stats array with dynamic values
- Replace founder info (name, title, bio)
- Replace mission content

### Phase 4: Connect Team Page

**File:** `src/pages/TeamPage.tsx`

Changes:
- Add `useSiteSettingsByCategory("team")` hook
- Replace hardcoded page title, subtitle
- Replace "About Setupr" footer text

**Admin update:** Add Team page config to `PageSettingsSection.tsx`

### Phase 5: Connect Author Pages

**File:** `src/pages/AuthorPage.tsx`

Changes:
- Add settings hook
- Replace "Articles by {name}" heading template
- Replace "About Setupr" footer text

**Admin update:** Add Author page config to `PageSettingsSection.tsx`

### Phase 6: Connect Service Detail Pages

**File:** `src/pages/ServiceDetail.tsx`

Changes:
- Add `useSiteSettings()` hook
- Create helper: `getServiceSetting(field, fallback)`
- Replace "Common scenarios" text with database value
- Replace deliverables list with database value
- Replace "The outcome" text with database value
- Replace FAQ with service-specific FAQ from database

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/TrustStats.tsx` | Add settings hook, dynamic stats |
| `src/components/FAQ.tsx` | Add settings hook, dynamic FAQ title |
| `src/pages/About.tsx` | Add settings hook, replace all hardcoded content |
| `src/pages/TeamPage.tsx` | Add settings hook, dynamic page text |
| `src/pages/AuthorPage.tsx` | Add settings hook, dynamic headings |
| `src/pages/ServiceDetail.tsx` | Add settings hook, per-service overrides |
| `src/components/admin/settings/PageSettingsSection.tsx` | Add Team + Author page configs |

---

## How to Edit Content After Implementation

1. Open **Lovable Cloud** (click the Cloud icon)
2. Go to **Database > site_settings**
3. Find the key you want to edit (e.g., `about_hero_title`)
4. Click the row and update the `value` column
5. Save - the live site updates immediately

**To add a new setting:**
1. Click "Insert row" in site_settings
2. Fill in: `key`, `value`, `category` (use "content" or "homepage" etc.)
3. Save

---

## Database Key Naming Convention

All keys follow this pattern:
```
{page}_{section}_{field}
```

Examples:
- `homepage_hero_subtitle`
- `homepage_stat_1_value`
- `about_founder_bio`
- `team_page_title`
- `service_gst-reg_faq`

---

## Summary

After implementation:
- **40+ content fields** editable directly in Lovable Cloud
- All changes appear instantly on the live site
- Original content remains as fallback (site never breaks)
- No code changes needed for content updates

