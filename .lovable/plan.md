

# Complete Store Post-Payment & Authentication Upgrade

## Issues Identified

1. **Order number showing "#TEMP"** -- The `create-razorpay-order` function inserts `order_number: "TEMP"` with a comment "trigger will generate", but no such database trigger exists. The order number stays as "TEMP" forever.

2. **No order confirmation email** -- After successful payment verification, no email is sent to the customer. The `verify-razorpay-payment` function only updates order status and clears the cart.

3. **Dashboard "Coming Soon" placeholders** -- The Subscriptions, Invoices, Payment Methods, and Account Settings cards are all static placeholders with no functionality.

4. **No Google Sign-In** -- Login and signup pages only support email/password.

5. **Subscription management missing** -- For subscription-based products, there's no recurring billing or subscription tracking.

---

## Plan

### 1. Auto-Generate Order Numbers (Database Trigger)

Create a database trigger that generates a proper order number (e.g., `SETUPR-20260226-0001`) on insert, replacing the "TEMP" value.

- Create a sequence-based function `generate_order_number()`
- Attach a `BEFORE INSERT` trigger on `store_orders`
- Format: `SETUPR-YYYYMMDD-NNNN` (sequential per day)

### 2. Order Confirmation Email (New Edge Function)

Create a new `send-order-confirmation` edge function that sends a professional order confirmation email to the customer via Resend.

- Called from `verify-razorpay-payment` after successful payment verification
- Sends to the customer's email with: order number, items purchased, total amount, GST breakdown
- Also sends a copy/notification to the admin email
- Uses the existing `noreply@setupr.com` sender

### 3. Fix `verify-razorpay-payment` to Return Updated Order Number

After verifying payment, re-fetch the order to get the trigger-generated order number and return it to the frontend. Update the checkout page to display the correct order number from the verification response.

### 4. Build Active Dashboard (Replace "Coming Soon")

Replace the four placeholder cards with functional sections:

**a. Order History** -- Query `store_orders` for the logged-in user, display order list with status, date, total, and expandable order items.

**b. Account Settings** -- Allow editing company name, GSTIN, phone, billing address on the `customer_profiles` table.

The Subscriptions and Invoices cards will remain as "Coming Soon" for now since true recurring billing requires Razorpay Subscriptions API integration (a larger feature). Payment Methods is managed by Razorpay directly.

### 5. Enable Google Sign-In

Google Sign-In is free and managed automatically by the platform.

- Use the Configure Social Login tool to set up Google OAuth
- Add a "Sign in with Google" button to both `/store/login` and `/store/signup` pages
- Use `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })` 
- Handle the OAuth callback to redirect to `/store/dashboard`

### 6. Store Order RLS Policy for Customer Access

Add an RLS policy so customers can read their own orders (needed for the dashboard order history).

---

## Technical Details

### Database Migration

```sql
-- 1. Order number generation function + trigger
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  today TEXT;
  seq INT;
BEGIN
  today := to_char(NOW(), 'YYYYMMDD');
  SELECT COUNT(*) + 1 INTO seq
  FROM store_orders
  WHERE to_char(created_at, 'YYYYMMDD') = today;
  NEW.order_number := 'SETUPR-' || today || '-' || LPAD(seq::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
BEFORE INSERT ON store_orders
FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- 2. RLS: customers can read their own orders & order items
CREATE POLICY "Users can view own orders"
ON store_orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own order items"
ON store_order_items FOR SELECT
USING (order_id IN (SELECT id FROM store_orders WHERE user_id = auth.uid()));

-- 3. RLS: customers can update their own profile
CREATE POLICY "Users can update own profile"
ON customer_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can read own profile"
ON customer_profiles FOR SELECT
USING (auth.uid() = user_id);
```

### New Edge Function: `send-order-confirmation`
- Accepts `orderId` and `userEmail`
- Fetches order + items from DB
- Sends styled HTML email via Resend to customer
- Sends admin notification

### Files to Create
- `supabase/functions/send-order-confirmation/index.ts`

### Files to Modify
- `supabase/functions/verify-razorpay-payment/index.ts` -- call confirmation email, return real order number
- `supabase/functions/create-razorpay-order/index.ts` -- remove hardcoded "TEMP" (let trigger handle it)
- `src/pages/store/StoreDashboard.tsx` -- replace placeholders with Order History + Account Settings
- `src/pages/store/StoreCheckout.tsx` -- use order number from verification response
- `src/pages/store/StoreLogin.tsx` -- add Google Sign-In button
- `src/pages/store/StoreSignup.tsx` -- add Google Sign-In button
- `src/hooks/useStoreAuth.ts` -- add Google OAuth helper

