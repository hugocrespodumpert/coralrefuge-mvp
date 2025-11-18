# Quick Start Guide - 15 Minute Setup

Get the complete Stripe → Certificate → Email flow working in 15 minutes.

## Prerequisites (5 minutes)

Sign up for these free accounts if you don't have them:

1. **Stripe** - https://dashboard.stripe.com/register (test mode is free)
2. **Supabase** - https://supabase.com (free tier)
3. **Resend** - https://resend.com (free: 100 emails/day)
4. **Stripe CLI** - https://stripe.com/docs/stripe-cli#install

## Setup Steps (10 minutes)

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Set Up Database (2 min)

1. Create new project at https://supabase.com
2. Go to SQL Editor
3. Copy entire contents of `database/schema.sql`
4. Paste and click "Run"
5. Verify `sponsorships` table was created

### 3. Configure Environment Variables (3 min)

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

#### Stripe (get from https://dashboard.stripe.com/test/apikeys)
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Supabase (get from https://app.supabase.com/project/_/settings/api)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...
```

#### Resend (get from https://resend.com/api-keys)
```env
RESEND_API_KEY=re_...
```

#### Base URL
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Start Stripe Webhook Listener (2 min)

Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Login
stripe login
```

Start webhook forwarding in a **separate terminal**:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook secret (starts with `whsec_`) and add to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 5. Start Dev Server (1 min)

```bash
npm run dev
```

Visit http://localhost:3000

### 6. Test Payment Flow (1 min)

1. Click "Sponsor Now" or go to http://localhost:3000/sponsor
2. Select MPA and hectares
3. Click "Sponsor Now" button
4. Use test card: `4242 4242 4242 4242`
5. Expiry: any future date (e.g., `12/25`)
6. CVC: any 3 digits (e.g., `123`)
7. Email: your real email to receive certificate
8. Name: your name
9. Click "Pay"

## Verify Everything Works

### ✅ Check Server Logs

Look for this in your dev server terminal:

```
=== STRIPE WEBHOOK RECEIVED ===
Event type: checkout.session.completed
Processing payment for session: cs_test_xxxxx
Sponsorship record created successfully
Certificate PDF generated successfully
Certificate email sent successfully
=== WEBHOOK PROCESSING COMPLETED SUCCESSFULLY ===
```

### ✅ Check Webhook Terminal

Should show:
```
checkout.session.completed [evt_xxxxx]
<-- [200] POST http://localhost:3000/api/webhooks/stripe
```

### ✅ Check Database

Go to https://app.supabase.com/project/_/editor:
- Open `sponsorships` table
- Verify new record exists
- Check `certificate_sent = true`

### ✅ Check Email

- Check your inbox for "🪸 Your Coral Refuge Certificate"
- Download PDF attachment
- Verify all details are correct

### ✅ Check Dashboard

- Visit http://localhost:3000/dashboard
- Verify your sponsorship appears

## If Something Doesn't Work

### Webhook not firing?
```bash
# Verify Stripe CLI is running:
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Restart dev server after adding STRIPE_WEBHOOK_SECRET
```

### Database error?
- Check `SUPABASE_SERVICE_ROLE_KEY` (not anon key)
- Verify schema was created successfully
- Check Supabase logs

### Email not sending?
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for errors
- Look in spam folder
- Verify domain is verified in Resend (or use test mode)

### Certificate not generating?
- Check server logs for specific error
- Verify all data fields are present

## Testing Other Scenarios

### Test Cards

```bash
# Success
4242 4242 4242 4242

# Decline
4000 0000 0000 0002

# 3D Secure
4000 0025 0000 3155
```

### Different Amounts
- Test 1 hectare ($100)
- Test 10 hectares ($1,000)
- Test with 3-year pricing (20% discount)

### Different MPAs
- Select different MPAs
- Verify coordinates update

## Next Steps

Once basic flow works:

1. Customize certificate design in `lib/certificate-generator.ts`
2. Update email template in `lib/email-service.ts`
3. Add actual MPA data from your backend
4. Implement user authentication
5. Add dashboard features
6. Deploy to production

## Production Checklist

Before going live:

- [ ] Switch to live Stripe keys
- [ ] Configure production webhook in Stripe Dashboard
- [ ] Update `NEXT_PUBLIC_BASE_URL` to your domain
- [ ] Verify domain in Resend
- [ ] Update email `from` address
- [ ] Set up database backups
- [ ] Add error monitoring
- [ ] Test with real payment
- [ ] Review and enable Supabase RLS policies

## Support

Stuck? Check:
- Server terminal logs
- Webhook terminal logs
- Browser console
- Stripe Dashboard → Events
- Resend Dashboard → Logs
- Supabase Dashboard → Logs

All systems have detailed logging to help debug issues.

## Success!

If you can complete a test payment and receive the certificate email, **you're done!** The core flow is working end-to-end.

The complete flow:
1. ✅ User sponsors →
2. ✅ Payment processes →
3. ✅ Webhook fires →
4. ✅ Database updates →
5. ✅ Certificate generates →
6. ✅ Email sends →
7. ✅ Dashboard shows sponsorship

**This is the CRITICAL BLOCKING FEATURE - and it now works!**
