import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database Types
export interface WaitlistSignup {
  id?: string;
  name: string;
  email: string;
  company?: string;
  mpa_id: string;
  hectares: number;
  amount: number;
  interested_in_partnership: boolean;
  created_at?: string;
}

export interface PartnershipInquiry {
  id?: string;
  company_name: string;
  contact_name: string;
  email: string;
  company_size: string;
  interest_type: string;
  message?: string;
  created_at?: string;
}

export interface RegistryEntry {
  id?: string;
  sponsor_name: string;
  company?: string;
  mpa_name: string;
  hectares: number;
  date: string;
  message?: string;
  is_anonymous: boolean;
  created_at?: string;
}
