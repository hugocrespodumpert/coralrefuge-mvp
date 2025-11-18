# Coral Refuge MVP - Complete Stripe Payment Flow

**CRITICAL BLOCKING FEATURE**: Complete end-to-end Stripe payment → certificate generation → email delivery flow.

## Overview

This application enables users to sponsor marine protected areas (MPAs) in Egypt's Red Sea and receive verified certificates of their conservation impact. The complete flow includes:

1. User selects MPA + hectares on `/sponsor` page
2. Secure Stripe Checkout payment
3. Webhook processes payment completion
4. PDF certificate generation with GPS coordinates
5. Email delivery with certificate attachment
6. Dashboard view of sponsorships

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Payment**: Stripe
- **Database**: Supabase
- **Email**: Resend
- **PDF Generation**: @react-pdf/renderer
- **Styling**: Tailwind CSS

## Prerequisites

Before starting, you'll need accounts for:

1. **Stripe** (https://stripe.com)
   - Free test mode available
   - Provides payment processing

2. **Supabase** (https://supabase.com)
   - Free tier available
   - Provides PostgreSQL database

3. **Resend** (https://resend.com)
   - Free tier: 100 emails/day
   - Provides email delivery

4. **Stripe CLI** (for local webhook testing)
   - https://stripe.com/docs/stripe-cli

## Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

Create a new Supabase project, then run this SQL in the SQL Editor:

```sql
-- Create sponsorships table
CREATE TABLE sponsorships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  mpa_slug TEXT NOT NULL,
  mpa_name TEXT NOT NULL,
  hectares INTEGER NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  certificate_sent BOOLEAN DEFAULT FALSE,
  certificate_sent_at TIMESTAMPTZ,
  certificate_id TEXT NOT NULL UNIQUE,
  coordinates JSONB,
  pricing_tier TEXT NOT NULL CHECK (pricing_tier IN ('annual', 'multi-year', 'monthly')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_sponsorships_email ON sponsorships(email);

-- Create index on stripe_session_id
CREATE INDEX idx_sponsorships_stripe_session ON sponsorships(stripe_session_id);

-- Create index on certificate_id
CREATE INDEX idx_sponsorships_certificate_id ON sponsorships(certificate_id);
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your actual credentials:

#### Stripe Configuration

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** (starts with `sk_test_`)
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Add to `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_your_actual_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key
```

#### Supabase Configuration

1. Go to your Supabase project: https://app.supabase.com/project/_/settings/api
2. Copy **Project URL**
3. Copy **anon public** key
4. Copy **service_role** key (keep this secret!)
5. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Resend Configuration

1. Go to https://resend.com/api-keys
2. Create a new API key
3. Add to `.env.local`:

```env
RESEND_API_KEY=re_your_actual_key
```

**IMPORTANT**: You also need to verify your domain or use the test domain in Resend settings.

#### Application URL

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Install and Configure Stripe CLI

The Stripe CLI is required for local webhook testing:

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Or install on other platforms:
# https://stripe.com/docs/stripe-cli#install

# Login to Stripe
stripe login

# This will open your browser to authenticate
```

## Running the Application

### 1. Start the Development Server

In one terminal:

```bash
npm run dev
```

The app will be available at http://localhost:3000

### 2. Start Stripe Webhook Forwarding

In a **separate terminal**, run:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

You'll see output like:

```
> Ready! Your webhook signing secret is whsec_xxxxx...
```

**CRITICAL**: Copy this webhook secret and add it to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

Then **restart your dev server** for the new environment variable to take effect.

## Testing the Complete Flow

### End-to-End Test Checklist

Follow these steps to verify the complete payment flow:

#### 1. Navigate to Sponsor Page

- Open http://localhost:3000/sponsor
- You should see the sponsor page with MPA options

#### 2. Configure Sponsorship

- Select an MPA (default: Ras Mohammed)
- Choose pricing tier (Annual or 3-Year)
- Adjust hectares slider (1-50)
- Verify total price updates correctly

#### 3. Initiate Checkout

- Click "Sponsor Now" button
- You should be redirected to Stripe Checkout
- Verify the amount and description are correct

#### 4. Complete Test Payment

Use Stripe test card:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
Email: test@example.com
Name: Test User
```

Click "Pay"

#### 5. Verify Webhook Processing

In your Stripe webhook terminal, you should see:

```
checkout.session.completed [evt_xxxxx]
```

In your dev server terminal, look for these logs:

```
=== STRIPE WEBHOOK RECEIVED ===
Event type: checkout.session.completed
Processing payment for session: cs_test_xxxxx
=== Creating sponsorship record in database ===
Sponsorship record created successfully
=== Starting certificate and email process ===
Generating certificate PDF...
Certificate PDF generated successfully
Sending certificate email...
Certificate email sent successfully
=== WEBHOOK PROCESSING COMPLETED SUCCESSFULLY ===
```

#### 6. Check Success Page

- You should be redirected to `/success?session_id=cs_test_xxxxx`
- Verify success message displays

#### 7. Verify Database Record

Check Supabase:

1. Go to https://app.supabase.com/project/_/editor
2. Select `sponsorships` table
3. Verify new record exists with:
   - `status: 'completed'`
   - `certificate_sent: true`
   - All fields populated correctly

#### 8. Check Email Delivery

Check your email inbox (the email you used in checkout):

- You should receive an email with subject: "🪸 Your Coral Refuge Certificate"
- Verify PDF attachment is present
- Download and open the PDF certificate
- Verify all details are correct:
  - Your name
  - Hectares sponsored
  - MPA name
  - GPS coordinates
  - Certificate ID
  - QR code

#### 9. View Dashboard

- Navigate to http://localhost:3000/dashboard
- Verify your sponsorship appears
- Check all details match

### Test Different Scenarios

#### Test Different Hectare Amounts

- Test with 1 hectare
- Test with 10 hectares
- Test with 50 hectares
- Verify pricing calculates correctly

#### Test Different MPAs

- Select different MPAs
- Verify coordinates change
- Verify names update correctly

#### Test Different Pricing Tiers

- Test annual pricing
- Test 3-year pricing (20% discount)
- Verify amounts are correct

#### Test Error Scenarios

1. **Invalid Card**
   - Card: 4000 0000 0000 0002
   - Should decline with error message

2. **Payment Requires Authentication**
   - Card: 4000 0025 0000 3155
   - Should trigger 3D Secure

## Debugging

### Enable Verbose Logging

The application has extensive logging throughout the payment flow. Check:

1. **Browser Console**: For client-side checkout errors
2. **Server Terminal**: For API and webhook processing
3. **Stripe Webhook Terminal**: For webhook delivery status

### Common Issues

#### ❌ Webhook Not Receiving Events

**Problem**: Payment completes but webhook doesn't fire

**Solutions**:
- Verify Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Check webhook secret in `.env.local` matches output from Stripe CLI
- Restart dev server after updating environment variables

#### ❌ Database Error

**Problem**: "Database error" in webhook logs

**Solutions**:
- Verify Supabase credentials in `.env.local`
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct (not anon key)
- Verify `sponsorships` table exists with correct schema
- Check Supabase dashboard for error details

#### ❌ Email Not Sending

**Problem**: Certificate generated but email not received

**Solutions**:
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for delivery status
- Verify email domain is verified in Resend
- Check spam folder
- Look for error logs in server terminal

#### ❌ Certificate Generation Error

**Problem**: "Certificate generation failed" error

**Solutions**:
- Check all required data is present in sponsorship record
- Verify coordinates are valid numbers
- Check server logs for specific error message

#### ❌ Stripe Checkout Not Opening

**Problem**: "Sponsor Now" button doesn't work

**Solutions**:
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Check API endpoint is returning session URL
- Verify Stripe credentials are for test mode

### Viewing Logs

#### Server Logs

Watch for these key log messages:

```
# Checkout Session Creation
Creating checkout session...
Checkout session created: cs_test_xxxxx

# Webhook Receipt
=== STRIPE WEBHOOK RECEIVED ===
Webhook signature verified successfully
Event type: checkout.session.completed

# Database Operations
=== Creating sponsorship record in database ===
Sponsorship record created successfully
Sponsorship ID: uuid-here

# Certificate Generation
Generating certificate for: Customer Name
QR code generated successfully
Certificate PDF generated successfully, size: 12345 bytes

# Email Sending
Sending certificate email to: customer@example.com
Email sent successfully
```

#### Webhook Logs

```
2024-01-15 10:30:00 --> checkout.session.completed [evt_xxxxx]
2024-01-15 10:30:01 <-- [200] POST http://localhost:3000/api/webhooks/stripe [evt_xxxxx]
```

## File Structure

```
coralrefuge-mvp/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/
│   │   │   └── route.ts          # Creates Stripe checkout session
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts      # Handles Stripe webhooks
│   ├── sponsor/
│   │   └── page.tsx              # Sponsor selection page
│   ├── success/
│   │   └── page.tsx              # Post-payment success page
│   ├── dashboard/
│   │   └── page.tsx              # User dashboard
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── lib/
│   ├── certificate-generator.ts  # PDF certificate generation
│   └── email-service.ts          # Email sending with Resend
├── types/
│   └── index.ts                  # TypeScript interfaces
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                     # This file
```

## Key Components

### Certificate Generator (`lib/certificate-generator.ts`)

- Uses @react-pdf/renderer for PDF generation
- Includes QR code for verification
- Professional design with coral theme
- GPS coordinates and impact metrics

### Email Service (`lib/email-service.ts`)

- Sends beautiful HTML emails with Resend
- Attaches PDF certificate
- Includes impact statistics and next steps

### Webhook Handler (`app/api/webhooks/stripe/route.ts`)

- Verifies Stripe webhook signature
- Creates database record
- Generates certificate
- Sends email
- Handles errors gracefully

### Checkout Session API (`app/api/create-checkout-session/route.ts`)

- Creates Stripe checkout session
- Includes metadata for webhook processing
- Handles pricing calculations

## Production Deployment

### Environment Variables for Production

Update these in your hosting platform (Vercel, etc.):

```env
# Use production Stripe keys
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Production webhook secret from Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=your_production_url
SUPABASE_SERVICE_ROLE_KEY=your_production_key

# Production Resend key
RESEND_API_KEY=re_xxxxx

# Your production domain
NEXT_PUBLIC_BASE_URL=https://coralrefuge.org
```

### Stripe Webhook Configuration

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Events to send: `checkout.session.completed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### Email Domain Verification

1. Go to Resend dashboard
2. Add your domain
3. Add DNS records as instructed
4. Update `from` address in `lib/email-service.ts`

## Critical Success Criteria

All of these MUST work before launch:

- ✅ Payment completes in Stripe
- ✅ Webhook receives and verifies event
- ✅ Database record created with all fields
- ✅ Certificate PDF generates correctly
- ✅ Email sends with attachment
- ✅ User sees sponsorship in dashboard
- ✅ No errors in logs
- ✅ GPS coordinates are accurate
- ✅ Certificate ID is unique and verifiable
- ✅ Impact metrics calculate correctly

## Support

For issues or questions:

- Check the debugging section above
- Review server logs for error messages
- Verify all environment variables are set correctly
- Check Stripe dashboard for payment status
- Check Resend dashboard for email delivery status

## License

MIT

## Credits

Built for protecting coral refugia in Egypt's Red Sea in partnership with HEPCA (Hurghada Environmental Protection and Conservation Association).
