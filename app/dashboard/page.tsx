'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserSponsorships, signOut } from '@/lib/auth';
import { getMPABySlug } from '@/lib/mpa-data';
import Link from 'next/link';
import Image from 'next/image';

interface Sponsorship {
  id: string;
  mpa_id: string;
  mpa_name: string;
  hectares: number;
  amount: number;
  created_at: string;
  certificate_url?: string;
  certificate_status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Get current user
      const userResult = await getCurrentUser();
      if (!userResult.success || !userResult.user) {
        router.push('/login');
        return;
      }

      setUser(userResult.user);

      // Get user's sponsorships
      const sponsorshipsResult = await getUserSponsorships(userResult.user.id);
      if (sponsorshipsResult.success) {
        setSponsorships(sponsorshipsResult.sponsorships);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Calculate total stats
  const totalHectares = sponsorships.reduce((sum, s) => sum + s.hectares, 0);
  const totalCoralColonies = Math.round(totalHectares * 220); // ~220 colonies per hectare
  const totalSpent = sponsorships.reduce((sum, s) => sum + s.amount, 0);
  const memberSince = sponsorships.length > 0
    ? new Date(sponsorships[sponsorships.length - 1].created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      })
    : 'N/A';

  const uniqueMPAs = new Set(sponsorships.map(s => s.mpa_id)).size;

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Hi {user?.user_metadata?.name || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-white/90">
                You've protected <strong>{totalHectares}</strong> hectares across{' '}
                <strong>{uniqueMPAs}</strong> {uniqueMPAs === 1 ? 'MPA' : 'MPAs'}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              Sign Out
            </button>
          </div>

          {/* Total Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">{totalHectares}</div>
              <div className="text-sm text-white/80">Hectares Protected</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">~{totalCoralColonies.toLocaleString()}</div>
              <div className="text-sm text-white/80">Coral Colonies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">${totalSpent}</div>
              <div className="text-sm text-white/80">Total Investment</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">{memberSince}</div>
              <div className="text-sm text-white/80">Member Since</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorships Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-navy-deep">Your Sponsored Reefs</h2>
            <Link
              href="/sponsor"
              className="bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-2 px-6 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sponsor More →
            </Link>
          </div>

          {sponsorships.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🪸</div>
              <h3 className="text-xl font-bold text-navy-deep mb-2">
                No sponsorships yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start protecting climate-resilient coral reefs today
              </p>
              <Link
                href="/sponsor"
                className="inline-block bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200"
              >
                Choose Your Refuge →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsorships.map((sponsorship) => {
                const mpaData = getMPABySlug(sponsorship.mpa_id);
                return (
                  <div
                    key={sponsorship.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* MPA Image */}
                    <div className="relative h-48">
                      <Image
                        src={mpaData?.properties.imageUrl || 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80'}
                        alt={sponsorship.mpa_name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">
                          {sponsorship.mpa_name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Hectares:</span>
                          <span className="font-semibold text-navy-deep">{sponsorship.hectares}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sponsored:</span>
                          <span className="font-semibold text-navy-deep">
                            {new Date(sponsorship.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-semibold text-navy-deep">${sponsorship.amount}</span>
                        </div>
                        {mpaData && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Coordinates:</span>
                            <span className="font-semibold text-navy-deep text-right">
                              {mpaData.properties.coordinates[1].toFixed(2)}°N,{' '}
                              {mpaData.properties.coordinates[0].toFixed(2)}°E
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        {sponsorship.certificate_status === 'sent' ? (
                          <button
                            className="w-full bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-2 px-4 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 text-sm"
                          >
                            Download Certificate
                          </button>
                        ) : (
                          <div className="text-sm text-gray-500 text-center py-2">
                            Certificate generating...
                          </div>
                        )}
                        <Link
                          href={`/mpa/${sponsorship.mpa_id}`}
                          className="block w-full bg-gray-100 hover:bg-gray-200 text-navy-deep font-semibold py-2 px-4 rounded-lg transition-colors text-sm text-center"
                        >
                          View Impact Updates
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-deep mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/sponsor"
              className="bg-gradient-to-br from-teal/10 to-ocean-blue/10 rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-teal"
            >
              <div className="text-3xl mb-3">🪸</div>
              <h3 className="font-bold text-navy-deep mb-2">Sponsor More Reefs</h3>
              <p className="text-sm text-gray-600">
                Expand your impact by protecting additional hectares
              </p>
            </Link>

            <button
              className="bg-gradient-to-br from-teal/10 to-ocean-blue/10 rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-teal text-left"
            >
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-bold text-navy-deep mb-2">Share Portfolio</h3>
              <p className="text-sm text-gray-600">
                Generate a public link to showcase your impact
              </p>
            </button>

            <Link
              href="/impact"
              className="bg-gradient-to-br from-teal/10 to-ocean-blue/10 rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-teal"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-navy-deep mb-2">View Impact Reports</h3>
              <p className="text-sm text-gray-600">
                See quarterly updates from field partners
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
