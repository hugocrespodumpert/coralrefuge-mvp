-- Coral Refuge MVP Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sponsorships table
CREATE TABLE IF NOT EXISTS sponsorships (
  -- Primary key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Customer information
  email TEXT NOT NULL,
  name TEXT NOT NULL,

  -- MPA (Marine Protected Area) details
  mpa_slug TEXT NOT NULL,
  mpa_name TEXT NOT NULL,

  -- Sponsorship details
  hectares INTEGER NOT NULL CHECK (hectares > 0),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  pricing_tier TEXT NOT NULL CHECK (pricing_tier IN ('annual', 'multi-year', 'monthly')),

  -- Stripe payment information
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent TEXT,

  -- Status tracking
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),

  -- Certificate information
  certificate_id TEXT NOT NULL UNIQUE,
  certificate_sent BOOLEAN DEFAULT FALSE,
  certificate_sent_at TIMESTAMPTZ,

  -- Location data (stored as JSONB for flexibility)
  coordinates JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sponsorships_email ON sponsorships(email);
CREATE INDEX IF NOT EXISTS idx_sponsorships_stripe_session ON sponsorships(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_sponsorships_certificate_id ON sponsorships(certificate_id);
CREATE INDEX IF NOT EXISTS idx_sponsorships_status ON sponsorships(status);
CREATE INDEX IF NOT EXISTS idx_sponsorships_created_at ON sponsorships(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_sponsorships_updated_at
    BEFORE UPDATE ON sponsorships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE sponsorships IS 'Stores coral reef sponsorship records';
COMMENT ON COLUMN sponsorships.id IS 'Unique identifier for the sponsorship';
COMMENT ON COLUMN sponsorships.email IS 'Email address of the sponsor';
COMMENT ON COLUMN sponsorships.name IS 'Full name of the sponsor';
COMMENT ON COLUMN sponsorships.mpa_slug IS 'URL-friendly identifier for the MPA';
COMMENT ON COLUMN sponsorships.mpa_name IS 'Full name of the Marine Protected Area';
COMMENT ON COLUMN sponsorships.hectares IS 'Number of hectares sponsored';
COMMENT ON COLUMN sponsorships.amount IS 'Total amount paid in USD';
COMMENT ON COLUMN sponsorships.pricing_tier IS 'Type of pricing plan selected';
COMMENT ON COLUMN sponsorships.stripe_session_id IS 'Stripe checkout session ID';
COMMENT ON COLUMN sponsorships.stripe_payment_intent IS 'Stripe payment intent ID';
COMMENT ON COLUMN sponsorships.status IS 'Current status of the sponsorship';
COMMENT ON COLUMN sponsorships.certificate_id IS 'Unique certificate identifier';
COMMENT ON COLUMN sponsorships.certificate_sent IS 'Whether certificate email was sent';
COMMENT ON COLUMN sponsorships.certificate_sent_at IS 'When certificate email was sent';
COMMENT ON COLUMN sponsorships.coordinates IS 'GPS coordinates of protected area as {lat, lon}';
COMMENT ON COLUMN sponsorships.created_at IS 'When the sponsorship was created';
COMMENT ON COLUMN sponsorships.updated_at IS 'When the sponsorship was last updated';

-- Optional: Create a view for active sponsorships
CREATE OR REPLACE VIEW active_sponsorships AS
SELECT
  id,
  email,
  name,
  mpa_name,
  hectares,
  amount,
  certificate_id,
  coordinates,
  created_at
FROM sponsorships
WHERE status = 'completed'
  AND certificate_sent = TRUE
ORDER BY created_at DESC;

COMMENT ON VIEW active_sponsorships IS 'View of all completed and verified sponsorships';

-- Optional: Create a function to get sponsorships by email
CREATE OR REPLACE FUNCTION get_sponsorships_by_email(user_email TEXT)
RETURNS TABLE (
  id UUID,
  mpa_name TEXT,
  hectares INTEGER,
  amount DECIMAL(10, 2),
  certificate_id TEXT,
  coordinates JSONB,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.mpa_name,
    s.hectares,
    s.amount,
    s.certificate_id,
    s.coordinates,
    s.created_at
  FROM sponsorships s
  WHERE s.email = user_email
    AND s.status = 'completed'
  ORDER BY s.created_at DESC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_sponsorships_by_email IS 'Retrieves all sponsorships for a given email address';

-- Grant necessary permissions (adjust based on your RLS policies)
-- For now, using service role key in the app, so no RLS needed
-- In production, you would want to add Row Level Security policies

-- Example RLS policies (commented out - enable if needed):
/*
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own sponsorships
CREATE POLICY "Users can view own sponsorships"
  ON sponsorships
  FOR SELECT
  USING (auth.email() = email);

-- Policy: Only service role can insert
CREATE POLICY "Service role can insert sponsorships"
  ON sponsorships
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Only service role can update
CREATE POLICY "Service role can update sponsorships"
  ON sponsorships
  FOR UPDATE
  USING (auth.role() = 'service_role');
*/

-- Insert some sample data for testing (optional - comment out if not needed)
/*
INSERT INTO sponsorships (
  email,
  name,
  mpa_slug,
  mpa_name,
  hectares,
  amount,
  stripe_session_id,
  stripe_payment_intent,
  status,
  certificate_id,
  certificate_sent,
  certificate_sent_at,
  coordinates,
  pricing_tier
) VALUES (
  'test@example.com',
  'Test User',
  'ras-mohammed',
  'Ras Mohammed National Park',
  5,
  500.00,
  'cs_test_sample123',
  'pi_test_sample123',
  'completed',
  'CR-TEST-SAMPLE-123',
  TRUE,
  NOW(),
  '{"lat": 27.7386, "lon": 34.2358}'::jsonb,
  'annual'
);
*/

-- Display table structure
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'sponsorships'
ORDER BY ordinal_position;
