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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Some coral reefs can survive.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Science identified them. We&apos;re protecting them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button href="/sponsor" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-lg font-bold shadow-xl">
              Protect Coral Reefs
            </Button>
            <Button href="/map" size="lg" className="bg-blue-600/50 backdrop-blur text-white border border-white/30 hover:bg-blue-600/70 text-lg px-8 py-4 rounded-lg font-bold">
              Explore Map
            </Button>
          </div>
        </div>

        <WaveDivider className="absolute bottom-0" color="#ffffff" />
      </section>

      {/* The Crisis */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            We are losing them
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-red-400 mb-2">50%</div>
              <p className="text-xl text-gray-300">
                of coral reefs have vanished since 1950
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-red-400 mb-2">90%</div>
              <p className="text-xl text-gray-300">
                of what remains could die by 2050
              </p>
            </div>
          </div>

          <p className="text-2xl text-center text-blue-200">
            But some reefs are different.
          </p>
        </div>
      </section>

      {/* The Solution - Nature's Survivors */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-ocean-deep">
            Nature&apos;s survivors
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Our ocean&apos;s last hope.
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Climate refugia are places where <strong>millions of years of evolution</strong> created natural advantages. Deep channels pump cool water to the surface. Strong currents regulate temperature. Coral genetics evolved for resilience.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 my-8">
              <ul className="space-y-3 text-lg list-none">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">They recover <strong>40% faster</strong> than unprotected reefs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">They harbor genetic diversity crucial for adaptation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">They are the seed banks for tomorrow&apos;s oceans</span>
                </li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              But only if we defend them from overfishing, pollution, and coastal development <strong>today.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-ocean-deep">
            Three steps. Real impact.
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Launching June 2026
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-2xl font-bold mb-3 text-ocean-deep">Pick your reef</h3>
              <p className="text-gray-600">
                Explore our map of verified coral refuges
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-ocean-deep">Fund protection</h3>
              <p className="text-gray-600">
                <strong>80%</strong> goes directly to verified conservation partners
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-ocean-deep">Watch it thrive</h3>
              <p className="text-gray-600">
                Track impact from your sponsored site
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button href="/sponsor" size="lg" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
              Sponsor a Reef
            </Button>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-ocean-deep">
            Built on science. Driven by transparency.
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-deep">Science-backed site selection</h3>
              <p className="text-gray-600">
                Every refuge meets criteria from the <strong>50 Reefs Initiative</strong> and is validated through <strong>Allen Coral Atlas</strong> satellite mapping.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-deep">Local partnerships</h3>
              <p className="text-gray-600">
                <strong>80% of funds</strong> go directly to established organizations with decades of proven conservation success. <strong>20% funds</strong> our platform and impact reporting.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-deep">Radical transparency</h3>
              <p className="text-gray-600">
                GPS coordinates of your sponsored site. Annual impact reports. No vague promises. Just real reef health metrics.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-deep">Proven results</h3>
              <p className="text-gray-600">
                Protected refugia recover <strong>40% faster</strong> from bleaching. MPAs increase fish biomass by <strong>446%</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Refuges */}
      <section className="py-20 bg-white">
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
              <div className="text-xl text-white/90">Active Sponsors</div>
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
