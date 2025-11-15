-- Create sponsorships table to track all paid sponsorships
CREATE TABLE IF NOT EXISTS sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  sponsor_name TEXT NOT NULL,
  sponsor_email TEXT NOT NULL,
  company TEXT,
  mpa_id TEXT NOT NULL,
  mpa_name TEXT NOT NULL,
  mpa_location TEXT NOT NULL,
  hectares INTEGER NOT NULL,
  amount_paid INTEGER NOT NULL, -- Amount in USD (not cents)
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active',
  certificate_url TEXT,
  certificate_generated_at TIMESTAMP WITH TIME ZONE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '10 years')
);

-- Create indexes for performance
CREATE INDEX idx_sponsorships_certificate_id ON sponsorships(certificate_id);
CREATE INDEX idx_sponsorships_email ON sponsorships(sponsor_email);
CREATE INDEX idx_sponsorships_mpa_id ON sponsorships(mpa_id);
CREATE INDEX idx_sponsorships_created_at ON sponsorships(created_at DESC);

-- Create a function to generate certificate IDs
CREATE OR REPLACE FUNCTION generate_certificate_id(mpa_id_param TEXT)
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  mpa_prefix TEXT;
  sequence_num INTEGER;
  cert_id TEXT;
BEGIN
  -- Get current year
  year_part := EXTRACT(YEAR FROM NOW())::TEXT;

  -- Convert MPA ID to uppercase prefix (first 3 letters)
  mpa_prefix := UPPER(SUBSTRING(REPLACE(mpa_id_param, '-', ''), 1, 3));

  -- Get next sequence number for this MPA and year
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM sponsorships
  WHERE mpa_id = mpa_id_param
    AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());

  -- Format: MPA-YEAR-XXXXX (e.g., RAS-2025-00001)
  cert_id := mpa_prefix || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 5, '0');

  RETURN cert_id;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE sponsorships IS 'Tracks all paid coral reef sponsorships with certificate generation status';
COMMENT ON COLUMN sponsorships.certificate_id IS 'Unique certificate identifier (format: MPA-YEAR-XXXXX)';
COMMENT ON COLUMN sponsorships.valid_until IS 'Certificate valid for 10 years from purchase date';
COMMENT ON COLUMN sponsorships.amount_paid IS 'Amount in USD (not cents) - typically $50 per hectare';
