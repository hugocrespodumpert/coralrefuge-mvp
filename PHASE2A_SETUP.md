# Phase 2A Setup Guide - Stripe & Gmail Integration

This guide helps you configure Stripe payments and Gmail SMTP for Coral Refuge.

## 🎯 What Was Implemented in Phase 2A

✅ **Gmail SMTP Integration**
- Replaced Resend with Nodemailer + Gmail
- Free: 500 emails/day limit
- Payment confirmation emails
- Admin notifications
- Partnership inquiry notifications

✅ **Stripe Payment Integration (Test Mode)**
- Complete checkout flow
- Webhook handler for payment confirmation
- Success page with impact messaging
- Anonymous sponsorship option
- TEST MODE indicator with test card info

✅ **Database Schema Updates**
- New `sponsorships` table for tracking payments
- Certificate status tracking
- Payment status tracking

## 📋 Setup Steps

### 1. Gmail SMTP Configuration

**Generate an App-Specific Password:**

1. Go to your Google Account: https://myaccount.google.com
2. Navigate to Security
3. Enable 2-Step Verification (if not already enabled)
4. Go to "App passwords" (search for it in settings)
5. Generate a new app password for "Mail"
6. Copy the 16-character password

**Add to `.env.local`:**
```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

**Important Notes:**
- Use your full Gmail address
- The app password is different from your regular password
- Free tier: 500 emails per day
- Emails sent from your Gmail address

### 2. Stripe Configuration (Test Mode)

**Create a Stripe Account:**

1. Go to https://stripe.com and sign up
2. Navigate to Dashboard
3. Enable "Test mode" (toggle in top-right)

**Get Your Test API Keys:**

1. Go to Developers > API keys
2. Copy "Publishable key" (starts with `pk_test_`)
3. Copy "Secret key" (starts with `sk_test_`)

**Add to `.env.local`:**
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Set Up Webhook (for local testing):**

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

**For Production Webhook:**

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Copy the webhook signing secret
5. Add to Vercel environment variables

### 3. Supabase Database Setup

**Create the Sponsorships Table:**

1. Go to your Supabase project
2. Navigate to SQL Editor
3. Run the SQL from `DATABASE_SCHEMA.md` - Section 3 (sponsorships table)
4. Verify the table was created in Table Editor

**Enable Row Level Security:**

```sql
-- Allow webhook to insert (service role handles this automatically)
-- Authenticated users (admin) can view all
CREATE POLICY "Allow service role full access to sponsorships"
  ON sponsorships FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow authenticated read on sponsorships"
  ON sponsorships FOR SELECT
  TO authenticated
  USING (true);
```

### 4. Environment Variables

**Complete `.env.local` file:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Gmail SMTP
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password

# Stripe Test Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=coral-admin-2024

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🧪 Testing the Payment Flow

### Test Cards

Use these test cards in Stripe's test mode:

**Success:**
- Card: `4242 4242 4242 4242`
- Exp: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined:**
- Card: `4000 0000 0000 0002`

**Requires Authentication:**
- Card: `4000 0025 0000 3155`

### Test Flow:

1. **Start dev server with webhook forwarding:**
   ```bash
   # Terminal 1: Start Next.js
   npm run dev

   # Terminal 2: Forward Stripe webhooks
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. **Test sponsorship:**
   - Go to http://localhost:3000/sponsor
   - Select an MPA
   - Choose hectares
   - Fill in your details
   - Click "Proceed to Payment"
   - Use test card: 4242 4242 4242 4242
   - Complete payment

3. **Verify:**
   - Check Stripe Dashboard > Payments (test mode)
   - Check webhook logs in terminal
   - Check Supabase `sponsorships` table
   - Check Supabase `registry_entries` table
   - Check your Gmail for confirmation email
   - Verify success page displays

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Phase 2A: Add Stripe & Gmail integration"
git push origin your-branch-name
```

### 2. Deploy to Vercel

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### 3. Configure Production Webhook

1. In Stripe Dashboard (use live mode keys for production)
2. Go to Developers > Webhooks
3. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
5. Copy webhook secret
6. Add to Vercel env vars: `STRIPE_WEBHOOK_SECRET`
7. Redeploy Vercel

### 4. Update Base URL

In Vercel environment variables:
```
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## 🔍 Troubleshooting

### Gmail Emails Not Sending

**Error: "Invalid login"**
- Verify you're using an app-specific password, not your Gmail password
- Ensure 2-Step Verification is enabled
- Try generating a new app password

**Error: "Daily sending quota exceeded"**
- Gmail free tier: 500 emails/day
- Wait 24 hours or upgrade to Google Workspace

### Stripe Webhook Not Receiving Events

**Local Development:**
- Ensure `stripe listen` is running
- Check terminal for webhook events
- Verify `STRIPE_WEBHOOK_SECRET` matches the CLI output

**Production:**
- Verify webhook URL in Stripe Dashboard
- Check Vercel function logs
- Ensure `STRIPE_WEBHOOK_SECRET` is set in Vercel
- Verify webhook is in live/test mode matching your keys

### Payment Not Saving to Database

**Check:**
1. Supabase `sponsorships` table exists
2. Webhook secret is correct
3. Check Vercel function logs for errors
4. Verify Supabase connection string

### Checkout Session Not Creating

**Check:**
1. `STRIPE_SECRET_KEY` is set (starts with `sk_test_`)
2. Key is in test mode
3. Check browser console for errors
4. Verify API route is accessible

## 📊 Monitoring

### Stripe Dashboard
- View all test payments
- Monitor webhook events
- Check for failed payments

### Supabase Dashboard
- Query `sponsorships` table
- Monitor API usage
- Check logs for errors

### Gmail
- Check sent emails
- Monitor daily quota usage
- View bounce/error reports

## 🎉 Success Criteria

✅ Test payment completes successfully
✅ Webhook receives and processes event
✅ Sponsorship saved to database
✅ Registry entry created (or anonymous)
✅ Confirmation email sent to sponsor
✅ Admin notification received
✅ Success page displays correctly

## 📝 Next Steps

After Phase 2A is working:

**Phase 2B:** Real Egypt Red Sea MPA Data
- Research actual MPA statistics
- Add real coral cover data
- Update images with Ocean Agency photos
- Add climate resilience scores

**Phase 2C:** Interactive Maps
- Integrate Mapbox
- Add MPA boundaries
- Overlay coral cover data from Allen Coral Atlas
- Click markers for details

**Phase 2D:** PDF Certificate Generation
- Design certificate template
- Auto-generate on payment
- Include QR code
- Email to sponsor

## 🆘 Support

Issues? Check:
1. Vercel function logs
2. Stripe webhook logs
3. Supabase logs
4. Browser console

Still stuck? Review:
- DATABASE_SCHEMA.md
- DEPLOYMENT.md
- This guide

---

**Built with science. Driven by purpose.** 🌊🪸
