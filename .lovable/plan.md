
# Automated Blog Content Creation System

## Overview

This system runs **behind the scenes** - no user-facing AI widgets. You (admin) control when content is generated through a simple button in the Admin panel. AI creates draft posts that you review before publishing.

## Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                         ADMIN PANEL                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Generate Content]  ← You click when ready             │   │
│  │                                                          │   │
│  │  Category: [Business Formation ▼]                        │   │
│  │  Topic Focus: [LLP vs OPC comparison]                    │   │
│  │                                                          │   │
│  │  [✓] Include latest regulatory updates                   │   │
│  │  [✓] Follow SEO best practices                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│            Edge Function: generate-blog-content                 │
│                            ↓                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  STEP 1: Gemini API (Research)                          │   │
│  │  - Search latest news on the topic                       │   │
│  │  - Find regulatory updates                               │   │
│  │  - Gather statistics and facts                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  STEP 2: Lovable AI (Content Creation)                  │   │
│  │  - Write professional blog post                         │   │
│  │  - Follow your markdown format                          │   │
│  │  - Include tables, blockquotes, proper headings        │   │
│  │  - SEO-optimized title and excerpt                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  DRAFT SAVED (is_published = false)                     │   │
│  │  → You review in Admin → Edit if needed → Publish       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Who Triggers It? You Do!

**No automatic scheduling** (to avoid surprise API costs). Instead:
- Button in Admin panel: "Generate New Content"
- You choose the category and optional topic focus
- AI generates a draft in 15-30 seconds
- You review, edit if needed, then publish

## How the Two AIs Work Together

| AI | Role | Cost |
|---|---|---|
| **Gemini API** (your key) | Research: finds latest news, regulatory changes, statistics on the topic | Your Gemini quota |
| **Lovable AI** (built-in) | Writing: creates the actual blog post with proper structure, tables, formatting | Included with Cloud |

**Why both?**
- Gemini excels at web search/research with Google Search grounding
- Lovable AI is already configured and great for structured content writing

## Blog Categories Supported

Based on your current posts:
- Business Formation (5 posts)
- Digital Presence (3 posts)
- Founder Insights (3 posts)
- Compliance (2 posts)
- Trust and Compliance (2 posts)
- Digital Setup, Expert Help, Visibility (1 each)

---

## Implementation Steps

### 1. Add GEMINI_API_KEY Secret
Store your Gemini API key in backend secrets (one-time setup).

### 2. Create Edge Function: generate-blog-content
Single function that:
- Receives category + optional topic from admin
- Calls Gemini for research (with search grounding)
- Calls Lovable AI to write the post
- Saves as draft in blog_posts table

### 3. Add Blog Management Tab to Admin Panel
New "Blog" tab with:
- "Generate Content" button + category selector
- List of all blog posts (drafts and published)
- Edit/Publish/Delete controls for each post

### 4. Blog Post Editor
Simple form to:
- Edit AI-generated content before publishing
- Preview how it will look
- Set is_published = true when ready

---

## Content Quality Guidelines (Built into AI Prompt)

The AI will be instructed to:
- Write in professional, narrative style (not bullet-point heavy)
- Include proper ## and ### headings for structure
- Use markdown tables for comparisons
- Add blockquotes for key takeaways
- Write SEO-friendly titles and excerpts
- Target 1500-2500 words per post
- Include internal links to Setupr services where relevant
- Author posts as "Amir Khan" for thought leadership

---

## Cost Estimate

| Action | Cost |
|---|---|
| Generate 1 blog post | ~1 Gemini API call + 1 Lovable AI call |
| Monthly (4 posts) | Minimal - well within free tiers |

Gemini API free tier: 15 RPM, 1M tokens/day
Lovable AI: Included with Cloud, rate-limited but sufficient for admin use

---

## Technical Details

### New Edge Function Structure

**File**: `supabase/functions/generate-blog-content/index.ts`

The function will:
1. Authenticate admin (check user role)
2. Call Gemini with search grounding for topic research
3. Pass research to Lovable AI with detailed writing instructions
4. Insert draft into blog_posts table
5. Return the created post ID

### Admin Panel Updates

**File**: `src/pages/Admin.tsx`

Add new tab:
- Blog management interface
- Generate content form
- Post list with edit/publish controls

### New Component

**File**: `src/components/admin/BlogEditor.tsx`

- Markdown editor for content
- Preview pane
- Save/Publish buttons

---

## Files to Create/Modify

| File | Action |
|---|---|
| `supabase/functions/generate-blog-content/index.ts` | Create - AI content generation |
| `supabase/config.toml` | Update - add function config |
| `src/pages/Admin.tsx` | Update - add Blog tab |
| `src/components/admin/BlogEditor.tsx` | Create - post editor component |
| `src/components/admin/BlogGenerator.tsx` | Create - generation form |
| `src/hooks/useBlogAdmin.ts` | Create - CRUD hooks for blog posts |

---

## Next Steps After Approval

1. Add your Gemini API key as a secret
2. Create the edge function
3. Build the admin interface
4. Test with one generated post
