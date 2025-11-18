'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';

interface MPA {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  stats: string;
  image: string;
  photographer: string;
  available: number;
}

const mpas: MPA[] = [
  {
    id: 'ras-mohammed',
    name: 'Ras Mohammed National Park',
    location: 'South Sinai, Egypt',
    country: '🇪🇬 Egypt',
    description: 'One of the Red Sea\'s most pristine coral refuges with exceptional biodiversity. Home to over 220 species of coral and 1,000+ species of fish. Established in 1983 with cooler water influx from deep channels providing high climate resilience.',
    stats: '220+ coral species • 1,000+ fish species',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
    photographer: 'NEOM',
    available: 1200,
  },
  {
    id: 'giftun-islands',
    name: 'Giftun Islands Protected Area',
    location: 'Hurghada, Red Sea, Egypt',
    country: '🇪🇬 Egypt',
    description: 'A biodiversity hotspot established in 1986 with diverse reef structures and strong currents. Home to 196 coral species and 850+ fish species. Demonstrates remarkable resilience to ocean warming through its unique hydrodynamic conditions.',
    stats: '196 coral species • 850+ fish species',
    image: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80',
    photographer: 'Francesco Ungaro',
    available: 800,
  },
  {
    id: 'wadi-el-gemal',
    name: 'Wadi El Gemal National Park',
    location: 'Marsa Alam, Red Sea, Egypt',
    country: '🇪🇬 Egypt',
    description: 'Established in 2005, this pristine marine park hosts 450+ fish species, 150+ coral species, along with dugongs and dolphins. Minimal warming impact makes this one of the highest climate resilience refugia in the Red Sea.',
    stats: '150+ coral species • 450+ fish species',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    photographer: 'Q.U.I',
    available: 1500,
  },
];

export default function SponsorPage() {
  const searchParams = useSearchParams();
  const [selectedMPA, setSelectedMPA] = useState<MPA | null>(null);
  const [hectares, setHectares] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const pricePerHectare = 150;
  const totalPrice = hectares * pricePerHectare;

  // Pre-select MPA from query parameter (e.g., /sponsor?mpa=ras-mohammed)
  useEffect(() => {
    const mpaSlug = searchParams.get('mpa');
    if (mpaSlug) {
      const mpa = mpas.find(m => m.id === mpaSlug);
      if (mpa) {
        console.log('🎯 Pre-selecting MPA from URL:', mpa.name);
        setSelectedMPA(mpa);
        // Scroll to form section
        setTimeout(() => {
          const formSection = document.getElementById('sponsor-form');
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const handleSelectMPA = (mpa: MPA) => {
    setSelectedMPA(mpa);
    setError('');
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          mpaId: selectedMPA?.id,
          mpaName: selectedMPA?.name,
          hectares,
          isAnonymous: formData.isAnonymous,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Choose Your Coral Refuge to Protect
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Select a marine protected area and sponsor hectares to become a sponsor of climate-resilient coral reefs
          </p>
          {/* Test Mode Indicator */}
          <div className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
            ⚠️ TEST MODE - Use card 4242 4242 4242 4242
          </div>
        </div>
      </section>

      {/* MPA Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mpas.map((mpa) => (
              <div
                key={mpa.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  selectedMPA?.id === mpa.id
                    ? 'ring-4 ring-turquoise scale-105'
                    : 'hover:shadow-2xl hover:scale-102'
                }`}
              >
                <div className="relative h-64">
                  <Image
                    src={mpa.image}
                    alt={`${mpa.name} coral reef`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-ocean-deep">
                    {mpa.country}
                  </div>
                  {selectedMPA?.id === mpa.id && (
                    <div className="absolute top-4 right-4 bg-turquoise text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Selected
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">{mpa.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{mpa.location}</p>
                  <p className="text-coral font-semibold mb-3">{mpa.stats}</p>
                  <p className="text-gray-600 text-sm mb-4">{mpa.description}</p>
                  <p className="text-xs text-gray-400 italic mb-4">
                    Photo: {mpa.photographer} / The Ocean Agency
                  </p>

                  {selectedMPA?.id === mpa.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Hectares (1-50)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={hectares}
                          onChange={(e) => setHectares(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                        />
                      </div>
                      <div className="bg-turquoise/10 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600">Total Investment</div>
                        <div className="text-3xl font-bold text-turquoise">${totalPrice}</div>
                        <div className="text-xs text-gray-500">${pricePerHectare} per hectare</div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleSelectMPA(mpa)}
                      variant="secondary"
                      className="w-full"
                    >
                      Select This Refuge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Form */}
      {selectedMPA && (
        <section className="py-12 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-ocean-blue/5 to-turquoise/5 rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-ocean-deep mb-2 text-center">
                Complete Your Sponsorship
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Protect {hectares} hectare{hectares > 1 ? 's' : ''} of {selectedMPA.name}
              </p>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form id="sponsor-form" onSubmit={handleProceedToPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                    placeholder="Your Company"
                  />
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Selected MPA:</span>
                    <span className="text-ocean-deep">{selectedMPA.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Hectares:</span>
                    <span className="text-ocean-deep">{hectares}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-bold text-gray-700">Total:</span>
                    <span className="font-bold text-turquoise text-xl">${totalPrice}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="mt-1 w-5 h-5 text-turquoise border-gray-300 rounded focus:ring-turquoise"
                  />
                  <label htmlFor="anonymous" className="ml-3 text-sm text-gray-600">
                    Make my sponsorship anonymous in the public registry
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Redirecting to Payment...' : 'Proceed to Payment'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to Stripe&apos;s secure checkout page to complete your payment.
                  Your certificate will be emailed within 24 hours.
                </p>

                <div className="bg-turquoise/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-700">
                    <strong>💳 Test Card:</strong> 4242 4242 4242 4242 | Exp: Any future date | CVC: Any 3 digits
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
