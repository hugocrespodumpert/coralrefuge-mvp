export interface MPA {
  id: string;
  slug: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  description: string;
  total_hectares: number;
  available_hectares: number;
  price_per_hectare_annual: number;
  price_per_hectare_multi_year: number;
  managed_by: string;
}

export interface Sponsorship {
  id: string;
  email: string;
  name: string;
  mpa_slug: string;
  mpa_name: string;
  hectares: number;
  amount: number;
  stripe_session_id: string;
  stripe_payment_intent: string | null;
  status: 'pending' | 'completed' | 'failed';
  certificate_sent: boolean;
  certificate_sent_at: string | null;
  certificate_id: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  pricing_tier: 'annual' | 'multi-year' | 'monthly';
  created_at: string;
}

export interface CheckoutSessionMetadata {
  mpa_slug: string;
  mpa_name: string;
  hectares: string;
  pricing_tier: 'annual' | 'multi-year' | 'monthly';
  coordinates_lat: string;
  coordinates_lon: string;
}

export interface CertificateData {
  sponsorshipId: string;
  recipientName: string;
  hectares: number;
  mpaName: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  certificateId: string;
  date: string;
  managedBy: string;
}
