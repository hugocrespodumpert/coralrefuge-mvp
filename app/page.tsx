import Image from 'next/image';
import Button from '@/components/Button';
import WaveDivider from '@/components/WaveDivider';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Coral Vita Style */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-deep via-ocean-blue to-ocean-deep pt-20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1920&q=80"
            alt="Coral reef background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/60 to-ocean-deep/80"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            Protect the coral reefs<br />that can survive<br /><span className="text-turquoise">climate change</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto font-semibold">
            Sponsor marine protected areas in Egypt&apos;s Red Sea and become a guardian of coral refugia.
          </p>
          <Button href="/sponsor" size="lg" className="bg-coral text-white hover:bg-coral/90 text-xl px-12 py-6 rounded-full font-bold shadow-2xl">
            Protect a Reef
          </Button>
        </div>

        <WaveDivider className="absolute bottom-0" color="#ffffff" />
      </section>

      {/* The Crisis */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-ocean-deep mb-6">
              Half the world&apos;s corals are gone
            </h2>
            <p className="text-3xl md:text-4xl text-coral font-bold">
              90% could die by 2050
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80"
                alt="Healthy coral reef"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-xl font-bold">Healthy Reef</p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
                alt="Bleached coral"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-xl font-bold">Bleached Coral</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24 bg-gradient-to-br from-ocean-deep to-ocean-blue text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Climate refugia: Reefs that can survive
          </h2>
          <p className="text-2xl md:text-3xl leading-relaxed mb-12">
            These rare reefs have unique conditions that help them weather warming seas.
            By protecting them, we preserve biodiversity and give coral a fighting chance.
          </p>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <Image
              src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&q=80"
              alt="Map showing refugia locations"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-ocean-deep text-center mb-20">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-ocean-deep mb-4">Select Your Refuge</h3>
              <p className="text-xl text-gray-600">
                Choose from verified climate-resilient MPAs in Egypt&apos;s Red Sea
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-ocean-deep mb-4">Protect Hectares</h3>
              <p className="text-xl text-gray-600">
                $50 per hectare funds monitoring, patrols, and conservation
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-ocean-deep mb-4">Track Impact</h3>
              <p className="text-xl text-gray-600">
                Get your certificate and join the guardian community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Refuges */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep text-center mb-16">
            Featured Coral Refuges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Refuge 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300">
              <div className="relative h-64 bg-gradient-to-br from-ocean-blue to-turquoise">
                <Image
                  src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80"
                  alt="Ras Mohammed National Park coral reef"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-ocean-deep">
                  🇪🇬 Egypt
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-ocean-deep mb-2">
                  Ras Mohammed National Park
                </h3>
                <p className="text-coral font-semibold mb-4">220+ coral species • 1,000+ fish species</p>
                <p className="text-gray-600 mb-4">
                  One of the Red Sea&apos;s most pristine coral refuges with exceptional biodiversity.
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                  Photo: NEOM / The Ocean Agency
                </p>
                <Button href="/sponsor" variant="secondary" className="w-full">
                  Explore Refuge
                </Button>
              </div>
            </div>

            {/* Refuge 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300">
              <div className="relative h-64 bg-gradient-to-br from-ocean-blue to-turquoise">
                <Image
                  src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80"
                  alt="Giftun Islands Protected Area"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-ocean-deep">
                  🇪🇬 Egypt
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-ocean-deep mb-2">
                  Giftun Islands Protected Area
                </h3>
                <p className="text-coral font-semibold mb-4">196 coral species • 850+ fish species</p>
                <p className="text-gray-600 mb-4">
                  Diverse reef structures and strong currents create high climate resilience.
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                  Photo: Francesco Ungaro / The Ocean Agency
                </p>
                <Button href="/sponsor" variant="secondary" className="w-full">
                  Explore Refuge
                </Button>
              </div>
            </div>

            {/* Refuge 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300">
              <div className="relative h-64 bg-gradient-to-br from-ocean-blue to-turquoise">
                <Image
                  src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
                  alt="Wadi El Gemal National Park"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-ocean-deep">
                  🇪🇬 Egypt
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-ocean-deep mb-2">
                  Wadi El Gemal National Park
                </h3>
                <p className="text-coral font-semibold mb-4">150+ coral species • 450+ fish species</p>
                <p className="text-gray-600 mb-4">
                  Pristine waters with minimal warming impact and highest climate resilience.
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                  Photo: Q.U.I / The Ocean Agency
                </p>
                <Button href="/sponsor" variant="secondary" className="w-full">
                  Explore Refuge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="relative py-20 bg-gradient-to-br from-ocean-deep to-ocean-blue text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-turquoise-light mb-4">
                0
              </div>
              <div className="text-xl text-white/90">Hectares Protected</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-turquoise-light mb-4">
                0
              </div>
              <div className="text-xl text-white/90">Active Guardians</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-turquoise-light mb-4">
                3
              </div>
              <div className="text-xl text-white/90">Partner MPAs</div>
            </div>
          </div>
        </div>

        <WaveDivider className="absolute bottom-0" color="#ffffff" />
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-6">
            Join the Movement
          </h2>
          <p className="text-2xl text-gray-600 mb-8 italic">
            One hectare at a time.
          </p>
          <Button href="/sponsor" size="lg">
            Protect Coral Reefs Now
          </Button>
        </div>
      </section>
    </main>
  );
}
