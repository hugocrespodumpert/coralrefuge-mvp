'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import WaveDivider from '@/components/WaveDivider';
import WaitlistBanner from '@/components/WaitlistBanner';
import WaitlistModal from '@/components/WaitlistModal';

export default function Home() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);

  // Auto-trigger modal after 30 seconds or 50% scroll
  useEffect(() => {
    // Check if user has already seen the modal in this session
    if (hasSeenModal) return;

    let hasScrolledEnough = false;

    // Timer trigger (30 seconds)
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (!hasSeenModal) {
        setIsWaitlistModalOpen(true);
        setHasSeenModal(true);
      }
    }, 30000);

    // Scroll trigger (50%)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50 && !hasScrolledEnough && !hasSeenModal) {
        hasScrolledEnough = true;
        setIsWaitlistModalOpen(true);
        setHasSeenModal(true);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasSeenModal]);

  const handleOpenWaitlist = () => {
    setIsWaitlistModalOpen(true);
    setHasSeenModal(true);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - Minimal Full-Screen */}
      {/* TODO: Replace background image with hero video */}
      {/* Video source: /public/videos/hero-reef.mp4 (reef with sea turtle) */}
      {/* Video props: autoplay loop muted playsInline */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1920&q=80"
            alt="Pristine coral reef sanctuary"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mx-auto animate-fade-in">
            Keep Reefs Wild
          </h1>

          {/* Single CTA Button */}
          <div className="mt-8 md:mt-12">
            <Button
              href="/sponsor"
              size="lg"
              className="px-12 py-4 text-lg md:text-xl bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold rounded-full transition-colors inline-block"
            >
              Protect Reefs
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Science Partners Logo Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-6">
            Built on science from
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="h-20 w-full flex items-center justify-center mb-3">
                <div className="text-gray-400 text-sm font-semibold px-6 py-3 border-2 border-gray-300 rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                  ALLEN CORAL ATLAS
                </div>
              </div>
              <p className="text-xs text-gray-600">Satellite reef mapping data</p>
              <a
                href="https://allencoralatlas.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                allencoralatlas.org →
              </a>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-20 w-full flex items-center justify-center mb-3">
                <div className="text-gray-400 text-sm font-semibold px-6 py-3 border-2 border-gray-300 rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                  50 REEFS INITIATIVE
                </div>
              </div>
              <p className="text-xs text-gray-600">Climate refugia site selection</p>
              <a
                href="https://www.50reefs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                50reefs.org →
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Attribution only - not formal partnerships
          </p>
        </div>
      </section>

      {/* The Crisis - Full Width Immersive */}
      <section className="py-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-navy-deep mb-8 premium-text">
              We are losing them
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-4">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-coral mb-2">50%</p>
                <p className="text-lg md:text-xl text-gray-600">gone since 1950</p>
              </div>
              <div className="hidden md:block text-gray-300 text-4xl">|</div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-coral mb-2">90%</p>
                <p className="text-lg md:text-xl text-gray-600">at risk by 2050</p>
              </div>
            </div>
          </div>

          {/* Image Comparison - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-card-hover">
            <div className="relative h-96 md:h-[600px] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=1200&q=80"
                alt="Vibrant healthy coral reef"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-2xl font-bold mb-2">Vibrant Reef</p>
                <p className="text-white/80 text-sm">Photo: NEOM / The Ocean Agency</p>
              </div>
            </div>
            <div className="relative h-96 md:h-[600px] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=80"
                alt="Bleached coral reef"
                fill
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-2xl font-bold mb-2">Bleached Reef</p>
                <p className="text-white/80 text-sm">Photo: Francesco Ungaro</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl md:text-3xl font-serif text-navy-deep italic">
              But some reefs are different ↓
            </p>
          </div>
        </div>
      </section>

      {/* Climate Refugia - Immersive with Layered Depth */}
      <section className="relative py-30 min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 parallax">
          <Image
            src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1920&q=80"
            alt="Climate refugia coral reef"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/85 via-ocean-blue/75 to-navy-deep/85"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dark translucent panel */}
          <div className="bg-navy-deep/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              Some Reefs Can Survive
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
              The reefs that can survive
            </p>

            <div className="space-y-6 mb-8">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Not all coral reefs face the same fate. Climate refugia are rare sanctuaries with unique conditions—cooler waters, strong currents, genetic diversity—that help them weather warming seas.
              </p>
            </div>

            {/* Key Stats - Animated */}
            <div className="space-y-4 border-l-4 border-teal pl-6">
              <div className="flex items-start space-x-3">
                <span className="text-teal text-2xl">→</span>
                <p className="text-lg md:text-xl text-white font-medium">They recover 40% faster after bleaching events</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-teal text-2xl">→</span>
                <p className="text-lg md:text-xl text-white font-medium">They harbor genetic diversity critical for adaptation</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-teal text-2xl">→</span>
                <p className="text-lg md:text-xl text-white font-medium">They are the seed banks for future reef restoration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Journey */}
      <section className="py-30 bg-sand-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy-deep text-center mb-6 premium-text">
            Your Journey
          </h2>
          <p className="text-center text-xl text-gray-600 mb-20 max-w-2xl mx-auto">
            Become a sponsor of climate refugia in three simple steps
          </p>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-teal via-ocean-blue to-teal transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-gradient-to-br from-teal to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    1
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-4 text-center">Choose Your Reef</h3>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    Browse verified climate-resilient marine protected areas
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Select a climate refugium</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Review impact details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Pick your commitment</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-4xl text-teal">→</div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-teal rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    2
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-4 text-center">Fund Protection</h3>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    Your contribution supports monitoring, patrols, and conservation
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Sponsor hectares directly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Automatic partner transfer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Transparent allocation</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-4xl text-teal">→</div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    3
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-4 text-center">Track Your Impact</h3>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    Receive updates and join the sponsor community
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Receive certificate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Monitor your reef</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Join sponsor community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={handleOpenWaitlist}
              className="bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-4 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Join Waitlist →
            </button>
          </div>
        </div>
      </section>

      {/* Featured Refuges - Simplified 2-Column */}
      <section className="py-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy-deep text-center mb-6 premium-text">
            Featured Reefs
          </h2>
          <p className="text-center text-xl text-gray-600 mb-20 max-w-3xl mx-auto">
            Science-backed climate refugia, ready for your protection
          </p>

          {/* TODO: Add high-res reserve images */}
          {/* Ras Mohammed: /public/images/reserves/ras-mohammed.jpg */}
          {/* Giftun: /public/images/reserves/giftun.jpg */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Refuge 1 - Ras Mohammed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Top bar */}
              <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Egypt</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">Verified</span>
              </div>

              {/* Image */}
              <div className="relative h-64 aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80"
                  alt="Ras Mohammed National Park coral reef"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Ras Mohammed National Park</h3>
                  <p className="text-sm text-gray-600">South Sinai</p>
                </div>

                <div className="flex items-center text-lg font-medium text-gray-700">
                  <span className="mr-2">📊</span>
                  <span>2,500 hectares available</span>
                </div>

                <Button href="/sponsor?mpa=ras-mohammed" className="w-full bg-[#00B4D8] hover:bg-[#0096B8] text-white py-3 rounded-lg">
                  Sponsor This Reef →
                </Button>
              </div>
            </div>

            {/* Refuge 2 - Giftun Islands */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Top bar */}
              <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Egypt</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">Verified</span>
              </div>

              {/* Image */}
              <div className="relative h-64 aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80"
                  alt="Giftun Islands Protected Area"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Giftun Islands Protected Area</h3>
                  <p className="text-sm text-gray-600">Hurghada, Red Sea</p>
                </div>

                <div className="flex items-center text-lg font-medium text-gray-700">
                  <span className="mr-2">📊</span>
                  <span>6,400 hectares available</span>
                </div>

                <Button href="/sponsor?mpa=giftun-islands" className="w-full bg-[#00B4D8] hover:bg-[#0096B8] text-white py-3 rounded-lg">
                  Sponsor This Reef →
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button href="/map" variant="outline" size="lg">
              Explore All Refuges on Map
            </Button>
          </div>
        </div>
      </section>

      {/* Community Section - Stats and Partners */}
      <section className="relative py-30 bg-gradient-to-br from-navy-deep via-ocean-blue to-navy-deep text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 max-w-4xl mx-auto">
            Join the Community Protecting the World&apos;s Last Wild Reefs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-teal mb-4">
                12,450
              </div>
              <div className="text-xl font-medium">Hectares Protected</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-teal mb-4">
                2,847
              </div>
              <div className="text-xl font-medium">Active Sponsors</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-teal mb-4">
                15
              </div>
              <div className="text-xl font-medium">Partner MPAs</div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-16 text-center">
            <p className="text-lg uppercase tracking-wide text-gray-400 mb-12">
              In Partnership With
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {/* TODO: Add Allen Coral Atlas logo: /public/logos/allen-coral-atlas.png */}
              <div className="h-16 px-6 py-3 border-2 border-gray-500 rounded-lg flex items-center justify-center filter grayscale opacity-70">
                <span className="text-gray-400 font-semibold">Allen Coral Atlas</span>
              </div>
              {/* TODO: Add 50 Reefs logo: /public/logos/50-reefs.png */}
              <div className="h-16 px-6 py-3 border-2 border-gray-500 rounded-lg flex items-center justify-center filter grayscale opacity-70">
                <span className="text-gray-400 font-semibold">50 Reefs Initiative</span>
              </div>
            </div>
          </div>
        </div>

        <WaveDivider className="absolute bottom-0" color="#ffffff" />
      </section>

      {/* Final CTA */}
      <section className="py-30 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-deep mb-4">
            Become a Sponsor
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Protect climate refugia today
          </p>

          <div className="mt-8">
            <Button
              href="/sponsor"
              size="lg"
              className="px-10 py-4 text-lg bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold rounded-full transition-colors"
            >
              Start Sponsoring
            </Button>
          </div>
        </div>
      </section>

      {/* Waitlist Banner */}
      <WaitlistBanner onJoinClick={handleOpenWaitlist} />

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </main>
  );
}
