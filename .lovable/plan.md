
# Visual CMS Admin Dashboard Refactor

## Overview

This plan transforms the current disconnected admin dashboard into a **Visual CMS** where you edit content in-context, seeing exactly how it will appear on the live site. The core principle: "Edit what you see, see what you edit."

---

## Current State Analysis

**What's Working Well:**
- Site settings system (`site_settings` table + `useSiteSettings` hook)
- Service editor with preview capability in `ServiceSettingsSection.tsx`
- Blog editor with markdown preview in `BlogEditor.tsx`
- Modular admin structure with tabs (Services, Blog, Team, etc.)
- Unified markdown parser (`src/lib/markdown.tsx`)

**What Needs Improvement:**
- Page settings use form dialogs instead of visual editing
- Service editor preview is static, not interactive
- Blog preview doesn't match exact live styling
- Homepage sections have hardcoded content not editable via admin
- No section visibility toggles
- No inline edit mode for text elements

---

## Architecture: Live Editor System

```
+------------------+     +-------------------+     +------------------+
|   Admin Shell    |---->|   Page Editor     |---->|  Live Component  |
|   (Navigation)   |     |   (Edit Context)  |     |  (Edit Mode)     |
+------------------+     +-------------------+     +------------------+
                                  |
                         +--------v--------+
                         |  EditableText   |
                         |  EditableImage  |
                         |  SectionToggle  |
                         +------------------+
```

### Core Components to Create

1. **EditModeContext** - Global context to toggle edit mode on/off
2. **EditableText** - Wrapper that makes text clickable/editable
3. **EditableImage** - Wrapper with "Replace" overlay for images
4. **SectionToggle** - Visibility controls for homepage sections
5. **PageEditor** - Wrapper that loads live components with edit capabilities

---

## Phase 1: Foundation - Editable Primitives

### 1.1 Create EditModeContext

New file: `src/contexts/EditModeContext.tsx`

Provides:
- `isEditMode` - boolean state
- `toggleEditMode` - function to switch modes
- `pendingChanges` - track unsaved edits
- `saveAllChanges` - batch save to database

### 1.2 Create EditableText Component

New file: `src/components/admin/editable/EditableText.tsx`

Features:
- Renders normal text when edit mode is off
- Renders inline input/textarea when edit mode is on
- Highlights on hover with dashed border
- Click to activate inline editing
- Auto-saves on blur or Enter key
- Supports: headings (h1-h6), paragraphs, spans, buttons

### 1.3 Create EditableImage Component

New file: `src/components/admin/editable/EditableImage.tsx`

Features:
- Shows "Replace" overlay on hover in edit mode
- Click opens image URL input modal
- Preview before saving
- Fallback placeholder if image fails

---

## Phase 2: Page-Level Visual Editors

### 2.1 Homepage Visual Editor

Refactor: `src/pages/Index.tsx` and homepage components

**Make these sections editable:**

| Section | Component | Editable Fields |
|---------|-----------|-----------------|
| Hero | `HeroSection.tsx` | Subtitle, CTA buttons |
| Trust Stats | `TrustStats.tsx` | Stats values, labels, descriptions |
| Goal Cards | `GoalCards.tsx` | Card titles, descriptions |
| Bundles | `RecommendedBundles.tsx` | Already DB-driven |
| Services | `CollapsibleServices.tsx` | Already DB-driven |
| How It Works | `HowItWorks.tsx` | Step titles, descriptions |
| Testimonials | `Testimonials.tsx` | Already DB-driven |
| FAQ | `FAQ.tsx` | Questions and answers |
| Final CTA | `FinalCTA.tsx` | Title, subtitle, button text |

**New Section Manager:**
- Add visibility toggles to each section
- Store visibility state in `site_settings` (e.g., `homepage_section_testimonials_visible`)
- Drag-and-drop reordering (stretch goal)

### 2.2 Service Page Visual Editor

Refactor: `src/pages/ServiceDetail.tsx`

Current state: Uses hardcoded content with `site_settings` override capability

Changes:
- Wrap all text blocks with `EditableText`
- When admin visits `/service/:id` in edit mode, show edit controls
- Inline editing for: Who It's For, Deliverables, Process Steps, FAQ, Pricing Card text
- Changes save to `service_{serviceId}_{fieldKey}` in site_settings

### 2.3 Blog Visual Editor

Refactor: `src/components/admin/BlogEditor.tsx`

Current state: Split Edit/Preview tabs

Changes:
- Create side-by-side layout: Editor on left (40%), Live Preview on right (60%)
- Live preview uses exact `BlogPost.tsx` styling
- WYSIWYG toolbar for common markdown actions (bold, italic, headers, links)
- Real-time preview updates as you type

---

## Phase 3: Admin Dashboard Restructure

### 3.1 New Navigation Structure

```
Admin Dashboard
├── Pages (Visual Editor)
│   ├── Home
│   ├── About
│   ├── Contact
│   ├── Career
│   └── Services Overview
├── Service Pages
│   └── [List of individual services with Edit buttons]
├── Blog
│   └── [Enhanced visual editor]
├── Team
├── Testimonials
├── Intake Submissions
└── Settings
    ├── Legal Documents
    └── Footer & Social Links
```

### 3.2 Page Editor Component

New file: `src/components/admin/PageEditor.tsx`

Structure:
```
+-----------------------------------------------+
|  Edit Mode: [Toggle]    [Save All]  [Preview] |
+-----------------------------------------------+
|                                               |
|     [ Live Page Component Rendered Here ]     |
|     (with EditableText/EditableImage          |
|      wrappers active in edit mode)            |
|                                               |
+-----------------------------------------------+
```

### 3.3 Section Manager for Homepage

New file: `src/components/admin/SectionManager.tsx`

Features:
- List all homepage sections with toggle switches
- Show/hide sections without deleting content
- Preview indicator showing section order
- Quick-edit button to jump to section

---

## Phase 4: Technical Implementation Details

### 4.1 Database Keys Structure

Expand `site_settings` key conventions:

```
# Page content
{page}_{section}_{field}
Example: homepage_hero_subtitle

# Section visibility  
{page}_section_{section}_visible
Example: homepage_section_testimonials_visible

# Service page overrides
service_{serviceId}_{field}
Example: service_gst-reg_faq
```

### 4.2 Component Modifications

**Files to Update:**

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Add "Pages" tab with visual editor navigation |
| `src/pages/Index.tsx` | Wrap with EditModeProvider when admin |
| `src/components/HeroSection.tsx` | Wrap text with EditableText |
| `src/components/TrustStats.tsx` | Fetch stats from settings, make editable |
| `src/components/HowItWorks.tsx` | Wrap step content with EditableText |
| `src/components/FAQ.tsx` | Make FAQs editable inline |
| `src/components/FinalCTA.tsx` | Wrap CTA text with EditableText |
| `src/pages/ServiceDetail.tsx` | Add inline editing for all sections |
| `src/components/admin/BlogEditor.tsx` | Split layout with live preview |

### 4.3 New Files to Create

```
src/contexts/EditModeContext.tsx
src/components/admin/editable/EditableText.tsx
src/components/admin/editable/EditableImage.tsx
src/components/admin/PageEditor.tsx
src/components/admin/SectionManager.tsx
src/components/admin/VisualPageList.tsx
src/components/admin/ServicePageEditor.tsx
```

---

## Phase 5: Blog Editor Enhancement

### Current Blog Editor Issues:
- Preview tab shows different styling than live
- No WYSIWYG toolbar
- No side-by-side editing

### Enhanced Blog Editor:

```
+------------------------------------------+
| Title: [_____________________________]   |
| Excerpt: [___________________________]   |
| Category: [Dropdown] Author: [Dropdown]  |
+------------------------------------------+
| Toolbar: [B] [I] [H2] [Link] [Image]     |
+-------------------+----------------------+
|                   |                      |
|   Markdown        |   Live Preview       |
|   Editor          |   (BlogPost styles)  |
|   (40%)           |   (60%)              |
|                   |                      |
+-------------------+----------------------+
```

Features:
- Split-pane view with drag-to-resize
- Toolbar inserts markdown syntax
- Preview uses exact `BlogPost.tsx` component styling
- Featured image preview in header area

---

## Implementation Order

### Immediate (Fix existing issues):
1. Update TrustStats, HowItWorks, FAQ, FinalCTA to fetch from `site_settings`
2. Fix service editor to properly save/load custom content
3. Enhance blog editor with side-by-side preview

### Short-term (Visual editing foundation):
4. Create EditModeContext
5. Create EditableText component
6. Create PageEditor wrapper
7. Refactor Admin.tsx with new Pages tab

### Medium-term (Full visual CMS):
8. Implement SectionManager for homepage
9. Add inline editing to all homepage sections
10. Create ServicePageEditor with live component rendering
11. Add EditableImage component

---

## Technical Notes

### Authentication Check for Edit Mode
Edit mode only activates when:
- User is authenticated
- User has admin role
- Edit toggle is enabled

### Auto-save vs Manual Save
- Option 1: Auto-save on blur (current service editor approach)
- Option 2: Batch save with "Save All" button
- Recommendation: Batch save to prevent excessive database calls

### Performance Considerations
- EditableText wrappers are no-ops when edit mode is off
- Lazy load edit components only when admin
- Use React.memo for editable wrappers

---

## Success Criteria

After implementation:
1. Admin can toggle "Edit Mode" on any page
2. Clicking text in edit mode opens inline editor
3. Changes preview instantly before saving
4. Homepage sections can be shown/hidden via toggles
5. Service pages show full live layout in admin with inline editing
6. Blog editor shows true WYSIWYG with live blog styling
7. All changes persist to database and appear on live site

