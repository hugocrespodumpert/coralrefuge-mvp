'use client';

import { useState } from 'react';
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
    location: 'Sharm El Sheikh',
    country: '🇪🇬 Egypt',
    description: 'One of the Red Sea\'s most pristine coral refuges with exceptional biodiversity. Home to over 220 species of coral and 1,000 species of fish.',
    stats: '150 hectares available',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
    photographer: 'NEOM',
    available: 150,
  },
  {
    id: 'red-sea-triangle',
    name: 'Red Sea Coral Triangle',
    location: 'Northern Red Sea',
    country: '🌊 Red Sea',
    description: 'A biodiversity hotspot where corals thrive in warmer waters. This refuge demonstrates remarkable resilience to ocean warming.',
    stats: 'Home to 1,000+ species',
    image: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80',
    photographer: 'Francesco Ungaro',
    available: 200,
  },
  {
    id: 'pacific-refuge',
    name: 'Pacific Coral Refuge',
    location: 'Western Pacific',
    country: '🌡️ Climate Resilient',
    description: 'Protected deep-water corals adapted to survive climate change. These reefs can withstand temperature increases of up to 2°C.',
    stats: 'Can withstand 2°C warming',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    photographer: 'Q.U.I',
    available: 175,
  },
  {
    id: 'great-barrier-refuge',
    name: 'Great Barrier Reef Refuge Zone',
    location: 'Queensland',
    country: '🇦🇺 Australia',
    description: 'Special protection zone within the Great Barrier Reef identified as a climate refuge. Critical for species survival and reef regeneration.',
    stats: '250 hectares available',
    image: 'https://images.unsplash.com/photo-1587139223476-76b8e0c5c1e9?w=800&q=80',
    photographer: 'David Clode',
    available: 250,
  },
  {
    id: 'caribbean-resilient',
    name: 'Caribbean Resilient Reef Network',
    location: 'Caribbean Sea',
    country: '🌴 Caribbean',
    description: 'Network of resilient coral sites across the Caribbean showing recovery and adaptation. Key to restoring Caribbean reef ecosystems.',
    stats: 'Network of 5 protected sites',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    photographer: 'Oleksandr Sushko',
    available: 180,
  },
];

export default function SponsorPage() {
  const [selectedMPA, setSelectedMPA] = useState<MPA | null>(null);
  const [hectares, setHectares] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interestedInPartnership: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pricePerHectare = 50;
  const totalPrice = hectares * pricePerHectare;

  const handleSelectMPA = (mpa: MPA) => {
    setSelectedMPA(mpa);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log({
      ...formData,
      mpa: selectedMPA?.id,
      hectares,
      amount: totalPrice,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', company: '', interestedInPartnership: false });
    setHectares(1);
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
            Select a marine protected area and join the waitlist to become a guardian of climate-resilient coral reefs
          </p>
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

      {/* Waitlist Form */}
      {selectedMPA && (
        <section className="py-12 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-ocean-blue/5 to-turquoise/5 rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-ocean-deep mb-2 text-center">
                Join the Waitlist
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Be among the first guardians of {selectedMPA.name}
              </p>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-ocean-deep mb-2">You&apos;re on the list!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining the movement to protect coral reefs. We&apos;ll be in touch soon with next steps.
                  </p>
                  <Button onClick={() => {
                    setSelectedMPA(null);
                    setIsSuccess(false);
                  }}>
                    Protect Another Refuge
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      id="partnership"
                      checked={formData.interestedInPartnership}
                      onChange={(e) => setFormData({ ...formData, interestedInPartnership: e.target.checked })}
                      className="mt-1 w-5 h-5 text-turquoise border-gray-300 rounded focus:ring-turquoise"
                    />
                    <label htmlFor="partnership" className="ml-3 text-sm text-gray-600">
                      I&apos;m interested in exploring corporate partnership opportunities
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? 'Joining Waitlist...' : 'Join Waitlist'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By joining the waitlist, you&apos;ll be notified when sponsorships become available. No payment is required at this time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
