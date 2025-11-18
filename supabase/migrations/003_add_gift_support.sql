-- ═══════════════════════════════════════════════════════════════
-- GIFT CERTIFICATE SUPPORT MIGRATION
-- ═══════════════════════════════════════════════════════════════
-- Enables gift purchases with personalized messages and scheduled delivery
-- Perfect for birthdays, holidays, memorials, and corporate gifts

-- ───────────────────────────────────────────────────────────────
-- STEP 1: Add gift-related columns to sponsorships table
-- ───────────────────────────────────────────────────────────────
ALTER TABLE sponsorships
ADD COLUMN IF NOT EXISTS is_gift BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS gift_recipient_name TEXT,
ADD COLUMN IF NOT EXISTS gift_recipient_email TEXT,
ADD COLUMN IF NOT EXISTS gift_message TEXT,
ADD COLUMN IF NOT EXISTS gift_send_date DATE,
ADD COLUMN IF NOT EXISTS purchaser_name TEXT,
ADD COLUMN IF NOT EXISTS purchaser_email TEXT;

-- ───────────────────────────────────────────────────────────────
-- STEP 2: Add indexes for gift queries
-- ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sponsorships_is_gift ON sponsorships(is_gift);
CREATE INDEX IF NOT EXISTS idx_sponsorships_gift_recipient ON sponsorships(gift_recipient_email);
CREATE INDEX IF NOT EXISTS idx_sponsorships_gift_send_date ON sponsorships(gift_send_date);

-- ───────────────────────────────────────────────────────────────
-- STEP 3: Add column comments for documentation
-- ───────────────────────────────────────────────────────────────
COMMENT ON COLUMN sponsorships.is_gift IS 'Whether this sponsorship is a gift';
COMMENT ON COLUMN sponsorships.gift_recipient_name IS 'Name of the gift recipient';
COMMENT ON COLUMN sponsorships.gift_recipient_email IS 'Email of the gift recipient';
COMMENT ON COLUMN sponsorships.gift_message IS 'Personal message from gift giver (max 150 chars)';
COMMENT ON COLUMN sponsorships.gift_send_date IS 'Date to send gift certificate (NULL = immediate)';
COMMENT ON COLUMN sponsorships.purchaser_name IS 'Name of the gift purchaser (if different from recipient)';
COMMENT ON COLUMN sponsorships.purchaser_email IS 'Email of the gift purchaser (if different from recipient)';

-- ───────────────────────────────────────────────────────────────
-- NOTES
-- ───────────────────────────────────────────────────────────────
-- 1. For regular sponsorships: is_gift = false, gift fields = NULL
-- 2. For gifts: is_gift = true, gift fields populated, purchaser fields capture buyer info
-- 3. gift_send_date NULL means send immediately after payment
-- 4. gift_message limited to 150 characters in application logic
