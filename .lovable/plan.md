# Phase 2 Roadmap: From Browsing to Purchasing

&nbsp;

# Add Vendor Logos, Real Ingram Sync, and Hardware Support

## 1. Add Vendor Logos to Existing Products

Update all 6 sample products with official vendor logo URLs. These use publicly available CDN-hosted logos that render well at small sizes on dark backgrounds.

| Vendor | Logo Source |

|--------|------------|

| Microsoft | Microsoft's official logo (via [logo.clearbit.com](http://logo.clearbit.com) or similar CDN) |

| Google | Google logo |

| Adobe | Adobe logo |

| Amazon (AWS) | AWS logo |

| Zoho | Zoho logo |

This is a data update to `store_products.vendor_logo_url` for each product.

## 2. Add Vendor Logo Auto-Mapping in Sync Function

Update the `sync-ingram-catalog` edge function to automatically assign vendor logos when syncing from Ingram Micro. A lookup map of known vendors to their logo URLs ensures every synced product gets a proper logo without manual work.

## 3. Add Fallback Logo Component

Update `StoreProductCard` and `StoreProductDetail` to use a smarter fallback — instead of just showing the first letter, use a vendor-name-to-logo mapping directly in the frontend as well. This covers both synced and manually added products.

## 4. Add Hardware Category and Product Type Support

- Insert a new "Hardware" store category (laptops, networking, peripherals)

- The product card already displays `product_type` as a badge — no UI changes needed

- The sync function already maps `productType === "physical"` correctly

## 5. Improve Ingram Micro Sync for Real Usage

Update the sync edge function to:

- Support pagination (loop through all pages, not just first 100)

- Auto-assign `category_id` based on vendor/product type mapping

- Better field mapping based on actual Ingram Micro API response structure

- Add a "dry run" mode to preview what would sync before committing

## 6. Add "Sync Now" Status Feedback in Admin

Currently the admin Store tab has a sync button. Enhance it to show:

- Last sync timestamp

- Number of products synced/skipped

- Error details if sync failed

---

## Technical Details

### Files to modify

| File | Change |

|------|--------|

| `supabase/functions/sync-ingram-catalog/index.ts` | Add vendor logo mapping, pagination, category auto-assignment, dry-run mode |

| `src/components/store/StoreProductCard.tsx` | Add frontend vendor logo fallback map |

| `src/pages/store/StoreProductDetail.tsx` | Same vendor logo fallback |

| `src/components/admin/StoreManagement.tsx` | Show sync status/results feedback |

### Data updates

- Update `vendor_logo_url` on all 6 existing products

- Insert "Hardware" category into `store_categories`

### Vendor logo map (used in both edge function and frontend)

```text

Microsoft  -> [https://logo.clearbit.com/microsoft.com](https://logo.clearbit.com/microsoft.com)

Google     -> [https://logo.clearbit.com/google.com](https://logo.clearbit.com/google.com)

Adobe      -> [https://logo.clearbit.com/adobe.com](https://logo.clearbit.com/adobe.com)

Amazon/AWS -> [https://logo.clearbit.com/aws.amazon.com](https://logo.clearbit.com/aws.amazon.com)

Zoho       -> [https://logo.clearbit.com/zoho.com](https://logo.clearbit.com/zoho.com)

```

### Implementation order

1. Update existing product data with vendor logos

2. Add hardware category

3. Update frontend components with vendor logo fallback map

4. Enhance sync edge function (pagination, logo mapping, categories, dry-run)

5. Improve admin sync UI with status feedback

&nbsp;

&nbsp;

## What You Asked

1. Do you need real API credentials instead of sandbox?
2. What's needed before customers can purchase?
3. How are prices/margins decided?

## Answers and Next Steps

### 1. API Credentials

Your current setup uses sandbox credentials. When ready to go live:

- Swap `INGRAM_SANDBOX_URL` to production URL
- Update `INGRAM_API_KEY` and `INGRAM_API_SECRET` with production credentials
- No code changes needed — just secret updates

### 2. Remaining Work Before Purchase is Possible

```text
Phase 1 (DONE)              Phase 2 (TODO)
-----------------           ------------------
Product catalog             Cart system
Category browsing           Checkout flow
Search + filtering          Stripe integration
Product detail pages        Razorpay integration
Customer signup/login       Order creation
Customer dashboard shell    Ingram order provisioning
Admin store management      License delivery
Ingram catalog sync         Invoice/receipt generation
```

### 3. Pricing Strategy — Needs Your Decision

The current sample data has placeholder prices. When real Ingram sync runs, we need a margin strategy:

**Option A: Auto-markup during sync**

- Apply a configurable percentage (e.g., 15%) on top of Ingram's reseller price
- Stored as a setting in the admin panel
- Pros: Fully automated, scales with catalog
- Cons: Less control per product

**Option B: Manual pricing in admin**

- Sync products from Ingram but leave `base_price_inr` for admin to set manually
- Pros: Full control over every price
- Cons: More work as catalog grows

**Option C: Hybrid (recommended)**

- Auto-markup applied during sync as a default
- Admin can override any product's price manually
- A `price_override` column tracks whether the price was manually set
- Re-syncs skip overridden prices

### Proposed Implementation for Phase 2

#### Step 1: Pricing Strategy

- Add `markup_percentage` to site_settings (admin-editable)
- Add `price_override` boolean to `store_products`
- Update sync function to apply markup and respect overrides

#### Step 2: Vendor Logos

- Update existing products with vendor logo URLs (Clearbit CDN)
- Add frontend fallback logo mapping
- Add logo auto-assignment in sync function

#### Step 3: Hardware Category

- Add "Hardware" category to store_categories
- System already supports `product_type: 'physical'`

#### Step 4: Cart and Checkout

- Create cart table (or client-side cart for simplicity)
- Build checkout page with order summary
- Integrate Stripe for international payments
- Integrate Razorpay for Indian payments

#### Step 5: Order and Provisioning

- Create `store_orders` and `store_order_items` tables
- Edge function to call Ingram Micro Order API on payment success
- License key delivery to customer dashboard

#### Step 6: Customer Dashboard

- Show active subscriptions/licenses
- Renewal dates and seat counts
- Order history and invoices

---

## Technical Details

### Database additions needed


| Table               | Purpose                           |
| ------------------- | --------------------------------- |
| `store_orders`      | Order records with payment status |
| `store_order_items` | Line items per order              |
| `store_cart_items`  | Optional server-side cart         |


### New columns on existing tables


| Table            | Column                         | Purpose                              |
| ---------------- | ------------------------------ | ------------------------------------ |
| `store_products` | `price_override` (boolean)     | Whether admin manually set the price |
| `site_settings`  | Row: `store_markup_percentage` | Default margin percentage            |


### Edge functions needed


| Function                 | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `create-checkout`        | Generate Stripe/Razorpay payment session |
| `handle-payment-webhook` | Process payment confirmation             |
| `provision-ingram-order` | Place order with Ingram Micro API        |


### Files to modify


| File                                              | Change                                            |
| ------------------------------------------------- | ------------------------------------------------- |
| `supabase/functions/sync-ingram-catalog/index.ts` | Add markup logic, vendor logo mapping, pagination |
| `src/components/store/StoreProductCard.tsx`       | Add vendor logo fallback                          |
| `src/pages/store/StoreProductDetail.tsx`          | Add vendor logo fallback                          |
| `src/components/admin/StoreManagement.tsx`        | Add markup settings, sync status                  |


### Immediate next step (this session)

Update vendor logos on existing products, add the hardware category, and implement the pricing markup system — so the catalog looks production-ready while we plan the checkout flow.