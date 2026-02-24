
# Fix Logos, Add Product Images, and Build Phase 2 (Cart + Checkout)

## Part A: Fix What's Broken Now

### 1. Better Vendor Logos
The Clearbit logos are loading but look poor on dark backgrounds. Fix by:
- Switching to higher-quality logo sources (SVG logos from `cdn.simpleicons.org` or similar) for major vendors
- Improving the card styling — remove the washed-out `bg-secondary p-1` container, use a clean white-background circle instead
- Update both `StoreProductCard.tsx` and `StoreProductDetail.tsx`
- Update `src/lib/vendorLogos.ts` with better logo URLs

### 2. Add Product Images
Currently `featured_image_url` is null for all products. Fix by:
- Adding curated product banner images for the 6 existing products (using vendor-specific imagery or product screenshots)
- Updating `StoreProductCard.tsx` to show the product image as a card header when available
- Updating `StoreProductDetail.tsx` to show a larger product image/hero
- Updating the sync function to attempt fetching product images from Ingram metadata

### 3. Physical Products from Ingram
The sync function already handles `product_type: 'physical'`. When you trigger a real sync (Dry Run or Sync Now from admin), it will pull whatever Ingram returns — including hardware. No code changes needed for this, just trigger the sync with your real credentials.

---

## Part B: Phase 2 — Cart and Checkout

### Step 1: Database Tables

**`store_cart_items`** — Server-side cart (persists across sessions)
- id, user_id (FK auth.users), product_id, plan_id (nullable), quantity, created_at, updated_at
- RLS: users read/write own items only

**`store_orders`** — Order records
- id, user_id, order_number (auto-generated), status ('pending', 'paid', 'provisioning', 'fulfilled', 'failed', 'refunded')
- payment_provider ('stripe' | 'razorpay'), payment_id, payment_status
- subtotal_inr, tax_inr, total_inr
- billing_address, gstin, company_name
- ingram_order_id (nullable — filled after provisioning)
- created_at, updated_at

**`store_order_items`** — Line items per order
- id, order_id (FK), product_id, plan_id (nullable), product_name, quantity, unit_price_inr, total_inr
- ingram_sku, license_key (nullable — filled after provisioning)

RLS: Users read own orders, admins read all, no direct inserts (orders created via edge function).

### Step 2: Cart UI

New components and pages:
- `src/components/store/CartDrawer.tsx` — Slide-out cart panel (accessible from StoreNavbar)
- `src/components/store/CartItem.tsx` — Individual cart item row
- `src/hooks/useCart.ts` — Cart hooks (add, remove, update quantity, clear)
- Update `StoreNavbar.tsx` — Enable cart icon with item count badge
- Update `StoreProductDetail.tsx` — Replace "Coming Soon" with "Add to Cart" button
- Update `StorePlanTable.tsx` — Add "Select Plan" buttons

### Step 3: Checkout Page

New page: `src/pages/store/StoreCheckout.tsx`
- Order summary with all cart items
- Billing details form (company name, GSTIN, address)
- Payment method selection (Stripe for international, Razorpay for India)
- "Place Order" button that calls the checkout edge function

### Step 4: Payment Edge Functions

**`supabase/functions/create-checkout/index.ts`**
- Validates cart items and calculates total
- Creates a `store_orders` record with status 'pending'
- Initiates Stripe or Razorpay payment session
- Returns payment URL/session ID to frontend

**`supabase/functions/handle-payment-webhook/index.ts`**
- Receives webhook from Stripe/Razorpay on payment success/failure
- Updates order status to 'paid' or 'failed'
- On success, triggers Ingram provisioning

**`supabase/functions/provision-ingram-order/index.ts`**
- Called after payment success
- Places order with Ingram Micro Order API
- Updates order with `ingram_order_id` and license keys
- Updates order status to 'fulfilled'

### Step 5: Customer Dashboard

Update `src/pages/store/StoreDashboard.tsx`:
- Show active orders and their statuses
- Display license keys for fulfilled software orders
- Show order history with receipts
- Subscription renewal dates and seat counts

### Step 6: Payment Gateway Setup

This will require new secrets:
- `STRIPE_SECRET_KEY` — For Stripe payments
- `STRIPE_WEBHOOK_SECRET` — For Stripe webhooks
- `RAZORPAY_KEY_ID` — For Razorpay payments
- `RAZORPAY_KEY_SECRET` — For Razorpay payments
- `RAZORPAY_WEBHOOK_SECRET` — For Razorpay webhooks

### Step 7: Routes and Navigation

Add new routes to `App.tsx`:
- `/store/checkout` — Checkout page (protected, requires login)

Update `StoreNavbar.tsx`:
- Cart icon with badge showing item count
- Cart drawer opens on click

---

## Technical Details

### New files to create

| File | Purpose |
|------|---------|
| `src/hooks/useCart.ts` | Cart state management hooks |
| `src/components/store/CartDrawer.tsx` | Slide-out cart panel |
| `src/components/store/CartItem.tsx` | Cart item row component |
| `src/pages/store/StoreCheckout.tsx` | Checkout page |
| `supabase/functions/create-checkout/index.ts` | Payment session creation |
| `supabase/functions/handle-payment-webhook/index.ts` | Payment confirmation handler |
| `supabase/functions/provision-ingram-order/index.ts` | Ingram order placement |

### Files to modify

| File | Change |
|------|--------|
| `src/lib/vendorLogos.ts` | Better logo URLs |
| `src/components/store/StoreProductCard.tsx` | Fix logo styling, add product image |
| `src/pages/store/StoreProductDetail.tsx` | Fix logo, add product image, "Add to Cart" button |
| `src/components/store/StorePlanTable.tsx` | Add "Select Plan" buttons |
| `src/components/store/StoreNavbar.tsx` | Enable cart with badge |
| `src/pages/store/StoreDashboard.tsx` | Orders, licenses, history |
| `src/App.tsx` | Add checkout route |
| `src/components/admin/StoreManagement.tsx` | Order management section |

### Database changes
- 3 new tables: `store_cart_items`, `store_orders`, `store_order_items`
- RLS policies for all tables
- Auto-generate order numbers via trigger

### Secrets needed (Phase 2)
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- RAZORPAY_WEBHOOK_SECRET

### Implementation order
1. Fix vendor logos and add product images (immediate visual fix)
2. Create cart database tables and hooks
3. Build cart UI (drawer, navbar badge)
4. Add "Add to Cart" to product pages
5. Build checkout page
6. Set up Stripe + Razorpay edge functions
7. Build payment webhook handler
8. Build Ingram provisioning function
9. Update customer dashboard with orders
10. Add order management to admin panel
