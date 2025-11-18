'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const MOCK_SPONSORSHIPS = [
  {
    id: '1',
    mpa_name: 'Ras Mohammed National Park',
    hectares: 5,
    amount: 500,
    created_at: '2024-01-15T10:30:00Z',
    certificate_id: 'CR-ABC123',
    status: 'completed',
    coordinates: { lat: 27.7386, lon: 34.2358 },
  },
  {
    id: '2',
    mpa_name: 'Abu Galum Protected Area',
    hectares: 3,
    amount: 240,
    created_at: '2024-02-01T14:20:00Z',
    certificate_id: 'CR-DEF456',
    status: 'completed',
    coordinates: { lat: 28.9542, lon: 34.6833 },
  },
];

export default function DashboardPage() {
  const [email, setEmail] = useState('');
  const [sponsorships, setSponsorships] = useState(MOCK_SPONSORSHIPS);
  const [loading, setLoading] = useState(false);

  const totalHectares = sponsorships.reduce((sum, s) => sum + s.hectares, 0);
  const totalAmount = sponsorships.reduce((sum, s) => sum + s.amount, 0);
  const totalCorals = totalHectares * 220;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-900 mb-2">
            My Conservation Portfolio
          </h1>
          <p className="text-lg text-cyan-700">
            Track your protected areas and conservation impact
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-cyan-600 text-3xl mb-2">🪸</div>
            <div className="text-3xl font-bold text-gray-900">{totalHectares}</div>
            <div className="text-sm text-gray-600">Hectares Protected</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-cyan-600 text-3xl mb-2">🐟</div>
            <div className="text-3xl font-bold text-gray-900">
              {totalCorals.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Coral Colonies</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-cyan-600 text-3xl mb-2">📍</div>
            <div className="text-3xl font-bold text-gray-900">
              {sponsorships.length}
            </div>
            <div className="text-sm text-gray-600">Protected Sites</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-cyan-600 text-3xl mb-2">💰</div>
            <div className="text-3xl font-bold text-gray-900">
              ${totalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Contribution</div>
          </div>
        </div>

        {/* Sponsorships List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyan-900 mb-6">
            Your Protected Areas
          </h2>

          {sponsorships.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🪸</div>
              <p className="text-xl text-gray-600 mb-6">
                You haven't protected any areas yet
              </p>
              <Link
                href="/sponsor"
                className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all"
              >
                Start Protecting Coral Reefs
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {sponsorships.map((sponsorship) => (
                <div
                  key={sponsorship.id}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-cyan-400 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {sponsorship.mpa_name}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Protected Area</div>
                          <div className="font-semibold text-gray-900">
                            {sponsorship.hectares} hectares
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Date</div>
                          <div className="font-semibold text-gray-900">
                            {formatDate(sponsorship.created_at)}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">GPS Coordinates</div>
                          <div className="font-semibold text-gray-900 font-mono text-sm">
                            {sponsorship.coordinates.lat.toFixed(6)}°N,{' '}
                            {sponsorship.coordinates.lon.toFixed(6)}°E
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Certificate ID</div>
                          <div className="font-semibold text-gray-900 font-mono text-sm">
                            {sponsorship.certificate_id}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                          Active Protection
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                      <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors text-sm font-semibold">
                        View Certificate
                      </button>
                      <button className="bg-white text-cyan-700 border-2 border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors text-sm font-semibold">
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Impact Timeline */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Conservation Journey</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <div className="font-semibold">Protection Activated</div>
                <div className="text-sm opacity-90">
                  Your funds have been deployed for patrol operations
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-white rounded-full mt-2 mr-4"></div>
              <div>
                <div className="font-semibold">Next Impact Report</div>
                <div className="text-sm opacity-90">
                  Quarterly update coming in March 2024
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-3 h-3 bg-white/50 rounded-full mt-2 mr-4"></div>
              <div>
                <div className="font-semibold opacity-75">Annual Site Visit</div>
                <div className="text-sm opacity-75">
                  Virtual tour with marine biologists in June 2024
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-cyan-900 mb-4">
            Protect More Coral Refugia
          </h2>
          <p className="text-gray-700 mb-6">
            Every hectare matters in the fight to save coral reefs from climate change.
          </p>
          <Link
            href="/sponsor"
            className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Sponsor Additional Area
          </Link>
        </div>
      </div>
    </div>
  );
}
