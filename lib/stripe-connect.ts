/**
 * ═══════════════════════════════════════════════════════════════
 * STRIPE CONNECT HELPERS
 * ═══════════════════════════════════════════════════════════════
 * Functions for marketplace payment splits (15% platform / 85% partner)
 * Makes adding partners as easy as Airbnb adding hosts
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Get partner account for a specific MPA
 * Returns HEPCA for both Ras Mohammed and Giftun Islands in MVP
 *
 * @param mpaSlug - The MPA slug (e.g., 'ras-mohammed')
 * @returns Partner account details including Stripe account ID
 * @throws Error if no active partner found for MPA
 */
export async function getPartnerAccountForMPA(mpaSlug: string) {
  const { data, error } = await supabase
    .from('partner_accounts')
    .select('*')
    .contains('mpa_slugs', [mpaSlug])
    .eq('active', true)
    .single();

  if (error || !data) {
    throw new Error(`No active partner found for MPA: ${mpaSlug}`);
  }

  return data;
}

/**
 * Calculate 15/85 payment split
 * Platform fee: 15% (Coral Refuge)
 * Partner amount: 85% (Conservation NGO)
 *
 * @param totalAmountInCents - Total payment amount in cents
 * @returns Object with total, platform fee, and partner amount
 */
export function calculateFees(totalAmountInCents: number) {
  const platformFee = Math.round(totalAmountInCents * 0.15); // 15%
  const partnerAmount = totalAmountInCents - platformFee; // 85%

  return {
    totalAmount: totalAmountInCents,
    platformFee,
    partnerAmount,
    platformPercentage: 15,
    partnerPercentage: 85,
  };
}

/**
 * Get all partner accounts (for admin panel)
 *
 * @returns Array of all partner accounts
 */
export async function getAllPartnerAccounts() {
  const { data, error } = await supabase
    .from('partner_accounts')
    .select('*')
    .order('partner_name');

  if (error) throw new Error('Failed to fetch partners');
  return data;
}

/**
 * Add new partner account (for future scaling)
 * This makes adding partners as easy as Airbnb adding hosts
 *
 * @param data - Partner details including name, email, Stripe ID, and MPAs
 * @returns Created partner account
 */
export async function addPartnerAccount(data: {
  partnerName: string;
  partnerEmail: string;
  stripeAccountId: string;
  mpaSlugs: string[];
  contactPerson?: string;
  contactPhone?: string;
}) {
  const { data: partner, error } = await supabase
    .from('partner_accounts')
    .insert({
      partner_name: data.partnerName,
      partner_email: data.partnerEmail,
      stripe_account_id: data.stripeAccountId,
      mpa_slugs: data.mpaSlugs,
      contact_person: data.contactPerson,
      contact_phone: data.contactPhone,
    })
    .select()
    .single();

  if (error) throw new Error('Failed to add partner');
  return partner;
}

/**
 * Update partner's Stripe account ID
 * Used during onboarding when partner completes Stripe Connect flow
 *
 * @param partnerId - Partner UUID
 * @param stripeAccountId - Stripe Connected Account ID (acct_xxx)
 * @returns Updated partner account
 */
export async function updatePartnerStripeAccount(
  partnerId: string,
  stripeAccountId: string
) {
  const { data, error } = await supabase
    .from('partner_accounts')
    .update({
      stripe_account_id: stripeAccountId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', partnerId)
    .select()
    .single();

  if (error) throw new Error('Failed to update partner');
  return data;
}

/**
 * Get partner revenue statistics
 * Useful for partner dashboard and admin reporting
 *
 * @param partnerName - Optional partner name filter
 * @returns Revenue statistics
 */
export async function getPartnerRevenue(partnerName?: string) {
  let query = supabase.from('partner_revenue_stats').select('*');

  if (partnerName) {
    query = query.eq('partner_name', partnerName);
  }

  const { data, error } = await query;

  if (error) throw new Error('Failed to fetch partner revenue');
  return data;
}
