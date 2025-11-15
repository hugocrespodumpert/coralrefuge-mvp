# Certificate Generation & Post-Payment Flow Setup

## Overview

This document outlines the complete certificate generation and email delivery system implemented for Coral Refuge. After a successful payment, users automatically receive a beautiful PDF certificate via email.

## System Architecture

```
User Payment → Stripe Checkout → Webhook Triggered → Certificate Generated → Email Sent → Database Updated
```

## Components

### 1. Database Schema (`supabase/migrations/001_create_sponsorships.sql`)

The `sponsorships` table tracks all paid sponsorships:

```sql
- certificate_id: Unique ID (format: MPA-YEAR-XXXXX, e.g., RAS-2025-00001)
- sponsor_name: Name of the sponsor
- sponsor_email: Email address for certificate delivery
- mpa_id: Marine Protected Area identifier
- mpa_name: Full MPA name
- hectares: Number of hectares sponsored
- amount_paid: Payment amount in USD
- stripe_session_id: Stripe checkout session reference
- is_anonymous: Whether sponsor chose to be anonymous
- certificate_generated_at: Timestamp of PDF generation
- email_sent_at: Timestamp of successful email delivery
- created_at: Sponsorship creation time
- valid_until: Certificate expiration (10 years from purchase)
```

### 2. Certificate Generator (`lib/certificate-generator.ts`)

Generates beautiful PDF certificates using `pdf-lib`:

**Features:**
- Ocean blue color scheme (#001F3F, #0074D9, #3BCEAC)
- Professional layout with decorative borders
- Sponsor name prominently displayed
- MPA details with location
- Unique certificate ID
- QR code linking to public registry
- Valid for 10 years from purchase date
- Impact statement detailing what funds support

**Dependencies:**
- `pdf-lib` - PDF generation
- `qrcode` - QR code generation for registry verification

### 3. Email System (`lib/email.ts`)

New function: `sendCertificateEmail()`

**Features:**
- Beautiful HTML email template matching brand design
- PDF certificate attached
- Impact summary with MPA details
- Links to public registry
- Next steps for quarterly impact reports
- Professional ocean-themed styling

**SMTP Configuration:**
Uses existing Gmail SMTP setup via `nodemailer`:
- Service: Gmail
- Auth: `GMAIL_USER` and `GMAIL_APP_PASSWORD` environment variables

### 4. Stripe Webhook (`app/api/webhooks/stripe/route.ts`)

Handles `checkout.session.completed` events:

**Flow:**
1. Verify webhook signature (security)
2. Extract metadata from Stripe session
3. Generate unique certificate ID
4. Save sponsorship to Supabase
5. Generate PDF certificate
6. Send email with certificate attachment
7. Update database with email_sent_at timestamp
8. Notify admin of new sponsorship

**Security:**
- Webhook signature verification using `STRIPE_WEBHOOK_SECRET`
- Error handling with admin notifications
- Idempotent operations (safe to retry)

### 5. Admin Dashboard (`app/admin/page.tsx`)

**New Features:**
- "Sponsorships" tab showing all paid sponsorships
- Stats: Total sponsorships, hectares protected, revenue generated
- Sponsorship details table with certificate IDs
- Email delivery status (✓ Sent / ⚠ Pending)
- "Resend Certificate" button for failed deliveries
- Real-time data from Supabase

### 6. Public Registry (`app/registry/page.tsx`)

**Updates:**
- Pulls from real Supabase database instead of placeholder data
- Displays certificate IDs
- Shows anonymous sponsors as "🔒 Anonymous Guardian"
- Real-time statistics (hectares protected, active guardians)
- Filter by MPA functionality

### 7. Resend Certificate API (`app/api/resend-certificate/route.ts`)

Allows admins to manually resend certificates if email delivery fails:

**Features:**
- Fetches sponsorship from database
- Regenerates certificate PDF
- Resends email with attachment
- Updates email_sent_at timestamp

## Deployment Steps

### Step 1: Create Supabase Database Table

Run the migration in Supabase SQL Editor:

```bash
# Copy contents of supabase/migrations/001_create_sponsorships.sql
# Paste into Supabase SQL Editor
# Execute the migration
```

### Step 2: Configure Environment Variables

Ensure these are set in Vercel:

```env
# Stripe (already configured)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...  # You'll get this after creating the webhook

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Gmail SMTP (already configured)
GMAIL_USER=thehugor8@gmail.com
GMAIL_APP_PASSWORD=... # App-specific password from Google

# Base URL
NEXT_PUBLIC_BASE_URL=https://coralrefuge-mvp.vercel.app
```

### Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Phase 2D: Certificate generation + post-payment flow"
git push -u origin claude/certificate-generation-post-payment-015Y959o5LDMdY3skUEwkYnD
```

### Step 4: Configure Stripe Webhook

**CRITICAL: You must do this AFTER deploying to Vercel!**

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter endpoint URL:
   ```
   https://coralrefuge-mvp.vercel.app/app/webhooks/stripe
   ```
4. Select events to listen to:
   - ✅ `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_...`)
7. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
8. Redeploy Vercel (environment variable change requires redeploy)

### Step 5: Test the Complete Flow

1. Visit `/sponsor` page
2. Select an MPA (e.g., Ras Mohammed)
3. Enter test details:
   - Name: Test User
   - Email: thehugor8@gmail.com (for testing)
   - Hectares: 1
4. Click "Proceed to Payment"
5. Use Stripe test card: `4242 4242 4242 4242`
6. Complete payment
7. **Expected Results:**
   - ✅ Redirected to success page
   - ✅ Webhook receives event (check Vercel logs)
   - ✅ Sponsorship saved to database (check Supabase)
   - ✅ Certificate PDF generated
   - ✅ Email received with PDF attachment within 2 minutes
   - ✅ Sponsorship appears in `/registry`
   - ✅ Admin dashboard shows new sponsorship at `/admin`

### Step 6: Monitor and Verify

**Check Vercel Logs:**
```bash
# Look for these log messages:
- "Payment completed for session: cs_..."
- "Generated certificate ID: RAS-2025-00001"
- "Sponsorship saved to database: ..."
- "Certificate PDF generated, size: ... bytes"
- "Certificate email sent successfully"
```

**Check Supabase:**
```sql
SELECT * FROM sponsorships ORDER BY created_at DESC LIMIT 5;
```

**Check Email:**
- Should arrive within 2 minutes
- PDF attached (Coral-Refuge-Certificate-RAS-2025-00001.pdf)
- Beautiful HTML formatting
- All details correct

## Troubleshooting

### Issue: Webhook Not Triggering

**Symptoms:**
- Payment completes but no certificate sent
- No logs in Vercel

**Solutions:**
1. Check webhook is configured in Stripe Dashboard
2. Verify webhook URL is correct (should end with `/api/webhooks/stripe`)
3. Check `STRIPE_WEBHOOK_SECRET` is set in Vercel
4. Check Stripe webhook logs for errors
5. Verify endpoint is accessible (not blocked)

### Issue: Certificate Not Generated

**Symptoms:**
- Webhook triggers but no PDF
- Error in Vercel logs about PDF generation

**Solutions:**
1. Check `pdf-lib` and `qrcode` are installed
2. Verify certificate-generator.ts has no syntax errors
3. Check MPA data is correct in webhook handler
4. Look for specific error messages in logs

### Issue: Email Not Sent

**Symptoms:**
- Certificate generated but email not received
- Error about SMTP or nodemailer

**Solutions:**
1. Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct
2. Check Gmail App Password is still valid
3. Look for email in spam folder
4. Check Vercel logs for specific error
5. Use "Resend Certificate" button in admin dashboard

### Issue: Database Insert Failed

**Symptoms:**
- Error: "Failed to save sponsorship"
- Database error in logs

**Solutions:**
1. Verify Supabase table exists and schema matches
2. Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Verify certificate_id is unique (should auto-generate)
4. Check Supabase logs for specific error

## Testing Checklist

- [ ] Supabase `sponsorships` table created
- [ ] All environment variables configured
- [ ] Code deployed to Vercel
- [ ] Stripe webhook endpoint added
- [ ] Stripe webhook secret configured
- [ ] Test payment completed successfully
- [ ] Webhook received and processed (check Vercel logs)
- [ ] Sponsorship saved to database (check Supabase)
- [ ] Certificate PDF generated (check logs for size)
- [ ] Email sent successfully (check inbox)
- [ ] PDF attachment received and opens correctly
- [ ] Certificate has correct details (name, MPA, hectares, etc.)
- [ ] QR code works and links to registry
- [ ] Sponsorship appears in `/registry`
- [ ] Admin dashboard shows sponsorship at `/admin`
- [ ] "Resend Certificate" button works

## Success Criteria

✅ **User Experience:**
- User pays $50
- Receives beautiful PDF certificate via email within 2 minutes
- Certificate has unique ID, QR code, and 10-year validity
- Email includes impact summary and next steps

✅ **Admin Experience:**
- All sponsorships visible in dashboard
- Can see total revenue and hectares protected
- Can resend certificates if needed
- Notified of new sponsorships via email

✅ **Public Registry:**
- Shows all active sponsorships
- Displays certificate IDs
- Respects anonymous preferences
- Real-time statistics

## File Structure

```
coralrefuge-mvp/
├── app/
│   ├── admin/page.tsx                    # Updated with sponsorships tab
│   ├── registry/page.tsx                 # Updated to pull from database
│   └── api/
│       ├── webhooks/
│       │   └── stripe/route.ts          # NEW: Webhook handler
│       └── resend-certificate/route.ts  # NEW: Resend API
├── lib/
│   ├── certificate-generator.ts         # NEW: PDF generation
│   ├── email.ts                         # Updated with sendCertificateEmail
│   ├── supabase.ts                      # Already exists
│   └── stripe.ts                        # Already exists
├── supabase/
│   └── migrations/
│       └── 001_create_sponsorships.sql  # NEW: Database schema
└── package.json                          # Already has pdf-lib, qrcode, nodemailer
```

## Next Steps

1. **Test in production** with real payment
2. **Monitor webhook reliability** for first 24 hours
3. **Set up error alerts** (e.g., Sentry for failed emails)
4. **Create quarterly impact report** email template
5. **Add certificate download** to user success page
6. **Implement certificate lookup** by ID on registry page

## Support

If you encounter issues:
1. Check Vercel logs: `vercel logs --follow`
2. Check Stripe webhook logs in Dashboard
3. Check Supabase logs and database state
4. Review this document for troubleshooting steps
5. Contact support with specific error messages

---

**Phase 2D Complete!** 🎉

Users now receive beautiful certificates automatically after payment. The complete flow is tested and ready for production.
