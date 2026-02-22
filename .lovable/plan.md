

# Cloud Marketplace for Setupr — Phase 1: Product Catalog + Browsing

## Architecture Overview

Instead of Shopify headless, we build directly on Lovable Cloud. This eliminates middleware, reduces cost, and keeps everything in one codebase.

```text
Customer Browser
       |
  Setupr Frontend (/store)
       |
  Lovable Cloud (Database + Edge Functions)
       |
  +----+----+
  |         |
Ingram    Stripe + Razorpay
Micro     (Phase 2)
API
```

## What Phase 1 Delivers

- `/store` route with product catalog browsing
- Product categories, search, filtering
- Individual product detail pages
- Customer authentication (signup/login)
- Customer dashboard shell (for future subscription management)
- Ingram Micro catalog sync via edge function
- Admin panel integration (manage products via CMS)

Checkout and payments are Phase 2.

---

## Implementation Steps

### Step 1: Database Schema — Store Tables

Create the following tables:

**`store_categories`** — Product categories (e.g., "Productivity", "Cloud Infrastructure", "Creative Tools")
- id, slug, name, description, icon, sort_order, is_active

**`store_products`** — Products synced from Ingram Micro
- id, ingram_sku, slug, name, short_description, long_description
- category_id (FK to store_categories)
- product_type: 'subscription' | 'license' | 'physical'
- vendor (Microsoft, Adobe, AWS, etc.)
- vendor_logo_url, featured_image_url
- base_price_inr, billing_cycle ('monthly' | 'annual' | 'one-time')
- is_active, is_featured, sort_order
- ingram_metadata (JSONB — raw API data for flexibility)
- created_at, updated_at

**`store_product_plans`** — Pricing tiers per product (e.g., Microsoft 365 Business Basic vs Premium)
- id, product_id (FK), plan_name, ingram_sku
- price_inr, billing_cycle, seat_minimum, seat_maximum
- features (JSONB array), sort_order, is_active

**`customer_profiles`** — Store customer data (separate from admin users)
- id, user_id (FK to auth.users), company_name, gstin
- billing_address, phone, is_verified
- created_at, updated_at

RLS policies:
- Products and categories: public read, admin write
- Customer profiles: users read/write own, admin read all
- Product plans: public read, admin write

### Step 2: Ingram Micro Catalog Sync — Edge Function

Create `supabase/functions/sync-ingram-catalog/index.ts`:

- Accepts admin-only requests to trigger a sync
- Calls Ingram Micro's Product Catalog API (GET /products with pagination)
- Upserts products into `store_products` and plans into `store_product_plans`
- Stores raw API response in `ingram_metadata` for future use
- Logs sync results (new/updated/skipped counts)

This requires storing Ingram Micro API credentials as secrets:
- `INGRAM_API_KEY`
- `INGRAM_API_SECRET`
- `INGRAM_CUSTOMER_NUMBER`
- `INGRAM_SANDBOX_URL` (for testing)

### Step 3: Customer Authentication

Add customer-facing auth pages (separate from admin login):

- `/store/login` — Email/password login
- `/store/signup` — Registration with company name, GSTIN (optional), phone
- `/store/dashboard` — Protected route, customer dashboard shell

Uses the existing Supabase auth system. Customer profiles are auto-created via a database trigger on signup.

Important: Customers and admins share the same auth system but have different roles and UI. The admin panel remains at `/admin`, the store dashboard is at `/store/dashboard`.

### Step 4: Frontend — Store Pages

**New pages to create:**

| Route | Component | Description |
|-------|-----------|-------------|
| `/store` | StoreLanding.tsx | Hero + featured products + categories |
| `/store/products` | StoreProducts.tsx | Full catalog with search, filters, category tabs |
| `/store/products/:slug` | StoreProductDetail.tsx | Product info, plans/pricing table, "Coming Soon" CTA |
| `/store/login` | StoreLogin.tsx | Customer login form |
| `/store/signup` | StoreSignup.tsx | Customer registration |
| `/store/dashboard` | StoreDashboard.tsx | Dashboard shell (subscriptions, orders — Phase 2 content) |

**Design approach:**
- Reuse Setupr's existing design system (glass cards, gradient accents, animations)
- Product cards follow the same style as service cards
- Category navigation similar to the services page structure
- Mobile-responsive grid layouts

**Key components to create:**

| Component | Purpose |
|-----------|---------|
| StoreNavbar.tsx | Store-specific nav with cart icon (disabled for Phase 1), account menu |
| StoreProductCard.tsx | Product card with vendor logo, name, starting price, billing cycle |
| StoreProductGrid.tsx | Filterable, searchable product grid |
| StoreCategoryFilter.tsx | Category sidebar/tabs for filtering |
| StoreSearchBar.tsx | Search across product names, vendors, descriptions |
| StorePlanTable.tsx | Pricing comparison table for product plans |
| StoreHero.tsx | Store landing hero section |

### Step 5: Navigation Integration

- Add "Store" link to the main Navbar (between Services and Resources)
- Add "Store" link to the Footer
- Store pages use a slightly modified layout with store-specific sub-navigation
- Update site_settings with store page content (hero title, subtitle, etc.) so it's CMS-editable

### Step 6: Admin Panel — Store Management

Add a new admin tab "Store" with:

- **Products**: View synced products, toggle active/featured, edit descriptions
- **Categories**: CRUD for store categories
- **Sync**: Button to trigger Ingram Micro catalog sync, view last sync status
- **Customers**: View registered store customers (Phase 2: order history)

This integrates into the existing admin dashboard tabs.

---

## Phase 2 Preview (Not in This Build)

For context on where this is heading:

- **Checkout flow**: Cart, Stripe + Razorpay payment, order creation
- **License provisioning**: Edge function calls Ingram Micro Order API on payment success
- **Subscription management**: Customer dashboard shows active licenses, renewal dates, seat counts
- **Invoice generation**: Pull from Ingram Micro Invoice API
- **Physical products**: Add shipping address collection, Ingram fulfillment API

---

## Technical Details

### New files to create

| File | Purpose |
|------|---------|
| src/pages/store/StoreLanding.tsx | Store home page |
| src/pages/store/StoreProducts.tsx | Product catalog |
| src/pages/store/StoreProductDetail.tsx | Product detail page |
| src/pages/store/StoreLogin.tsx | Customer login |
| src/pages/store/StoreSignup.tsx | Customer signup |
| src/pages/store/StoreDashboard.tsx | Customer dashboard |
| src/components/store/StoreNavbar.tsx | Store navigation |
| src/components/store/StoreProductCard.tsx | Product card component |
| src/components/store/StoreProductGrid.tsx | Product grid with filters |
| src/components/store/StoreCategoryFilter.tsx | Category filter |
| src/components/store/StoreSearchBar.tsx | Search component |
| src/components/store/StorePlanTable.tsx | Pricing plans table |
| src/components/store/StoreHero.tsx | Store hero section |
| src/components/store/StoreFooter.tsx | Store footer |
| src/components/admin/StoreManagement.tsx | Admin store tab |
| src/hooks/useStoreProducts.ts | Product data hooks |
| src/hooks/useStoreCategories.ts | Category data hooks |
| src/hooks/useStoreAuth.ts | Store customer auth |
| supabase/functions/sync-ingram-catalog/index.ts | Ingram Micro sync |

### Files to modify

| File | Change |
|------|--------|
| src/App.tsx | Add /store/* routes |
| src/components/Navbar.tsx | Add "Store" nav link |
| src/components/Footer.tsx | Add "Store" footer link |
| src/pages/Admin.tsx | Add "Store" admin tab |

### Database changes
- 4 new tables: store_categories, store_products, store_product_plans, customer_profiles
- RLS policies for all tables
- Trigger for auto-creating customer profile on signup
- ~15 new site_settings rows for store page CMS content

### Secrets needed
- INGRAM_API_KEY
- INGRAM_API_SECRET
- INGRAM_CUSTOMER_NUMBER
- INGRAM_SANDBOX_URL

### Implementation order
1. Database schema (tables + RLS + trigger)
2. Store page CMS settings (site_settings rows)
3. Customer auth (signup/login/profile)
4. Store UI components (cards, grid, filters, search)
5. Store pages (landing, catalog, detail)
6. Ingram Micro sync edge function
7. Admin store management tab
8. Navigation updates (Navbar + Footer)

