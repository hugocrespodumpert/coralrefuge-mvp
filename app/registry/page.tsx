'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

interface RegistryEntry {
  id: string;
  certificate_id: string;
  sponsorName: string;
  company?: string;
  mpaName: string;
  hectares: number;
  date: string;
  isAnonymous: boolean;
}

interface SponsorshipData {
  id: string;
  certificate_id: string;
  sponsor_name: string;
  company?: string;
  mpa_name: string;
  hectares: number;
  is_anonymous: boolean;
  created_at: string;
}

export default function RegistryPage() {
  const [filter, setFilter] = useState<string>('all');
  const [entries, setEntries] = useState<RegistryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSponsorships();
  }, []);

  const fetchSponsorships = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('sponsorships')
      .select('id, certificate_id, sponsor_name, company, mpa_name, hectares, is_anonymous, created_at')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sponsorships:', error);
    } else {
      const formattedEntries = (data || []).map((item: SponsorshipData) => ({
        id: item.id,
        certificate_id: item.certificate_id,
        sponsorName: item.sponsor_name,
        company: item.company,
        mpaName: item.mpa_name,
        hectares: item.hectares,
        date: item.created_at,
        isAnonymous: item.is_anonymous,
      }));
      setEntries(formattedEntries);
    }
    setIsLoading(false);
  };

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
              <div className="text-gray-700 font-semibold">Active Sponsors</div>
            </div>
            <div className="text-center bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-turquoise mb-2">{uniqueMPAs.length || 3}</div>
              <div className="text-gray-700 font-semibold">Protected Refuges</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-ocean-deep">All Sponsorships</h2>
            {uniqueMPAs.length > 0 && (
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
            )}
          </div>

          {/* Registry Entries */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise mb-4"></div>
              <p className="text-gray-500 text-lg">Loading sponsorships...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-turquoise hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-ocean-deep">
                          {entry.isAnonymous ? '🔒 Anonymous Sponsor' : entry.sponsorName}
                        </h3>
                        {entry.company && !entry.isAnonymous && (
                          <p className="text-sm text-gray-500">{entry.company}</p>
                        )}
                        <p className="text-xs text-gray-400 font-mono mt-1">
                          {entry.certificate_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-turquoise">{entry.hectares}</div>
                        <div className="text-xs text-gray-500">hectare{entry.hectares > 1 ? 's' : ''}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
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
                      <div className="flex items-center gap-2 text-gray-500">
                        <span>🪸</span>
                        <span className="text-sm">Protecting coral reefs for 10 years</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEntries.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    {filter === 'all'
                      ? 'No sponsorships yet. Be the first to protect our coral reefs!'
                      : 'No sponsorships found for this MPA.'}
                  </p>
                  <Button href="/sponsor">
                    Become a Sponsor
                  </Button>
                </div>
              )}
            </>
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
