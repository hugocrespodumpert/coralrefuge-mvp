'use client';

import { useState } from 'react';

// Sample MPA data (in production, this would come from Supabase)
const MPAS = [
  {
    id: '1',
    slug: 'ras-mohammed',
    name: 'Ras Mohammed National Park',
    location: 'South Sinai, Egypt',
    coordinates: { lat: 27.7386, lon: 34.2358 },
    description: 'One of the most spectacular coral reef ecosystems in the Red Sea',
    price_per_hectare_annual: 100,
    price_per_hectare_multi_year: 80,
    available_hectares: 500,
  },
  {
    id: '2',
    slug: 'abu-galum',
    name: 'Abu Galum Protected Area',
    location: 'South Sinai, Egypt',
    coordinates: { lat: 28.9542, lon: 34.6833 },
    description: 'Pristine coral gardens with exceptional biodiversity',
    price_per_hectare_annual: 100,
    price_per_hectare_multi_year: 80,
    available_hectares: 300,
  },
  {
    id: '3',
    slug: 'giftun-island',
    name: 'Giftun Island Marine Reserve',
    location: 'Hurghada, Egypt',
    coordinates: { lat: 27.2246, lon: 33.9308 },
    description: 'Critical coral refuge with active protection patrols',
    price_per_hectare_annual: 100,
    price_per_hectare_multi_year: 80,
    available_hectares: 400,
  },
];

export default function SponsorPage() {
  const [selectedMPA, setSelectedMPA] = useState(MPAS[0]);
  const [hectares, setHectares] = useState(1);
  const [pricingTier, setPricingTier] = useState<'annual' | 'multi-year'>('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pricePerHectare =
    pricingTier === 'annual'
      ? selectedMPA.price_per_hectare_annual
      : selectedMPA.price_per_hectare_multi_year;

  const totalPrice = hectares * pricePerHectare;
  const coralCount = hectares * 220;

  const handleSponsorNow = async () => {
    console.log('Starting checkout process...');
    setLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mpa_slug: selectedMPA.slug,
          mpa_name: selectedMPA.name,
          hectares,
          pricing_tier: pricingTier,
          price_per_hectare: pricePerHectare,
          coordinates: selectedMPA.coordinates,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      console.log('Redirecting to Stripe Checkout:', url);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-cyan-900 mb-4">
            Protect Coral Refugia
          </h1>
          <p className="text-xl text-cyan-700 max-w-3xl mx-auto">
            Sponsor marine protected areas in Egypt's Red Sea and receive a verified
            certificate of your conservation impact.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left Column - Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-cyan-900 mb-6">
              Select Your Protected Area
            </h2>

            {/* MPA Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Marine Protected Area
              </label>
              <div className="space-y-3">
                {MPAS.map((mpa) => (
                  <button
                    key={mpa.id}
                    onClick={() => setSelectedMPA(mpa)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedMPA.id === mpa.id
                        ? 'border-cyan-600 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{mpa.name}</div>
                    <div className="text-sm text-gray-600">{mpa.location}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {mpa.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Tier */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Pricing Plan
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPricingTier('annual')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    pricingTier === 'annual'
                      ? 'border-cyan-600 bg-cyan-50'
                      : 'border-gray-200 hover:border-cyan-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">Annual</div>
                  <div className="text-sm text-gray-600">
                    ${selectedMPA.price_per_hectare_annual}/ha
                  </div>
                </button>
                <button
                  onClick={() => setPricingTier('multi-year')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    pricingTier === 'multi-year'
                      ? 'border-cyan-600 bg-cyan-50'
                      : 'border-gray-200 hover:border-cyan-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">3-Year</div>
                  <div className="text-sm text-gray-600">
                    ${selectedMPA.price_per_hectare_multi_year}/ha
                  </div>
                  <div className="text-xs text-green-600 font-semibold">Save 20%</div>
                </button>
              </div>
            </div>

            {/* Hectares Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Hectares to Protect
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={hectares}
                onChange={(e) => setHectares(parseInt(e.target.value))}
                className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-2xl font-bold text-cyan-900">{hectares}</span>
                <span className="text-sm text-gray-600">
                  hectares ({(hectares * 10000).toLocaleString()} m²)
                </span>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Sponsor Button */}
            <button
              onClick={handleSponsorNow}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Processing...' : `Sponsor Now - $${totalPrice}`}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Secure payment via Stripe • Certificate sent immediately
            </p>
          </div>

          {/* Right Column - Impact Preview */}
          <div className="space-y-6">
            {/* Impact Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-cyan-900 mb-6">
                Your Conservation Impact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">🪸</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      ~{coralCount.toLocaleString()} coral colonies
                    </div>
                    <div className="text-sm text-gray-600">
                      Under active protection
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl mr-3">🐟</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Critical habitat for 1,000+ species
                    </div>
                    <div className="text-sm text-gray-600">
                      Fish, invertebrates, and marine life
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl mr-3">🛡️</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Direct patrol funding
                    </div>
                    <div className="text-sm text-gray-600">
                      Support for HEPCA enforcement operations
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-3xl mr-3">📊</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Quarterly impact reports
                    </div>
                    <div className="text-sm text-gray-600">
                      Photos and research updates from the field
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">What You'll Receive</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📜</span>
                  <span>Beautiful PDF certificate with GPS coordinates</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✉️</span>
                  <span>Instant email delivery</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🔍</span>
                  <span>Verifiable certificate ID</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🗺️</span>
                  <span>Access to dashboard with satellite imagery</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-cyan-500">
                <p className="text-sm opacity-90">
                  Your certificate includes the exact GPS coordinates of your protected
                  area. You can visit anytime for diving or snorkeling!
                </p>
              </div>
            </div>

            {/* Test Card Info */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-2">
                Test Mode - For Development
              </h4>
              <p className="text-sm text-yellow-800 mb-2">
                Use this test card number:
              </p>
              <code className="block bg-yellow-100 px-3 py-2 rounded text-yellow-900 font-mono text-sm">
                4242 4242 4242 4242
              </code>
              <p className="text-xs text-yellow-700 mt-2">
                Any future expiration date and any 3-digit CVC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
