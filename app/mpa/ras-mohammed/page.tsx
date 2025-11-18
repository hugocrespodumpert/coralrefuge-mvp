import Image from 'next/image';
import Button from '@/components/Button';

export default function RasMohammedPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Image */}
      <section className="relative h-[60vh] bg-ocean-deep">
        <Image
          src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1920&q=80"
          alt="Ras Mohammed National Park coral reef"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block bg-turquoise text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              ✓ Verified MPA
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Ras Mohammed National Park
            </h1>
            <p className="text-2xl text-white/90">
              South Sinai, Egypt • 27.73°N, 34.23°E
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Grid */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">48,000</div>
              <div className="text-gray-600">Total Hectares</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">1983</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">220+</div>
              <div className="text-gray-600">Coral Species</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">1,000+</div>
              <div className="text-gray-600">Fish Species</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why This is a Refugia */}
          <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
            <h2 className="text-4xl font-bold text-ocean-deep mb-6">
              Why This is a Climate Refugia
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Ras Mohammed National Park is one of the Red Sea&apos;s most pristine coral refuges with exceptional biodiversity.
              The park benefits from <strong>cooler water influx from deep channels</strong>, which provides natural protection
              against rising ocean temperatures.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              This unique hydrographic feature creates a microclimate that allows corals to thrive even as surrounding waters warm.
              With over 220 species of coral and 1,000 species of fish, Ras Mohammed represents a critical genetic reservoir for
              coral reef biodiversity.
            </p>
          </div>

          {/* Current Protection Status */}
          <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
            <h2 className="text-4xl font-bold text-ocean-deep mb-6">
              Current Protection Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 mr-4"></div>
                <p className="text-xl text-gray-700">
                  <strong>Established:</strong> 1983 as Egypt&apos;s first national park
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 mr-4"></div>
                <p className="text-xl text-gray-700">
                  <strong>Management:</strong> Egyptian Environmental Affairs Agency (EEAA)
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 mr-4"></div>
                <p className="text-xl text-gray-700">
                  <strong>Partner Organization:</strong> HEPCA (Hurghada Environmental Protection and Conservation Association)
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 mr-4"></div>
                <p className="text-xl text-gray-700">
                  <strong>Climate Resilience:</strong> High - due to deep channel water circulation
                </p>
              </div>
            </div>
          </div>

          {/* How Funds Are Used */}
          <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
            <h2 className="text-4xl font-bold text-ocean-deep mb-6">
              How Your Funds Are Used
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-700">Marine Patrols & Enforcement</span>
                  <span className="font-bold text-turquoise">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-turquoise h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-700">Coral Monitoring & Research</span>
                  <span className="font-bold text-turquoise">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-turquoise h-3 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-700">Community Education</span>
                  <span className="font-bold text-turquoise">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-turquoise h-3 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-700">Administrative & Operations</span>
                  <span className="font-bold text-turquoise">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-turquoise h-3 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl p-10 shadow-lg mb-12">
            <h2 className="text-4xl font-bold text-ocean-deep mb-6">
              Location
            </h2>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600 mb-2">27.73°N, 34.23°E</p>
                <p className="text-gray-500">Interactive map coming soon</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-ocean-deep to-ocean-blue rounded-2xl p-12 text-center text-white shadow-2xl">
            <div className="inline-block bg-turquoise text-white px-6 py-3 rounded-full text-lg font-bold mb-6">
              1,200 hectares available • $150/hectare
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sponsor This Refuge
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Protect Ras Mohammed&apos;s climate-resilient coral reefs and become a sponsor of this precious marine ecosystem.
            </p>
            <Button href="/sponsor" size="lg" className="bg-coral text-white hover:bg-coral/90 text-xl px-12 py-6 rounded-full font-bold shadow-2xl">
              Protect This Reef
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
