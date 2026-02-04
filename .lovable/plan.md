
# Admin Account Setup Plan

## Overview

To access the Admin panel at `/admin/login`, you need:
1. A user account in the app's authentication system
2. An admin role assigned to that account in the `user_roles` table

I'll create a secure edge function that uses the Supabase Admin API to create your account and assign the admin role.

---

## How It Works

```text
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN SETUP FLOW                         │
│                                                             │
│  Step 1: You provide email + password                       │
│                 ↓                                           │
│  Step 2: Edge function creates auth user (Admin API)        │
│                 ↓                                           │
│  Step 3: Edge function inserts row in user_roles table      │
│                 ↓                                           │
│  Step 4: You can now login at /admin/login                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Steps

### 1. Create Edge Function: `create-admin-user`

A **one-time use** function that:
- Accepts email and password
- Uses the `SUPABASE_SERVICE_ROLE_KEY` (already configured) to call the Admin API
- Creates the user in `auth.users`
- Inserts the admin role in `user_roles`
- Returns success confirmation

The function will be protected with a secret key to prevent unauthorized access.

### 2. Call the Function

I'll provide you with a simple way to trigger this (either via curl command or a temporary UI element).

### 3. Remove or Disable the Function

After your account is created, the function should be deleted for security.

---

## Security Measures

| Measure | Description |
|---------|-------------|
| **Secret Key** | Function requires a secret key in the request body that only you know |
| **One-Time Use** | After creating your admin, we delete the function |
| **Service Role Key** | Uses existing `SUPABASE_SERVICE_ROLE_KEY` (already in secrets) |
| **No Public Signup** | No signup form exposed to the public |

---

## What I'll Create

| File | Purpose |
|------|---------|
| `supabase/functions/create-admin-user/index.ts` | Edge function to create admin account |
| Update `supabase/config.toml` | Register the new function |

---

## After Implementation

1. I'll provide you a curl command or test the function directly
2. You'll provide your desired email and password
3. Once your account is created, you can login at `/admin/login`
4. I'll delete the edge function for security

---

## Technical Details

### Edge Function Logic

```typescript
// Pseudocode
1. Validate request has secret key (prevent unauthorized access)
2. Extract email + password from request body
3. Use supabaseAdmin.auth.admin.createUser() to create the user
4. Insert { user_id, role: 'admin' } into user_roles table
5. Return success message
```

### Required Secrets (Already Available)

- `SUPABASE_SERVICE_ROLE_KEY` - Already configured
- `SUPABASE_URL` - Already configured

---

## Questions Before Proceeding

I need two pieces of information from you:

1. **Email** - The email address you want to use for admin login
2. **Password** - A secure password (minimum 6 characters)

Once you approve this plan and provide these details, I'll create the edge function and set up your admin account.
