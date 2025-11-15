'use client';

import { useState } from 'react';
import Button from '@/components/Button';

interface RegistryEntry {
  id: string;
  sponsorName: string;
  company?: string;
  mpaName: string;
  hectares: number;
  date: string;
  message?: string;
  isAnonymous: boolean;
}

// Placeholder data to demonstrate the concept
const placeholderEntries: RegistryEntry[] = [
  {
    id: '1',
    sponsorName: 'Sarah Johnson',
    company: 'Ocean Tech Solutions',
    mpaName: 'Ras Mohammed National Park',
    hectares: 10,
    date: '2024-11-01',
    message: 'Protecting our oceans for future generations. Every hectare counts!',
    isAnonymous: false,
  },
  {
    id: '2',
    sponsorName: 'Anonymous Sponsor',
    company: undefined,
    mpaName: 'Giftun Islands Protected Area',
    hectares: 25,
    date: '2024-11-03',
    message: undefined,
    isAnonymous: true,
  },
  {
    id: '3',
    sponsorName: 'Michael Chen',
    company: undefined,
    mpaName: 'Wadi El Gemal National Park',
    hectares: 5,
    date: '2024-11-05',
    message: 'Happy to contribute to this important cause!',
    isAnonymous: false,
  },
  {
    id: '4',
    sponsorName: 'EcoGlobal Corp',
    company: 'EcoGlobal Corp',
    mpaName: 'Ras Mohammed National Park',
    hectares: 50,
    date: '2024-11-07',
    message: 'Part of our commitment to ocean conservation and ESG goals.',
    isAnonymous: false,
  },
  {
    id: '5',
    sponsorName: 'Emma Rodriguez',
    company: undefined,
    mpaName: 'Giftun Islands Protected Area',
    hectares: 8,
    date: '2024-11-08',
    message: 'Growing up by the ocean, I want to ensure its beauty endures.',
    isAnonymous: false,
  },
  {
    id: '6',
    sponsorName: 'Anonymous Sponsor',
    company: 'Tech Innovations Inc',
    mpaName: 'Wadi El Gemal National Park',
    hectares: 15,
    date: '2024-11-10',
    message: undefined,
    isAnonymous: true,
  },
  {
    id: '7',
    sponsorName: 'David Kim',
    company: undefined,
    mpaName: 'Ras Mohammed National Park',
    hectares: 12,
    date: '2024-11-11',
    message: 'Coral reefs are the rainforests of the sea. Let\'s protect them!',
    isAnonymous: false,
  },
  {
    id: '8',
    sponsorName: 'BlueWave Foundation',
    company: 'BlueWave Foundation',
    mpaName: 'Giftun Islands Protected Area',
    hectares: 30,
    date: '2024-11-12',
    message: 'Dedicated to marine conservation worldwide.',
    isAnonymous: false,
  },
];

export default function RegistryPage() {
  const [filter, setFilter] = useState<string>('all');
  const [entries] = useState<RegistryEntry[]>(placeholderEntries);

  const filteredEntries = filter === 'all'
    ? entries
    : entries.filter(entry => entry.mpaName === filter);

  const totalHectares = entries.reduce((sum, entry) => sum + entry.hectares, 0);
  const totalSponsors = entries.length;
  const uniqueMPAs = Array.from(new Set(entries.map(entry => entry.mpaName)));

  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Sponsorship Registry
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Every hectare protected makes a difference
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-turquoise mb-2">{totalHectares}</div>
              <div className="text-gray-700 font-semibold">Hectares Protected</div>
            </div>
            <div className="text-center bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-turquoise mb-2">{totalSponsors}</div>
              <div className="text-gray-700 font-semibold">Active Guardians</div>
            </div>
            <div className="text-center bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-turquoise mb-2">{uniqueMPAs.length}</div>
              <div className="text-gray-700 font-semibold">Protected Refuges</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-ocean-deep">All Sponsorships</h2>
            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-semibold">Filter by MPA:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
              >
                <option value="all">All MPAs</option>
                {uniqueMPAs.map(mpa => (
                  <option key={mpa} value={mpa}>{mpa}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Registry Entries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-turquoise hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-ocean-deep">
                      {entry.isAnonymous ? 'Anonymous Sponsor' : entry.sponsorName}
                    </h3>
                    {entry.company && (
                      <p className="text-sm text-gray-500">{entry.company}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-turquoise">{entry.hectares}</div>
                    <div className="text-xs text-gray-500">hectares</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-ocean-blue">🌊</span>
                    <span className="font-semibold">{entry.mpaName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>📅</span>
                    <span>{new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>

                {entry.message && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-turquoise">
                    <p className="text-gray-700 italic">&quot;{entry.message}&quot;</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No sponsorships found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-ocean-deep to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Sponsor
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join these guardians in protecting climate-resilient coral reefs
          </p>
          <Button href="/sponsor" size="lg">
            Protect Coral Reefs Now
          </Button>
        </div>
      </section>
    </main>
  );
}
