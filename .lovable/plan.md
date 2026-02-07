# Visual CMS Admin Dashboard Refactor

## Status: Phase 1 Complete ✅

---

## Completed Work

### Phase 1: Foundation - Editable Primitives ✅

**Created Files:**
- `src/contexts/EditModeContext.tsx` - Global context for edit mode toggle, pending changes tracking, and batch save
- `src/components/admin/editable/EditableText.tsx` - Inline text editing with hover highlights and auto-save
- `src/components/admin/editable/EditableImage.tsx` - Image wrapper with replace overlay and URL input modal
- `src/components/admin/editable/EditModeToolbar.tsx` - Floating toolbar with save/discard controls
- `src/components/admin/editable/index.ts` - Barrel export

**Created Visual CMS Components:**
- `src/components/admin/PageEditor.tsx` - Wrapper for visual page editing with edit mode
- `src/components/admin/SectionManager.tsx` - Section visibility toggles for homepage
- `src/components/admin/VisualPageList.tsx` - Page selection interface for visual editing

**Enhanced Blog Editor:**
- Refactored `src/components/admin/BlogEditor.tsx` with side-by-side split view (40% editor / 60% preview)
- Added markdown toolbar with common formatting actions
- Live preview uses exact same styling as public BlogPost page

**Updated Admin Dashboard:**
- Added new "Pages" tab as the default view
- Integrated VisualPageList and SectionManager components
- New navigation structure with Pages first

**Made Homepage Sections Toggleable:**
- Updated `src/pages/Index.tsx` with PageEditorWrapper and section visibility checks
- Updated `src/components/TrustStats.tsx` to be database-driven with EditableText support

**Updated Site Settings:**
- Enhanced `src/hooks/useSiteSettings.ts` to support "visibility" category for section toggles

---

## Architecture Summary

```
EditModeContext (Global State)
├── isEditMode (boolean toggle)
├── pendingChanges (Map of unsaved edits)
├── saveAllChanges (batch save to DB)
└── discardAllChanges (revert all)

PageEditorWrapper (Authentication Check)
├── Renders children for non-admins
└── Adds EditModeProvider + Toolbar for admins

EditableText/EditableImage (Inline Editors)
├── Normal rendering when edit mode off
├── Click-to-edit when edit mode on
└── Auto-saves changes to pending queue

SectionManager (Visibility Controls)
├── Toggle switches for each homepage section
└── Persists to site_settings table
```

---

## Database Keys Structure

```
# Page content (category: "content")
homepage_hero_subtitle
homepage_cta_primary
homepage_trust_title
homepage_stat_{id}_label
homepage_stat_{id}_desc

# Section visibility (category: "visibility")
homepage_section_hero_visible
homepage_section_trust_stats_visible
homepage_section_goal_cards_visible
...

# Service overrides (category: "content")
service_{serviceId}_faq
service_{serviceId}_deliverables
```

---

## Remaining Work

### Phase 2: Page-Level Visual Editors

**Homepage Editable Sections:**
- [ ] HeroSection.tsx - Add EditableText wrappers
- [ ] GoalCards.tsx - Make cards editable
- [ ] HowItWorks.tsx - Add EditableText (already has DB support)
- [ ] FAQ.tsx - Make questions/answers editable
- [ ] FinalCTA.tsx - Add EditableText (already has DB support)

**Service Page Editor:**
- [ ] Create ServicePageEditor.tsx for inline editing of service details
- [ ] Update ServiceDetail.tsx with EditableText wrappers

### Phase 3: Advanced Features

- [ ] Implement actual visual editing when selecting a page (iframe or live preview)
- [ ] Add drag-and-drop reordering for sections
- [ ] Implement real-time preview updates
- [ ] Add undo/redo support

### Phase 4: Polish

- [ ] Performance optimization for edit mode
- [ ] Drag-to-resize panels in blog editor
- [ ] Image upload integration (storage bucket)

---

## Success Criteria

After full implementation:
1. ✅ Admin can toggle "Edit Mode" on any page
2. ✅ Clicking text in edit mode opens inline editor
3. ✅ Changes preview instantly before saving
4. ✅ Homepage sections can be shown/hidden via toggles
5. ⏳ Service pages show full live layout in admin with inline editing
6. ✅ Blog editor shows true WYSIWYG with live blog styling
7. ✅ All changes persist to database and appear on live site
