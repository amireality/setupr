
# Comprehensive Admin Panel & Blog Overhaul Plan

## Overview

This plan addresses all requested changes: fixing markdown rendering, removing AI automation, adding manual post creation, building the Team/Authors system, enhancing mobile responsiveness, and expanding admin capabilities.

---

## Part 1: Markdown Rendering Fixes

### Current Issues (from your screenshots)
The editor's preview tab uses a simplified regex-based renderer that doesn't handle:
- Nested bold within list items (`* **Pros:**`)
- Horizontal rules (`---`)
- Images (`![alt](url)`)
- Code blocks
- Proper list grouping
- Tables (partially working on public page, not in editor preview)

### Solution
Create a unified `renderMarkdown` utility used by both:
1. **BlogEditor preview** (`src/components/admin/BlogEditor.tsx`)
2. **Public BlogPost page** (`src/pages/BlogPost.tsx`)

This ensures WYSIWYG consistency between admin preview and published output.

**Markdown features to support:**
| Syntax | Example | Rendering |
|--------|---------|-----------|
| Headers | `## Title` | h2, h3 styled headings |
| Bold | `**text**` | Strong with foreground color |
| Italic | `*text*` | Emphasized text |
| Links | `[text](url)` | React Router Link components |
| Images | `![alt](url)` | Responsive img with rounded corners |
| Blockquotes | `> quote` | Orange left border, subtle background |
| Unordered lists | `- item` or `* item` | Properly grouped ul |
| Ordered lists | `1. item` | Properly grouped ol |
| Tables | `\| cell \|` | Themed table with zebra striping |
| Horizontal rule | `---` | Styled hr element |
| Code | `` `inline` `` | Monospace with background |

**Files to create:**
- `src/lib/markdown.tsx` — Shared markdown parser/renderer

**Files to modify:**
- `src/components/admin/BlogEditor.tsx` — Use shared renderer for preview
- `src/pages/BlogPost.tsx` — Use shared renderer for public view

---

## Part 2: Remove AI Automation

### Changes Required

1. **Delete BlogGenerator component usage** from `BlogManagement.tsx`
2. **Keep the edge function** for potential future use, but remove it from the UI
3. **Replace AI section** with "Create New Post" button

**Files to modify:**
- `src/components/admin/BlogManagement.tsx` — Remove BlogGenerator, add "New Post" button

---

## Part 3: Manual Blog Post Creation

### Current State
The `BlogEditor` component only opens in "edit mode" when clicking an existing post. It has no "create mode".

### Solution
1. Modify `BlogEditor` to accept `post: null` for create mode
2. Add `useCreateBlogPost` hook call for new posts
3. Add "Create New Post" button that opens blank editor
4. Add preview button on draft cards (opens in-editor preview)

**Files to modify:**
- `src/components/admin/BlogEditor.tsx` — Support create mode (null post)
- `src/components/admin/BlogManagement.tsx` — Add "New Post" button, preview button for drafts

---

## Part 4: Team/Authors System

### Current Problem
- `/author/` shows 404 (no route for listing all authors)
- `AuthorPage.tsx` is hardcoded to "Amir Khan" only
- Blog posts link to `/author/amir-khan` regardless of actual author
- No admin management for authors

### Database Schema Required
Create new `authors` table:

```text
authors
├── id (uuid, primary key)
├── slug (text, unique) — e.g., "amir-khan"
├── name (text) — Display name
├── title (text) — e.g., "Founder, Setupr"
├── bio (text) — Full bio paragraph
├── avatar_initials (text) — e.g., "AK"
├── twitter_url (text, nullable)
├── linkedin_url (text, nullable)
├── is_active (boolean, default true)
├── sort_order (integer, default 0)
├── created_at (timestamp)
└── updated_at (timestamp)
```

### New Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/author/` or `/team` | `TeamPage.tsx` | List all authors as cards |
| `/author/:slug` | `AuthorPage.tsx` | Individual author profile (updated) |

### Admin Management
New "Team" tab in admin panel with:
- View all team members
- Create new author
- Edit existing author
- Delete author
- Toggle active/inactive

### Blog Integration
- `BlogEditor` author field becomes a dropdown of active authors
- `BlogPost.tsx` links to the correct author profile based on author name/slug
- `AuthorBio` component fetches author data from database

**Files to create:**
- `src/pages/TeamPage.tsx` — Team listing page
- `src/components/admin/TeamManagement.tsx` — CRUD for authors
- `src/hooks/useAuthors.ts` — Query/mutation hooks for authors

**Files to modify:**
- `src/App.tsx` — Add `/author` route for team listing, rename page title
- `src/pages/AuthorPage.tsx` — Fetch from database, dynamic for any author
- `src/components/blog/AuthorBio.tsx` — Fetch from authors table
- `src/components/admin/BlogEditor.tsx` — Author dropdown from database
- `src/pages/BlogPost.tsx` — Dynamic author link based on slug
- `src/pages/Admin.tsx` — Add "Team" tab

---

## Part 5: Mobile Responsiveness Fixes

### Areas to Improve

1. **Admin Panel Header** — Stack elements vertically on mobile
2. **Admin Tabs** — Horizontal scroll or dropdown on narrow screens
3. **BlogEditor Dialog** — Full screen on mobile, better touch targets
4. **PostCard** — Stack actions below content on mobile
5. **Form Inputs** — Full width on mobile, larger touch targets
6. **Team Cards** — Single column on mobile

### Specific CSS Changes
- Use responsive grid: `grid-cols-1 md:grid-cols-2`
- Full-width dialogs on mobile: `w-full max-w-5xl`
- Larger buttons/inputs on mobile
- Horizontal scroll for TabsList on mobile

**Files to modify:**
- `src/pages/Admin.tsx` — Mobile header layout
- `src/components/admin/BlogManagement.tsx` — Mobile post cards
- `src/components/admin/BlogEditor.tsx` — Mobile-friendly dialog
- `src/pages/TeamPage.tsx` — Responsive grid

---

## Part 6: Additional Admin Features

### Testimonials Tab (as previously planned)
- View all testimonials with quote preview
- Create/Edit/Delete testimonials
- Toggle featured status
- Reorder functionality

**Files to create:**
- `src/components/admin/TestimonialManagement.tsx`
- `src/hooks/useTestimonialAdmin.ts`

### Intake Submissions Tab
- View all intake form submissions
- Filter by status (pending/contacted/completed)
- Update status
- View full details

**Files to create:**
- `src/components/admin/IntakeManagement.tsx`
- `src/hooks/useIntakeAdmin.ts`

---

## Part 7: Image URL Preview

When pasting an image URL in the Featured Image field:
- Show preview thumbnail below the input
- Validate URL is accessible
- Display error if image fails to load

**Files to modify:**
- `src/components/admin/BlogEditor.tsx` — Add image preview component

---

## Implementation Summary

### Database Changes
1. Create `authors` table with RLS policies

### Files to Create (8 files)
| File | Purpose |
|------|---------|
| `src/lib/markdown.tsx` | Shared markdown renderer |
| `src/pages/TeamPage.tsx` | Team listing page |
| `src/hooks/useAuthors.ts` | Authors CRUD hooks |
| `src/components/admin/TeamManagement.tsx` | Admin team management |
| `src/components/admin/TestimonialManagement.tsx` | Admin testimonials |
| `src/hooks/useTestimonialAdmin.ts` | Testimonial CRUD hooks |
| `src/components/admin/IntakeManagement.tsx` | View intake submissions |
| `src/hooks/useIntakeAdmin.ts` | Intake query hooks |

### Files to Modify (10 files)
| File | Changes |
|------|---------|
| `src/App.tsx` | Add `/author` route (team page), keep `/author/:slug` |
| `src/pages/Admin.tsx` | Add Team, Testimonials, Intake tabs |
| `src/pages/AuthorPage.tsx` | Fetch from DB, support any author |
| `src/pages/BlogPost.tsx` | Use shared markdown, dynamic author links |
| `src/components/admin/BlogManagement.tsx` | Remove AI, add "New Post", add preview |
| `src/components/admin/BlogEditor.tsx` | Create mode, author dropdown, image preview, mobile fixes |
| `src/components/blog/AuthorBio.tsx` | Fetch from authors table |
| `src/hooks/useBlogAdmin.ts` | Remove generate function (keep others) |

### Files to Delete
None — keeping BlogGenerator.tsx and edge function for future use (just removing from UI)

---

## Visual Changes Summary

```text
ADMIN PANEL TABS (Updated):
┌────────────┬──────────┬────────┬────────┬───────────────┬──────────┐
│  Services  │  Bundles │  Blog  │  Team  │  Testimonials │  Intake  │
└────────────┴──────────┴────────┴────────┴───────────────┴──────────┘

BLOG TAB (Updated):
┌─────────────────────────────────────────────────────────────────────┐
│  [+ Create New Post]                                                │
├─────────────────────────────────────────────────────────────────────┤
│  Drafts (2)                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐
│  │  Post Title...        [Draft] [Category]    ✏️ 👁️ 📤 🗑️         │
│  └─────────────────────────────────────────────────────────────────┘
├─────────────────────────────────────────────────────────────────────┤
│  Published (5)                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐
│  │  Post Title...        [Published] [Category]  ✏️ 👁️ 📥 🗑️       │
│  └─────────────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────────────┘

TEAM PAGE (/author):
┌─────────────────────────────────────────────────────────────────────┐
│                           Our Team                                   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │       [AK]       │  │       [XY]       │  │       [ZZ]       │  │
│  │   Amir Khan      │  │   Author 2       │  │   Author 3       │  │
│  │   Founder        │  │   Title          │  │   Title          │  │
│  │   [View Profile] │  │   [View Profile] │  │   [View Profile] │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technical Details

### Markdown Renderer Features
The new `src/lib/markdown.tsx` will export a `renderMarkdown(content: string)` function that returns `React.ReactNode[]`:

- Parses content line-by-line
- Handles multi-line elements (lists, tables)
- Supports nested inline formatting (bold within links, etc.)
- Renders images with lazy loading and error states
- Uses React Router `<Link>` for internal links
- Falls back gracefully for unsupported syntax

### Author Dropdown in BlogEditor
Replace the text input with a Select component:
```text
Author: [▼ Select Author]
        ├── Amir Khan
        ├── Author 2
        └── + Add New Author
```

### Preview Button Flow
1. Click preview icon (Eye) on draft card
2. Opens BlogEditor in preview-only mode OR
3. Opens a separate BlogPreview modal with full public rendering

---

## Security Considerations

- All new tables will have RLS policies matching existing patterns
- Admin-only operations protected by `has_role(auth.uid(), 'admin')`
- Public read for published content only
- Authors table: public read for active authors, admin write

