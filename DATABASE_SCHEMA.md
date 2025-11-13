# Coral Refuge Database Schema

This document outlines the Supabase database schema for the Coral Refuge MVP.

## Tables

### 1. waitlist_signups

Stores information about individuals who have joined the waitlist to sponsor coral refuges.

```sql
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  mpa_id TEXT NOT NULL,
  hectares INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  interested_in_partnership BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX idx_waitlist_mpa ON waitlist_signups(mpa_id);
CREATE INDEX idx_waitlist_created ON waitlist_signups(created_at DESC);
```

**Fields:**
- `id`: Unique identifier for each signup
- `name`: Full name of the person signing up
- `email`: Email address for contact and confirmation
- `company`: Optional company name
- `mpa_id`: ID of the selected marine protected area
- `hectares`: Number of hectares to sponsor
- `amount`: Total sponsorship amount in USD
- `interested_in_partnership`: Whether they're interested in corporate partnerships
- `created_at`: Timestamp of signup

### 2. partnership_inquiries

Stores corporate partnership inquiry submissions.

```sql
CREATE TABLE partnership_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_size TEXT NOT NULL,
  interest_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_partnership_email ON partnership_inquiries(email);
CREATE INDEX idx_partnership_created ON partnership_inquiries(created_at DESC);
```

**Fields:**
- `id`: Unique identifier for each inquiry
- `company_name`: Name of the company
- `contact_name`: Name of the contact person
- `email`: Contact email address
- `company_size`: Size of the company (e.g., "1-10", "11-50")
- `interest_type`: Type of partnership (e.g., "revenue-based", "flat-commitment")
- `message`: Optional message from the company
- `created_at`: Timestamp of inquiry

### 3. sponsorships

**NEW TABLE FOR PHASE 2A** - Stores completed sponsorships after successful Stripe payments.

```sql
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  mpa_id TEXT NOT NULL,
  mpa_name TEXT NOT NULL,
  hectares INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  certificate_status TEXT NOT NULL DEFAULT 'pending' CHECK (certificate_status IN ('pending', 'generated', 'sent')),
  certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX idx_sponsorships_email ON sponsorships(email);
CREATE INDEX idx_sponsorships_mpa ON sponsorships(mpa_id);
CREATE INDEX idx_sponsorships_stripe ON sponsorships(stripe_session_id);
CREATE INDEX idx_sponsorships_status ON sponsorships(payment_status);
CREATE INDEX idx_sponsorships_created ON sponsorships(created_at DESC);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sponsorships_updated_at BEFORE UPDATE ON sponsorships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Fields:**
- `id`: Unique identifier for each sponsorship
- `stripe_session_id`: Unique Stripe checkout session ID
- `stripe_payment_intent`: Stripe payment intent ID (optional)
- `name`: Sponsor's full name
- `email`: Sponsor's email address
- `company`: Optional company name
- `mpa_id`: ID of the sponsored MPA
- `mpa_name`: Name of the sponsored MPA
- `hectares`: Number of hectares sponsored
- `amount`: Total amount paid in USD
- `is_anonymous`: Whether to display anonymously in registry
- `payment_status`: Payment status (pending, completed, failed, refunded)
- `certificate_status`: Certificate generation status (pending, generated, sent)
- `certificate_url`: URL to generated PDF certificate (optional)
- `created_at`: Timestamp of sponsorship creation
- `updated_at`: Timestamp of last update

### 4. registry_entries

Public registry of sponsored hectares (for display on the /registry page).

```sql
CREATE TABLE registry_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_name TEXT NOT NULL,
  company TEXT,
  mpa_name TEXT NOT NULL,
  hectares INTEGER NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_registry_mpa ON registry_entries(mpa_name);
CREATE INDEX idx_registry_date ON registry_entries(date DESC);
```

**Fields:**
- `id`: Unique identifier for each entry
- `sponsor_name`: Name of the sponsor (or "Anonymous Sponsor")
- `company`: Optional company name
- `mpa_name`: Name of the marine protected area
- `hectares`: Number of hectares sponsored
- `date`: Date of sponsorship
- `message`: Optional message from the sponsor
- `is_anonymous`: Whether to display as anonymous
- `created_at`: Timestamp of entry creation

## Row Level Security (RLS)

For production deployment, enable Row Level Security:

```sql
-- Enable RLS on all tables
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE registry_entries ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT on waitlist and partnership tables
CREATE POLICY "Allow public insert on waitlist"
  ON waitlist_signups FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on partnerships"
  ON partnership_inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public SELECT on registry entries
CREATE POLICY "Allow public select on registry"
  ON registry_entries FOR SELECT
  TO anon
  USING (true);

-- Admin users can do everything (configure based on your auth setup)
CREATE POLICY "Allow authenticated full access to waitlist"
  ON waitlist_signups FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated full access to partnerships"
  ON partnership_inquiries FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated full access to registry"
  ON registry_entries FOR ALL
  TO authenticated
  USING (true);
```

## Setup Instructions

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Run the SQL commands above in the Supabase SQL Editor
4. Add the credentials to your `.env.local` file
5. Test the connection by running the Next.js app

## Data Migration

To seed the registry with placeholder data:

```sql
INSERT INTO registry_entries (sponsor_name, company, mpa_name, hectares, date, message, is_anonymous)
VALUES
  ('Sarah Johnson', 'Ocean Tech Solutions', 'Ras Mohammed National Park', 10, '2024-11-01', 'Protecting our oceans for future generations. Every hectare counts!', false),
  ('Anonymous Sponsor', NULL, 'Red Sea Coral Triangle', 25, '2024-11-03', NULL, true),
  ('Michael Chen', NULL, 'Pacific Coral Refuge', 5, '2024-11-05', 'Happy to contribute to this important cause!', false),
  ('EcoGlobal Corp', 'EcoGlobal Corp', 'Great Barrier Reef Refuge Zone', 50, '2024-11-07', 'Part of our commitment to ocean conservation and ESG goals.', false);
```

## Backup and Maintenance

- Supabase automatically backs up your database
- Set up alerts for failed insertions
- Monitor table sizes and query performance in the Supabase dashboard
- Regularly export data for additional backup
