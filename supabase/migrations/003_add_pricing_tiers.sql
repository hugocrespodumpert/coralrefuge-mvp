-- Add pricing tier columns to sponsorships table
ALTER TABLE sponsorships
ADD COLUMN IF NOT EXISTS pricing_tier TEXT DEFAULT 'annual',
ADD COLUMN IF NOT EXISTS commitment_duration INTEGER,
ADD COLUMN IF NOT EXISTS is_subscription BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Add index for subscription lookups
CREATE INDEX IF NOT EXISTS idx_sponsorships_subscription_id ON sponsorships(stripe_subscription_id);

-- Add comments for documentation
COMMENT ON COLUMN sponsorships.pricing_tier IS 'Pricing tier: annual, multi-year, or monthly';
COMMENT ON COLUMN sponsorships.commitment_duration IS 'Duration in years for multi-year commitments (2, 3, or 5)';
COMMENT ON COLUMN sponsorships.is_subscription IS 'True if this is a recurring monthly subscription';
COMMENT ON COLUMN sponsorships.stripe_subscription_id IS 'Stripe subscription ID for monthly subscriptions';
