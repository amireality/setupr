
# Comprehensive Website Update Plan

## Overview

This plan covers multiple updates: footer legal structure changes, route changes from `/author` to `/team`, Team link in navbar, "Meet Our Team" button on About page, mobile responsiveness improvements, and expanded admin panel settings for managing page content and legal documents.

---

## Part 1: Footer Update - Legal Ownership Structure

### Current State
The Footer shows: `© {year} Setupr. All rights reserved.`

### Changes Required
Update `src/components/Footer.tsx` to add ownership disclosure:

```text
CURRENT:
┌─────────────────────────────────────────────┐
│ © 2026 Setupr. All rights reserved.         │
└─────────────────────────────────────────────┘

NEW:
┌─────────────────────────────────────────────┐
│ © 2026 Setupr. All Rights Reserved.         │
│ Owned & operated by Altered.                │  ← smaller, neutral grey
└─────────────────────────────────────────────┘
```

**Styling:**
- Main copyright: Keep existing `text-sm text-muted-foreground`
- "Owned & operated by Altered": Use `text-xs text-muted-foreground/60` (slightly smaller, more subtle)
- "Altered" is plain text (not a link)

---

## Part 2: Route Change - `/author` to `/team`

### Current Routes
- `/author` → TeamPage (team listing)
- `/author/:authorSlug` → AuthorPage (individual profile)

### New Routes
- `/team` → TeamPage (team listing)
- `/team/:authorSlug` → AuthorPage (individual profile)

### Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Change routes from `/author` to `/team` |
| `src/pages/TeamPage.tsx` | Update canonical URL, internal links |
| `src/pages/AuthorPage.tsx` | Update back link, breadcrumb URLs |
| `src/pages/About.tsx` | Update founder link from `/author/amir-khan` to `/team/amir-khan` |
| `src/pages/BlogPost.tsx` | Update author link to use `/team/` prefix |
| `src/components/blog/AuthorBio.tsx` | Update author link if present |

---

## Part 3: Add "Team" Link to Navbar

### Current Desktop Nav
Home | Services | Resources | About | Careers | Contact

### New Desktop Nav
Home | Services | Resources | About | **Team** | Careers | Contact

### Mobile Nav
Add "Team" link between About and Careers

**File:** `src/components/Navbar.tsx`

---

## Part 4: "Meet Our Team" Button on About Page

### Placement
Add after the Founder Section (around line 298) or within the Founder Section as a secondary CTA.

**Design:**
- Button text: "Meet Our Team"
- Style: Ghost/secondary variant to complement existing styling
- Links to `/team`
- Position: Below the founder bio, right-aligned or centered

**File:** `src/pages/About.tsx`

---

## Part 5: Mobile Responsiveness Improvements

### Areas Identified for Improvement

**Blog Page (`src/pages/Blog.tsx`):**
- Bento grid on mobile shows 2 columns (`grid-cols-2`) which can be cramped
- Reduce to single column on very small screens (`grid-cols-1 sm:grid-cols-2`)
- Featured post image/content ratio needs adjustment for mobile

**BlogCard (`src/components/blog/BlogCard.tsx`):**
- Thumbnail heights are fixed, may cause overflow on mobile
- Adjust responsive heights

**Team Page (`src/pages/TeamPage.tsx`):**
- Already has `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - good
- Check card padding for mobile

**BlogPost (`src/pages/BlogPost.tsx`):**
- Title font size could be smaller on mobile for very long titles
- Related posts grid should stack on mobile

### Files to Modify
- `src/pages/Blog.tsx` - Adjust grid breakpoints
- `src/components/blog/BlogCard.tsx` - Tweak mobile thumbnail heights
- `src/pages/BlogPost.tsx` - Responsive typography adjustments

---

## Part 6: Expanded Admin Panel - Page Content & Settings Management

### Current Admin Tabs
Services | Bundles | Blog | Team | Testimonials | Intake

### New Tab: "Settings"
A comprehensive settings tab for managing:

1. **Legal Pages** (Terms, Privacy, Refund)
2. **Page Settings** (About page, Contact info, etc.)
3. **Account Settings** (Change password, email)

### Database Schema Required

Create a new `site_settings` table to store editable content:

```text
site_settings
├── id (uuid, primary key)
├── key (text, unique) — e.g., "terms_content", "privacy_content", "footer_tagline"
├── value (text) — The content (can be markdown for legal pages)
├── category (text) — "legal", "content", "config"
├── created_at (timestamp)
└── updated_at (timestamp)
```

### Settings Tab Sub-Sections

| Section | What It Controls |
|---------|------------------|
| **Legal Documents** | Terms & Conditions, Privacy Policy, Refund Policy content |
| **About Page** | Tagline, stats values, mission text |
| **Contact Info** | Email address, social media URLs |
| **Footer** | Copyright text, ownership line |
| **Account** | Change password (uses Supabase Auth API) |

### Admin Settings UI Flow

```text
Settings Tab
├── Legal Documents
│   ├── Terms & Conditions [Edit] (Markdown editor)
│   ├── Privacy Policy [Edit]
│   └── Refund Policy [Edit]
├── Page Content
│   ├── About Page Sections
│   └── Footer Customization
└── Account
    ├── Change Email
    └── Change Password
```

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/admin/SettingsManagement.tsx` | Main settings tab component |
| `src/hooks/useSiteSettings.ts` | Query/mutation hooks for site_settings table |

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Add "Settings" tab |
| `src/pages/Terms.tsx` | Fetch content from database instead of hardcoded |
| `src/pages/Privacy.tsx` | Fetch content from database instead of hardcoded |
| `src/pages/Refund.tsx` | Fetch content from database instead of hardcoded |

### Legal Pages Update Logic

Currently, legal pages (Terms, Privacy, Refund) have hardcoded content. We'll:
1. Keep the hardcoded content as fallback
2. Check for database content first
3. Allow editing via admin panel with markdown support

---

## Implementation Summary

### Database Changes
1. Create `site_settings` table with RLS policies (admin write, public read)

### Files to Create (2 new files)
| File | Purpose |
|------|---------|
| `src/components/admin/SettingsManagement.tsx` | Admin settings management |
| `src/hooks/useSiteSettings.ts` | Site settings hooks |

### Files to Modify (12 files)
| File | Changes |
|------|---------|
| `src/components/Footer.tsx` | Add ownership line |
| `src/App.tsx` | Change `/author` routes to `/team` |
| `src/pages/TeamPage.tsx` | Update URLs, canonical |
| `src/pages/AuthorPage.tsx` | Update back link, breadcrumb |
| `src/pages/About.tsx` | Update links, add "Meet Our Team" button |
| `src/pages/BlogPost.tsx` | Update author link to `/team/` |
| `src/components/blog/AuthorBio.tsx` | Update author link |
| `src/components/Navbar.tsx` | Add Team link |
| `src/pages/Admin.tsx` | Add Settings tab |
| `src/pages/Blog.tsx` | Mobile grid improvements |
| `src/pages/Terms.tsx` | Fetch from database |
| `src/pages/Privacy.tsx` | Fetch from database |
| `src/pages/Refund.tsx` | Fetch from database |

---

## Visual Changes Summary

### Footer (Updated)
```text
┌─────────────────────────────────────────────────────────────────────┐
│ © 2026 Setupr. All Rights Reserved.                                 │
│ Owned & operated by Altered.                                        │
│                                                        [Social Icons]│
└─────────────────────────────────────────────────────────────────────┘
```

### Navbar (Updated)
```text
Desktop:
[Logo]  Home | Services | Resources | About | Team | Careers | Contact  [Get Started]

Mobile Menu:
├── Home
├── Services
├── Resources
├── About
├── Team          ← NEW
├── Careers
├── Contact
└── [Get Started]
```

### Admin Panel (Updated)
```text
┌────────────┬──────────┬────────┬────────┬───────────────┬──────────┬──────────┐
│  Services  │  Bundles │  Blog  │  Team  │  Testimonials │  Intake  │ Settings │
└────────────┴──────────┴────────┴────────┴───────────────┴──────────┴──────────┘

Settings Tab:
┌─────────────────────────────────────────────────────────────────────────────────┐
│ LEGAL DOCUMENTS                                                                  │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ Terms & Conditions       [Last updated: Jan 2026]          [Edit] [Preview]│ │
│ │ Privacy Policy           [Last updated: Jan 2026]          [Edit] [Preview]│ │
│ │ Refund Policy            [Last updated: Jan 2026]          [Edit] [Preview]│ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PAGE CONTENT                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ Footer Tagline          "Your trusted partner for..."           [Edit]     │ │
│ │ Footer Ownership        "Owned & operated by Altered."          [Edit]     │ │
│ │ About Page Stats        500+, 98%, 48hrs, 24/7                  [Edit]     │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ACCOUNT                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ Email: ajmatali7733@gmail.com                              [Change Email]  │ │
│ │ Password: ********                                         [Change Password]│ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Security Considerations

- `site_settings` table will have RLS:
  - Public can READ (for displaying content on pages)
  - Only admins can INSERT/UPDATE/DELETE
- Password changes use Supabase Auth `updateUser()` API
- All admin actions remain protected by existing `has_role()` checks

---

## Mobile Responsiveness Details

### Blog Page Grid Fix
```text
CURRENT: grid-cols-2 md:grid-cols-4 lg:grid-cols-12
NEW:     grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12
```
This ensures single column on smallest screens (< 640px).

### Featured Post on Mobile
Adjust the featured post to stack vertically with proper padding and reduced image height on mobile.

### Typography Scaling
- Blog post titles: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Ensure adequate touch targets (minimum 44px) for buttons

---

## Implementation Priority

### Phase 1 (Quick Wins)
1. Footer update (ownership line)
2. Route change `/author` → `/team`
3. Add Team link to Navbar
4. Add "Meet Our Team" button on About page

### Phase 2 (Mobile Fixes)
5. Blog page grid responsiveness
6. BlogCard mobile adjustments
7. BlogPost responsive typography

### Phase 3 (Admin Settings)
8. Create `site_settings` table
9. Create `SettingsManagement.tsx` component
10. Update legal pages to fetch from database
11. Add account settings functionality
