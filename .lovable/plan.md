

## Plan: Platform-Wide Sign-In and PWA Setup

### 1. Unified Authentication Across the Platform

Currently, sign-in only exists on the store pages (`/store/login`, `/store/signup`). We'll unify this so the same account works everywhere.

**Changes:**

- **Create a unified `/login` and `/signup` page** that mirrors the store login/signup experience (email + Google Sign-In) but uses the main Navbar and platform branding instead of StoreNavbar.
- **Update the main Navbar** to show a "Sign In" button (when logged out) or a user avatar/dropdown (when logged in) with links to Dashboard and Sign Out -- replacing or alongside the current "Get Started" CTA.
- **Share authentication state** by importing `useStoreAuth` (or renaming it to a generic `useAuth` hook) across the platform. The existing `useStoreAuth` already handles email + Google via the same backend, so no new database changes are needed.
- **Add routes** for `/login` and `/signup` in `App.tsx`.
- **Redirect logic**: After login from the main platform, redirect to `/` (home). The store login pages will continue redirecting to `/store/dashboard`.

### 2. Installable Web App (PWA)

**Changes:**

- **Install `vite-plugin-pwa`** dependency.
- **Configure PWA in `vite.config.ts`** with a proper manifest (app name "Setupr", theme color, icons) and add `/~oauth` to `navigateFallbackDenylist` to keep OAuth working.
- **Add PWA meta tags** to `index.html` (viewport, theme-color, apple-touch-icon).
- **Create PWA icons** in the `public/` folder (192x192 and 512x512 variants using the existing Setupr icon).
- **Create an `/install` page** with instructions for adding the app to the home screen and a prompt trigger button.
- **Add route** for `/install` in `App.tsx`.

---

### Technical Details

**Files to create:**
- `src/pages/Login.tsx` -- Platform-wide login page (email + Google)
- `src/pages/Signup.tsx` -- Platform-wide signup page
- `src/pages/Install.tsx` -- PWA install prompt page
- `public/icons/icon-192x192.png` and `icon-512x512.png`

**Files to modify:**
- `src/components/Navbar.tsx` -- Add sign-in/user menu button
- `src/App.tsx` -- Add `/login`, `/signup`, `/install` routes
- `vite.config.ts` -- Add PWA plugin config
- `index.html` -- Add PWA meta tags and manifest link

**No database changes needed** -- the existing `customer_profiles` table and auth triggers handle new signups automatically.

