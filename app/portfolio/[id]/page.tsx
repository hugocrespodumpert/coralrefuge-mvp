'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getMPABySlug } from '@/lib/mpa-data';
import Image from 'next/image';
import Link from 'next/link';

interface Sponsorship {
  id: string;
  mpa_id: string;
  mpa_name: string;
  hectares: number;
  amount: number;
  created_at: string;
}

interface PublicProfile {
  name: string;
  bio?: string;
  created_at: string;
  sponsorships: Sponsorship[];
}

export default function PublicPortfolioPage() {
  const params = useParams();
  const portfolioId = params.id as string;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadPublicProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioId]);

  const loadPublicProfile = async () => {
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll use mock data
      // TODO: Create API endpoint /api/portfolio/[id]

      setProfile({
        name: 'John Doe',
        bio: 'Ocean conservationist and coral reef advocate',
        created_at: '2024-01-01',
        sponsorships: [
          {
            id: '1',
            mpa_id: 'ras-mohammed',
            mpa_name: 'Ras Mohammed National Park',
            hectares: 5,
            amount: 750,
            created_at: '2024-01-15',
          },
          {
            id: '2',
            mpa_id: 'giftun-islands',
            mpa_name: 'Giftun Islands Marine Protected Area',
            hectares: 3,
            amount: 450,
            created_at: '2024-02-20',
          },
        ],
      });
    } catch {
      // Failed to load - will show loading state
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out my coral reef protection portfolio! I've protected ${totalHectares} hectares across ${uniqueMPAs} MPAs.`;

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-navy-deep mb-2">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            This portfolio doesn&apos;t exist or has been made private.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    );
  }

  const totalHectares = profile.sponsorships.reduce((sum, s) => sum + s.hectares, 0);
  const totalCoralColonies = Math.round(totalHectares * 220);
  const uniqueMPAs = new Set(profile.sponsorships.map(s => s.mpa_id)).size;
  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
              <span className="text-5xl">🪸</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {profile.name}&apos;s Wild Reefs Portfolio
            </h1>
            {profile.bio && (
              <p className="text-white/90 max-w-2xl mx-auto">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">{totalHectares}</div>
              <div className="text-sm text-white/80">Hectares Protected</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">~{totalCoralColonies.toLocaleString()}</div>
              <div className="text-sm text-white/80">Coral Colonies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">{uniqueMPAs}</div>
              <div className="text-sm text-white/80">MPAs Supported</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1">{memberSince}</div>
              <div className="text-sm text-white/80">Sponsor Since</div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyLink}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
              Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </section>

      {/* Sponsorships */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-deep mb-6 text-center">
            Protected Reefs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.sponsorships.map((sponsorship) => {
              const mpaData = getMPABySlug(sponsorship.mpa_id);
              return (
                <div
                  key={sponsorship.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
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

                  <div className="p-6">
                    <div className="space-y-2">
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
                      {mpaData && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-semibold text-navy-deep text-right">
                            {mpaData.properties.location.split(',')[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/mpa/${sponsorship.mpa_id}`}
                      className="mt-4 block w-full bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-2 px-4 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 text-sm text-center"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-teal/10 to-ocean-blue/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-deep mb-4">
            Join {profile.name} in Protecting Coral Refugia
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Start your own impact portfolio and help protect climate-resilient coral reefs
          </p>
          <Link
            href="/sponsor"
            className="inline-block bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-4 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Protect Reefs Now →
          </Link>
        </div>
      </section>
    </main>
  );
}
