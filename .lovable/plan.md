# One-time Test → Live CMS reset + future-safety memory rule

Click **Implement plan** to execute. Two actions only, both server-side. Zero code/UI changes.

## Action 1: Copy all `site_settings` rows from Test into Live

- Reads every row currently in Test `site_settings` (~150 rows: hero text, service descriptions, legal pages, footer, SEO, etc.).
- Upserts each into Live with `ON CONFLICT (key) DO UPDATE`. Live's existing rows for the same keys get overwritten with Test values (intended: Live is mostly empty, Test holds your real edits).
- Other tables (`blog_posts`, `services`, `store_orders`, `customer_profiles`, etc.) are NOT touched.
- After this runs, setupr.com will instantly match what you see in the preview.

## Action 2: Save a permanent project memory rule

A new memory file `mem://constraints/cms-sync-policy` will be created and added to the index, stating:

> Test→Live `site_settings` syncs must always be **scoped to specific new keys** with `ON CONFLICT (key) DO NOTHING`. The blanket overwrite from 2026-05-09 was a one-time reset because Live was empty. Never run a blanket upsert on `site_settings` again. Live admin edits on setupr.com are the source of truth going forward.

This rule will be loaded by every future AI session, so even months from now no agent can accidentally overwrite your Live admin edits.

## What you do after I implement

1. Verify setupr.com homepage now matches the preview.
2. From now on, edit content on **setupr.com/admin** (Live), not the preview's admin.
3. Use the preview's admin only to test new fields when I add new CMS-driven sections.

## What I will NOT do

- No code changes.
- No schema changes.
- No edits to other tables.
- No future blanket syncs (locked in by memory).
