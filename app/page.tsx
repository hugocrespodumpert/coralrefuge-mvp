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
    let timeoutId: NodeJS.Timeout;

    // Timer trigger (30 seconds)
    timeoutId = setTimeout(() => {
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
      {/* Hero Section - Premium Full-Screen Immersive */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed background with parallax effect */}
        <div className="absolute inset-0 parallax">
          <Image
            src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1920&q=80"
            alt="Pristine coral reef sanctuary"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/60"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Premium serif headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-tight premium-text animate-fade-in" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Some reefs can survive
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-3 max-w-4xl mx-auto font-light animate-fade-in">
            Science identified them.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto font-medium animate-fade-in">
            We&apos;re protecting them.
          </p>

          {/* Premium CTA */}
          <button
            onClick={handleOpenWaitlist}
            className="bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-4 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl animate-slide-in-bottom text-lg"
          >
            Join Waitlist →
          </button>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="text-white/60 text-sm mb-2">Scroll</div>
            <svg className="w-6 h-6 text-white/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
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
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 premium-text">
              Climate refugia
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
            Become a guardian of coral refugia in three simple steps
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

                  <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-4 text-center">Choose your refuge</h3>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    Browse verified climate-resilient MPAs in Egypt&apos;s Red Sea
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Science-backed site selection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Detailed reef profiles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Interactive map exploration</span>
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

                  <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-4 text-center">Fund protection</h3>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    $50/hectare supports monitoring, patrols, and conservation
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Direct to partner MPAs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Transparent fund allocation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Secure payment processing</span>
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

                  <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-4 text-center">Track your impact</h3>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    Receive updates and join the guardian community
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Digital guardian certificate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Quarterly impact reports</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      <span>Public registry listing</span>
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

      {/* Featured Refuges - Premium Card Design */}
      <section className="py-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy-deep text-center mb-6 premium-text">
            Featured Coral Refuges
          </h2>
          <p className="text-center text-xl text-gray-600 mb-20 max-w-3xl mx-auto">
            Science-backed climate refugia in Egypt&apos;s Red Sea, ready for your protection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Refuge 1 - Ras Mohammed */}
            <div className="group card-hover-lift bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80"
                  alt="Ras Mohammed National Park coral reef"
                  fill
                  className="object-cover transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-navy-deep">
                  🇪🇬 Egypt
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl font-bold text-white mb-3">
                    Ras Mohammed National Park
                  </h3>
                  <p className="text-coral text-base font-semibold mb-3">
                    220+ coral • 1,000+ fish
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Established 1983. Cold water influx from deep channels. Exceptional thermal resilience.
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/80 mb-2">
                      <span>Available to sponsor</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-teal w-[65%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-white/70 mt-1">2,200 Ha available</p>
                  </div>

                  <button
                    onClick={handleOpenWaitlist}
                    className="w-full bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 group-hover:scale-105"
                  >
                    Join Waitlist →
                  </button>
                </div>

                <p className="absolute bottom-2 right-4 text-xs text-white/50 italic">
                  Photo: NEOM
                </p>
              </div>
            </div>

            {/* Refuge 2 - Giftun Islands */}
            <div className="group card-hover-lift bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80"
                  alt="Giftun Islands Protected Area"
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-navy-deep">
                  🇪🇬 Egypt
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl font-bold text-white mb-3">
                    Giftun Islands
                  </h3>
                  <p className="text-coral text-base font-semibold mb-3">
                    196 coral • 850+ fish
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Diverse reef structures and strong currents create high climate resilience.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/80 mb-2">
                      <span>Available to sponsor</span>
                      <span>80%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-teal w-[80%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-white/70 mt-1">6,400 Ha available</p>
                  </div>

                  <button
                    onClick={handleOpenWaitlist}
                    className="w-full bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 group-hover:scale-105"
                  >
                    Join Waitlist →
                  </button>
                </div>

                <p className="absolute bottom-2 right-4 text-xs text-white/50 italic">
                  Photo: Francesco Ungaro
                </p>
              </div>
            </div>

            {/* Refuge 3 - Wadi El Gemal */}
            <div className="group card-hover-lift bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
                  alt="Wadi El Gemal National Park"
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-navy-deep">
                  🇪🇬 Egypt
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl font-bold text-white mb-3">
                    Wadi El Gemal
                  </h3>
                  <p className="text-coral text-base font-semibold mb-3">
                    150+ coral • 450+ fish
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Pristine waters with minimal warming impact. Highest climate resilience.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/80 mb-2">
                      <span>Available to sponsor</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-teal w-[92%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-white/70 mt-1">7,200 Ha available</p>
                  </div>

                  <button
                    onClick={handleOpenWaitlist}
                    className="w-full bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 group-hover:scale-105"
                  >
                    Join Waitlist →
                  </button>
                </div>

                <p className="absolute bottom-2 right-4 text-xs text-white/50 italic">
                  Photo: Q.U.I
                </p>
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

      {/* Impact Dashboard - Premium Stats */}
      <section className="relative py-30 bg-gradient-to-br from-navy-deep via-ocean-blue to-navy-deep text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 premium-text">
            Global Impact
          </h2>
          <p className="text-center text-xl text-white/80 mb-20 max-w-2xl mx-auto">
            Join the growing community protecting the world&apos;s most resilient coral reefs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-teal mb-4 font-serif">
                0
              </div>
              <div className="text-xl md:text-2xl text-white/90 font-medium mb-2">Hectares Protected</div>
              <p className="text-sm text-white/60">Launching soon in Egypt&apos;s Red Sea</p>
            </div>

            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-teal mb-4 font-serif">
                0
              </div>
              <div className="text-xl md:text-2xl text-white/90 font-medium mb-2">Active Guardians</div>
              <p className="text-sm text-white/60">Be the first to protect refugia</p>
            </div>

            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-teal mb-4 font-serif">
                3
              </div>
              <div className="text-xl md:text-2xl text-white/90 font-medium mb-2">Partner MPAs</div>
              <p className="text-sm text-white/60">Verified climate-resilient sites</p>
            </div>
          </div>

          <div className="mt-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <blockquote className="text-center">
              <p className="font-serif text-2xl md:text-3xl text-white/95 mb-6 italic leading-relaxed">
                &ldquo;These reefs are our best bet for coral survival in a warming world.&rdquo;
              </p>
              <footer className="text-white/70">
                <cite className="not-italic">— Dr. Enric Sala, National Geographic Explorer-in-Residence</cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <WaveDivider className="absolute bottom-0" color="#ffffff" />
      </section>

      {/* Final CTA - Premium */}
      <section className="py-30 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy-deep mb-6 premium-text">
            Become a Guardian
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Every hectare you protect is a sanctuary for biodiversity, a beacon of hope for coral reefs worldwide.
          </p>
          <p className="font-serif text-2xl md:text-3xl text-navy-deep mb-12 italic">
            One hectare at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleOpenWaitlist}
              className="min-w-[240px] bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-4 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Join Waitlist →
            </button>
            <Button href="/map" variant="outline" size="lg" className="min-w-[240px]">
              Explore the Map
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Join the movement to protect climate-resilient coral reefs
          </p>
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
