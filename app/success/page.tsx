'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch the session details here
      // For now, we'll show a success message
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your sponsorship...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-turquoise to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-4">
            🎉 Thank You, Sponsor!
          </h1>
          <p className="text-xl text-gray-600">
            Your payment was successful. You&apos;re now officially protecting coral reefs!
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-ocean-deep mb-6">What Happens Next</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ocean-deep mb-1">Confirmation Email</h3>
                <p className="text-gray-600">
                  You&apos;ll receive a confirmation email with your sponsorship details within the next few minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📜</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ocean-deep mb-1">Certificate Generation</h3>
                <p className="text-gray-600">
                  Your official Sponsor Certificate will be generated and emailed to you within 24 hours.
                  It will include your unique certificate ID and a QR code linking to your registry entry.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ocean-deep mb-1">Public Registry</h3>
                <p className="text-gray-600">
                  Your sponsorship will be added to our public registry, celebrating your contribution to ocean conservation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ocean-deep mb-1">Quarterly Updates</h3>
                <p className="text-gray-600">
                  You&apos;ll receive quarterly impact reports showing how your funds are protecting coral reefs,
                  including patrol activities, monitoring results, and conservation milestones.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ocean-deep mb-1">Immediate Impact</h3>
                <p className="text-gray-600">
                  Your funds are already being deployed! They support MPA patrols, scientific monitoring,
                  and protection infrastructure at your sponsored refuge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Impact */}
        <div className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
          <p className="text-white/90 mb-6">
            By protecting climate-resilient coral refuges, you&apos;re safeguarding biodiversity hotspots
            that will help restore degraded reef systems worldwide. You&apos;re not just protecting coral—you&apos;re
            giving the ocean a fighting chance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-turquoise-light mb-1">1,000+</div>
              <div className="text-sm text-white/80">Coral Colonies Protected</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-turquoise-light mb-1">24/7</div>
              <div className="text-sm text-white/80">MPA Patrol Coverage</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-turquoise-light mb-1">100+</div>
              <div className="text-sm text-white/80">Species Protected</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/registry" variant="secondary" size="lg">
            View Public Registry
          </Button>
          <Button href="/sponsor" size="lg">
            Protect More Reefs
          </Button>
        </div>

        {/* Share Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Share your impact with the world:</p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                "I just became a Reef Sponsor! Protecting climate-resilient coral reefs one hectare at a time. Join me at wildreefs.com"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-100 hover:bg-ocean-blue hover:text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                process.env.NEXT_PUBLIC_BASE_URL || 'https://wildreefs.com'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-100 hover:bg-ocean-blue hover:text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center">
          <p className="text-2xl font-light text-gray-600 italic">
            Built with science. Driven by purpose.
          </p>
          <p className="text-gray-500 mt-2">
            Thank you for being a sponsor of the ocean&apos;s last hope. 🌊🪸
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
