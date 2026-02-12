

# Self-Evolving CMS: Remaining Components + Auto-Discovery Admin

## The Core Problem You Identified

Right now, adding a new database-driven field requires **two manual steps**:
1. Add the `site_settings` key and connect the component to it
2. **Separately** add a field definition in `PageSettingsSection.tsx` so the admin panel shows the input

This means the admin UI and the frontend are out of sync whenever new features are built. If you change a price field to a text field, the admin panel still shows the old input type until someone manually updates `PageSettingsSection.tsx`.

## Solution: Self-Describing Settings

Add metadata columns to the `site_settings` table itself so every row describes **how it should be edited**. The admin panel then auto-generates its UI from whatever is in the database -- no hardcoded field lists needed.

```text
Current site_settings:
+-----+-------+---------+----------+
| id  | key   | value   | category |
+-----+-------+---------+----------+

After migration:
+-----+-------+---------+----------+--------+------------+------------+-------------+
| id  | key   | value   | category | label  | field_type | sort_order | description |
+-----+-------+---------+----------+--------+------------+------------+-------------+
```

- **label**: Human-readable name shown in admin ("Hero Title", "Trust Badge JSON")
- **field_type**: `text`, `textarea`, `json`, `number`, `url`, `markdown` -- determines which input control renders
- **sort_order**: Controls display order within each category
- **description**: Helper text shown below the input

When you build a new feature in the future and insert a setting with `field_type: 'text'`, the admin panel will **automatically** show a text input. Change it to `'number'` and it becomes a number input. No code changes needed.

---

## Implementation Steps

### Step 1: Schema Migration -- Add metadata columns

Add 4 new columns to `site_settings`:
- `label` (text, default empty string)
- `field_type` (text, default 'text') -- values: text, textarea, json, number, url, markdown
- `sort_order` (integer, default 0)
- `description` (text, default empty string)

Then backfill all ~230 existing rows with proper labels and field types.

### Step 2: Seed Career and GuidesIndex content

**Career highlights (1 JSON row):**
- `career_highlights` -- JSON array with icon/title/description per card, field_type = 'json'

**Career form labels (5 rows):**
- `career_badge_text`, `career_success_title`, `career_success_desc`, `career_success_note` -- with labels and field_type = 'text' or 'textarea'

**GuidesIndex (3 rows):**
- `guides_page_title`, `guides_page_subtitle`, `guides_cards` (JSON array with title/description/link/readTime/icon per guide)
- `guides_cta_title`, `guides_cta_desc`

### Step 3: Connect Career.tsx and GuidesIndex.tsx to database

**Career.tsx**: Read `career_highlights` JSON from settings, parse it, map icons from a lookup table. Fallback to current hardcoded array.

**GuidesIndex.tsx**: Read `guides_cards` JSON, `guides_page_title`, `guides_page_subtitle` from settings. Fallback to current hardcoded values.

### Step 4: Rebuild PageSettingsSection as auto-discovery

Replace the current hardcoded `pageConfigs` array with a dynamic approach:

1. Fetch all `site_settings` rows (already available via `useSiteSettings`)
2. Group by `category`
3. Sort within each group by `sort_order`
4. Render the correct input widget based on `field_type`:
   - `text` -- `<Input />`
   - `textarea` -- `<Textarea />`
   - `markdown` -- `<Textarea />` with preview
   - `number` -- `<Input type="number" />`
   - `url` -- `<Input type="url" />`
   - `json` -- `<Textarea />` with JSON validation
5. Show `label` as the field name, `description` as helper text

This means **any new setting inserted into the database automatically appears in the admin panel** with the correct input type.

### Step 5: Update the SiteSetting TypeScript type

Update `useSiteSettings.ts` interface to include the new columns:

```typescript
export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
  label: string;        // NEW
  field_type: string;   // NEW
  sort_order: number;   // NEW
  description: string;  // NEW
  created_at: string;
  updated_at: string;
}
```

---

## How Future Expansion Works After This

**Scenario**: You add a new "Pricing Calculator" component next month.

All you do is insert rows:
```sql
INSERT INTO site_settings (key, value, category, label, field_type, sort_order, description)
VALUES
('pricing_calc_title', 'Calculate Your Cost', 'pricing', 'Calculator Title', 'text', 10, 'Heading above the price calculator'),
('pricing_calc_base_rate', '999', 'pricing', 'Base Rate (INR)', 'number', 11, 'Starting price for calculations');
```

The admin panel **instantly** shows:
- A "Pricing" category section
- "Calculator Title" as a text input
- "Base Rate (INR)" as a number input

No code changes to the admin panel needed.

**Scenario**: You change a price field to a text field.

```sql
UPDATE site_settings SET field_type = 'text', label = 'Base Rate Description' WHERE key = 'pricing_calc_base_rate';
```

The admin panel switches from number input to text input automatically.

---

## Technical Details

### Database changes
- ALTER TABLE: add 4 columns (`label`, `field_type`, `sort_order`, `description`)
- UPDATE: backfill ~230 existing rows with metadata
- INSERT: ~8 new rows for Career highlights + GuidesIndex content

### Files to create
None (all changes are modifications)

### Files to modify
| File | Change |
|------|--------|
| `site_settings` table | Add 4 metadata columns + backfill |
| `src/hooks/useSiteSettings.ts` | Update SiteSetting interface with new fields |
| `src/pages/Career.tsx` | Read highlights from database with fallback |
| `src/pages/guides/GuidesIndex.tsx` | Read guide cards + page header from database |
| `src/components/admin/settings/PageSettingsSection.tsx` | Complete rewrite: auto-discover fields from database metadata instead of hardcoded config |

### Category mapping for admin display
| Category | Admin Section Label |
|----------|-------------------|
| homepage | Home Page |
| about | About Page |
| contact | Contact Page |
| career | Career Page |
| services | Services Page |
| pricing | Pricing Page |
| footer | Footer |
| seo | SEO Settings |
| legal | Legal Documents |
| team | Team Page |
| author | Author Pages |
| guides | Guides Page |

