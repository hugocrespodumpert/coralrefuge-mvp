import Image from 'next/image';
import Button from '@/components/Button';
import WaveDivider from '@/components/WaveDivider';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-deep via-ocean-blue to-turquoise pt-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Become a Guardian of <span className="text-turquoise-light">Coral Refuges</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Protect the coral reefs that can survive climate change. Sponsor marine protected areas and help secure the ocean&apos;s future.
          </p>
          <Button href="/sponsor" size="lg" className="animate-slide-up">
            Protect Coral Reefs Now
          </Button>
        </div>

        <WaveDivider className="absolute bottom-0" color="#ffffff" />
      </section>

      {/* Why This Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep mb-6">
            The Ocean&apos;s Last Hope
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Climate change threatens 90% of coral reefs. But certain reefs, called <strong>refugia</strong>, have unique conditions that help them survive warming seas. By protecting these refuges, we safeguard biodiversity and give coral reefs a fighting chance.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-deep text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-3xl mb-6">
                🗺️
              </div>
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">Choose Your Refuge</h3>
              <p className="text-gray-600">
                Select from partner marine protected areas with climate-resilient coral reefs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-3xl mb-6">
                💙
              </div>
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">Adopt Hectares</h3>
              <p className="text-gray-600">
                $50 per hectare funds patrols, monitoring, and protection for your chosen refuge.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-3xl mb-6">
                📊
              </div>
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">Track Your Impact</h3>
              <p className="text-gray-600">
                Receive a certificate and become part of the guardian community.
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
                <p className="text-coral font-semibold mb-4">150 hectares available</p>
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
                  alt="Red Sea Coral Triangle"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-ocean-deep">
                  🌊 Red Sea
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-ocean-deep mb-2">
                  Red Sea Coral Triangle
                </h3>
                <p className="text-coral font-semibold mb-4">Home to 1,000+ species</p>
                <p className="text-gray-600 mb-4">
                  A biodiversity hotspot where corals thrive in warmer waters.
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
                  alt="Climate-resilient reef refuge"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-ocean-deep">
                  🌡️ Resilient
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-ocean-deep mb-2">
                  Pacific Coral Refuge
                </h3>
                <p className="text-coral font-semibold mb-4">Can withstand 2°C warming</p>
                <p className="text-gray-600 mb-4">
                  Protected deep-water corals adapted to survive climate change.
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
                5
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
