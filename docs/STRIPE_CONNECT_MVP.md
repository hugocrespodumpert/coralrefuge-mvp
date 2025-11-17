# Stripe Connect Platform - MVP Setup Guide

## Overview

Coral Refuge uses **Stripe Connect** to automatically split payments between the platform (15%) and conservation partners (85%). This creates a true marketplace model - just like Airbnb, but for coral reef protection.

### MVP Configuration

**Partner:** HEPCA (Hurghada Environmental Protection and Conservation Association)
**Manages:** Ras Mohammed + Giftun Islands
**Split:** 15% Platform / 85% Partner

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ Sponsor pays $50 for 1 hectare                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   Stripe Processing    │
         └────────────────────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
┌─────────────────┐      ┌─────────────────┐
│ Platform (15%)  │      │  HEPCA (85%)    │
│    $7.50        │      │    $42.50       │
│ Coral Refuge    │      │ Instant receipt │
└─────────────────┘      └─────────────────┘
```

### Key Benefits

✅ **Instant Transfers** - Partners receive funds immediately
✅ **Automatic Splits** - No manual accounting needed
✅ **Transparent** - All parties see transactions in real-time
✅ **Scalable** - Add 100+ partners without code changes
✅ **Professional** - Investors love marketplace models
✅ **Trustworthy** - Sponsors know money goes directly to NGO

## Database Schema

### `partner_accounts` Table

Stores conservation partners (like Airbnb hosts):

```sql
CREATE TABLE partner_accounts (
  id UUID PRIMARY KEY,
  partner_name TEXT UNIQUE NOT NULL,
  partner_email TEXT,
  stripe_account_id TEXT UNIQUE NOT NULL,
  mpa_slugs TEXT[] NOT NULL,           -- Array of MPAs they manage
  contact_person TEXT,
  contact_phone TEXT,
  active BOOLEAN DEFAULT true,
  onboarded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `sponsorships` Table Updates

Added Stripe Connect fields:

```sql
ALTER TABLE sponsorships
ADD COLUMN connected_account_id TEXT,      -- Partner's Stripe account
ADD COLUMN platform_fee_amount INTEGER,    -- 15% in cents
ADD COLUMN partner_amount INTEGER,         -- 85% in cents
ADD COLUMN partner_name TEXT;              -- Partner display name
```

## Setup Instructions

### Step 1: Run Database Migration

```bash
# Apply the migration
psql -f supabase/migrations/002_add_stripe_connect.sql

# Or in Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Paste contents of 002_add_stripe_connect.sql
# 3. Run query
```

This will:
- Add Stripe Connect columns to `sponsorships`
- Create `partner_accounts` table
- Insert HEPCA as MVP partner (with placeholder account ID)
- Create revenue stats view

### Step 2: Create Test Connected Account

**For Development/Testing:**

1. Go to [Stripe Dashboard - Connect](https://dashboard.stripe.com/test/connect/accounts)
2. Click **"Create account"**
3. Select **"Express"** account type
4. Fill in details:
   - **Country:** Egypt (EG)
   - **Email:** test-hepca@coralrefuge.test
   - **Business name:** HEPCA Test
5. Click **"Create account"**
6. **Copy the account ID** (starts with `acct_`)

### Step 3: Update Database with Real Account ID

```sql
UPDATE partner_accounts
SET stripe_account_id = 'acct_YOUR_ACTUAL_ACCOUNT_ID_HERE'
WHERE partner_name = 'HEPCA';
```

Replace `acct_YOUR_ACTUAL_ACCOUNT_ID_HERE` with the account ID from Step 2.

### Step 4: Configure Webhook Events

In [Stripe Dashboard - Webhooks](https://dashboard.stripe.com/test/webhooks):

Add these event types:
- `checkout.session.completed` (already configured)
- `application_fee.created` (NEW - tracks platform fees)
- `transfer.created` (NEW - tracks partner transfers)

### Step 5: Test Payment Flow

1. Go to `/sponsor` on your development site
2. Select **Ras Mohammed** or **Giftun Islands**
3. Choose 1 hectare ($50)
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete payment

### Step 6: Verify Split in Stripe Dashboard

**In Platform Account:**
1. Go to [Payments](https://dashboard.stripe.com/test/payments)
2. Find the $50 payment
3. Check "Application fee" = $7.50 (15%)

**In HEPCA Connected Account:**
1. Go to [Connect → Accounts](https://dashboard.stripe.com/test/connect/accounts)
2. Click on HEPCA account
3. Check Balance → Should show $42.50 (85%)

### Step 7: Check Admin Dashboard

1. Go to `/admin` (password: `coral-admin-2024`)
2. Verify revenue breakdown cards show:
   - **Total Revenue:** $50.00
   - **Platform Fees (15%):** $7.50
   - **To Partners (85%):** $42.50
3. Check sponsorships table shows partner split columns

## Code Architecture

### Key Files

```
lib/
  stripe-connect.ts              # Helper functions for Connect

app/api/
  create-checkout/route.ts       # Updated with payment splits
  webhooks/stripe/route.ts       # Updated with Connect data

app/admin/
  page.tsx                       # Updated with revenue cards
  partners/page.tsx              # NEW - Partner management

supabase/migrations/
  002_add_stripe_connect.sql    # Database schema
```

### Payment Flow

```typescript
// 1. Checkout API looks up partner for MPA
const partner = await getPartnerAccountForMPA(mpaSlug);

// 2. Calculate 15/85 split
const fees = calculateFees(totalAmountInCents);
// fees.platformFee = $7.50 (15%)
// fees.partnerAmount = $42.50 (85%)

// 3. Create checkout with Connect configuration
stripe.checkout.sessions.create({
  payment_intent_data: {
    application_fee_amount: fees.platformFee,  // 15%
    transfer_data: {
      destination: partner.stripe_account_id,  // 85% to HEPCA
    },
  },
  // ... rest of checkout config
});

// 4. Webhook saves Connect data to database
await supabase.from('sponsorships').insert({
  // ... sponsorship data
  connected_account_id: partnerAccountId,
  platform_fee_amount: platformFee,
  partner_amount: partnerAmount,
  partner_name: partnerName,
});
```

## Adding More Partners (Future)

### Example: Add EEAA for Wadi El Gemal

```sql
-- 1. Get their Stripe Connected Account ID
-- (Partner completes Stripe onboarding flow)

-- 2. Insert into database
INSERT INTO partner_accounts (
  partner_name,
  partner_email,
  stripe_account_id,
  mpa_slugs,
  contact_person
) VALUES (
  'EEAA',
  'eeaa@example.com',
  'acct_eeaa_real_account_id',
  ARRAY['wadi-el-gemal'],
  'Dr. Ahmed Mohamed'
);
```

**That's it!** The system will automatically:
- Route Wadi El Gemal payments to EEAA
- Split 15/85 correctly
- Track revenue per partner
- Generate certificates with partner name

### Scaling to 100+ Partners

The architecture supports unlimited partners:

1. Each partner gets their own Stripe Connected Account
2. Database lookup is fast (indexed on `mpa_slugs`)
3. No code changes needed per partner
4. Just like Airbnb scales to millions of hosts

## Troubleshooting

### Payment Fails with "Invalid destination"

**Cause:** Stripe account ID is incorrect or placeholder
**Fix:** Update database with real account ID:

```sql
UPDATE partner_accounts
SET stripe_account_id = 'acct_real_id_here'
WHERE partner_name = 'HEPCA';
```

### No partner found for MPA

**Cause:** MPA slug not in `mpa_slugs` array
**Fix:** Add MPA to partner:

```sql
UPDATE partner_accounts
SET mpa_slugs = array_append(mpa_slugs, 'new-mpa-slug')
WHERE partner_name = 'HEPCA';
```

### Split amount is wrong

**Cause:** Fee calculation issue
**Check:**
- Total amount is in cents (multiply by 100)
- Platform fee is 15% of total
- Partner amount is total - platform fee

### Platform fee not showing in Stripe

**Cause:** Webhook not configured
**Fix:** Add `application_fee.created` to webhook events

## Production Checklist

Before going live:

- [ ] Switch Stripe from test mode to live mode
- [ ] Create HEPCA's real Stripe Connected Account (not test)
- [ ] HEPCA completes bank verification
- [ ] Update production database with live account ID
- [ ] Configure production webhook endpoint
- [ ] Test with real $1 payment
- [ ] Verify HEPCA receives funds in their real account
- [ ] Update partner contact info
- [ ] Document partner onboarding flow

## Support

### For Technical Issues
Contact: Hugo Crespo Dumpert
Email: [your email]

### For Stripe Connect Setup
Documentation: https://stripe.com/docs/connect

### For Partner Onboarding
See: `/docs/PARTNER_ONBOARDING.md` (to be created)

---

## Success Metrics

**MVP Goals:**
- ✅ One partner (HEPCA)
- ✅ Two MPAs (Ras Mohammed + Giftun Islands)
- ✅ Automatic 15/85 splits
- ✅ No manual transfers
- ✅ Ready to scale to 100+ partners

**This proves the marketplace model works!**

Just like Airbnb started with one apartment, Coral Refuge starts with HEPCA managing two reserves. The platform is ready to scale globally.
