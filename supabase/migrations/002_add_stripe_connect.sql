-- ═══════════════════════════════════════════════════════════════
-- STRIPE CONNECT PLATFORM MIGRATION
-- ═══════════════════════════════════════════════════════════════
-- Enables marketplace model with automatic 15/85 payment splits
-- MVP: HEPCA manages Ras Mohammed + Giftun Islands
-- Future: Easy to add more partners (like Airbnb adding hosts)

-- ───────────────────────────────────────────────────────────────
-- STEP 1: Add Stripe Connect columns to sponsorships table
-- ───────────────────────────────────────────────────────────────
ALTER TABLE sponsorships
ADD COLUMN connected_account_id TEXT,
ADD COLUMN platform_fee_amount INTEGER,
ADD COLUMN partner_amount INTEGER,
ADD COLUMN partner_name TEXT;

-- Add indexes for performance
CREATE INDEX idx_sponsorships_connected_account ON sponsorships(connected_account_id);
CREATE INDEX idx_sponsorships_partner_name ON sponsorships(partner_name);

-- ───────────────────────────────────────────────────────────────
-- STEP 2: Create partner_accounts table
-- ───────────────────────────────────────────────────────────────
-- Partners who receive funds (like Airbnb hosts)
CREATE TABLE partner_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name TEXT UNIQUE NOT NULL,
  partner_email TEXT,
  stripe_account_id TEXT UNIQUE NOT NULL,
  mpa_slugs TEXT[] NOT NULL,
  contact_person TEXT,
  contact_phone TEXT,
  active BOOLEAN DEFAULT true,
  onboarded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for fast lookups
CREATE INDEX idx_partner_accounts_active ON partner_accounts(active);
CREATE INDEX idx_partner_accounts_stripe_id ON partner_accounts(stripe_account_id);

-- ───────────────────────────────────────────────────────────────
-- STEP 3: Insert MVP partner (HEPCA)
-- ───────────────────────────────────────────────────────────────
-- MVP: HEPCA manages both Ras Mohammed and Giftun Islands
-- User will replace placeholder with real Stripe account ID
INSERT INTO partner_accounts (
  partner_name,
  partner_email,
  stripe_account_id,
  mpa_slugs,
  contact_person
) VALUES (
  'HEPCA',
  'hepca@example.com',
  'acct_test_hepca_placeholder',
  ARRAY['ras-mohammed', 'giftun-islands'],
  'Ahmed Hassan'
);

-- ───────────────────────────────────────────────────────────────
-- STEP 4: Create revenue stats view (for admin dashboard)
-- ───────────────────────────────────────────────────────────────
CREATE VIEW partner_revenue_stats AS
SELECT
  partner_name,
  COUNT(*) as total_sponsorships,
  SUM(hectares) as total_hectares,
  SUM(amount_paid) as total_revenue,
  SUM(platform_fee_amount) as total_platform_fees,
  SUM(partner_amount) as total_partner_amount
FROM sponsorships
WHERE status = 'active'
GROUP BY partner_name;

-- ───────────────────────────────────────────────────────────────
-- NOTES
-- ───────────────────────────────────────────────────────────────
-- 1. Replace 'acct_test_hepca_placeholder' with real Stripe account ID
-- 2. For production: Update email to real HEPCA contact
-- 3. Adding new partners: Just INSERT new row with their MPAs
-- 4. System automatically routes payments to correct partner
