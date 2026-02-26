

# Update Email Sender to noreply@setupr.com

## What's Happening

Now that your setupr.com domain is verified in Resend, you can send emails from any address @setupr.com — including noreply@setupr.com. No special "noreply" setup is needed; it's just an address you send from (replies to it will bounce since there's no mailbox behind it).

## Changes Required

### 1. Update the FROM_EMAIL Secret
Change the stored `FROM_EMAIL` value from its current setting to `noreply@setupr.com`. This is used by both the contact form and intake notification functions.

### 2. Update notify-admin Edge Function
The `notify-admin` function has a hardcoded fallback value for the `from` field:
```
const fromEmail = Deno.env.get("FROM_EMAIL") || "Business Setup <onboarding@resend.dev>";
```
This needs to be updated so the fallback also uses the verified domain:
```
const fromEmail = Deno.env.get("FROM_EMAIL") || "Setupr <noreply@setupr.com>";
```

Additionally, the email is sent with the raw `fromEmail` value. Both functions should wrap it with a display name for a professional look, e.g. `Setupr <noreply@setupr.com>`.

### 3. Update send-contact-email Edge Function
Similarly, this function has:
```
const fromEmail = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
```
Update the fallback and ensure the display name is consistent:
```
const fromEmail = Deno.env.get("FROM_EMAIL") || "noreply@setupr.com";
```
The function already wraps it as `Setupr Contact <${fromEmail}>` and `Setupr <${fromEmail}>`, so it will render as `Setupr <noreply@setupr.com>` — which looks professional.

## Technical Details

**Files to modify:**
- `supabase/functions/notify-admin/index.ts` — Update the `fromEmail` fallback value (line 6)
- `supabase/functions/send-contact-email/index.ts` — Update the `fromEmail` fallback value (line 68)

**Secret to update:**
- `FROM_EMAIL` → set to `noreply@setupr.com`

**Result:** All outgoing emails (contact form confirmations, intake notifications, admin alerts) will be sent from `noreply@setupr.com` with your verified domain — no more sandbox restrictions.
