import Image from 'next/image';
import Button from '@/components/Button';

export default function WadiElGemalPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Image */}
      <section className="relative h-[60vh] bg-ocean-deep">
        <Image
          src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1920&q=80"
          alt="Wadi El Gemal National Park coral reef"
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
              Wadi El Gemal National Park
            </h1>
            <p className="text-2xl text-white/90">
              Marsa Alam, Red Sea, Egypt • 24.70°N, 35.10°E
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Grid */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">50,000</div>
              <div className="text-gray-600">Total Hectares (marine)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">2005</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">150+</div>
              <div className="text-gray-600">Coral Species</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise mb-2">450+</div>
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
              Wadi El Gemal National Park, established in 2005, is one of the most <strong>pristine marine parks in the Red Sea</strong>
              with exceptionally high climate resilience due to minimal warming impact.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              This protected area hosts 450+ fish species and 150+ coral species, along with rare megafauna including dugongs and dolphins.
              Its remote location and limited human impact have preserved the reef&apos;s natural resilience mechanisms.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Scientists have identified Wadi El Gemal as having <strong>very high climate resilience</strong> - one of the highest
              in the Red Sea - making it a critical refuge for coral biodiversity in a warming ocean.
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
                  <strong>Established:</strong> 2005 as Egypt&apos;s second-largest protected area
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
                  <strong>Partner Organization:</strong> Egyptian Environmental Affairs Agency
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 mr-4"></div>
                <p className="text-xl text-gray-700">
                  <strong>Climate Resilience:</strong> Very High - pristine condition with minimal thermal stress
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 mr-4"></div>
                <p className="text-xl text-gray-700">
                  <strong>Special Features:</strong> Home to endangered dugongs and multiple dolphin species
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
                <p className="text-2xl font-bold text-gray-600 mb-2">24.70°N, 35.10°E</p>
                <p className="text-gray-500">Interactive map coming soon</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-ocean-deep to-ocean-blue rounded-2xl p-12 text-center text-white shadow-2xl">
            <div className="inline-block bg-turquoise text-white px-6 py-3 rounded-full text-lg font-bold mb-6">
              1,500 hectares available • $150/hectare
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sponsor This Refuge
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Protect Wadi El Gemal&apos;s pristine coral reefs and help preserve this biodiversity haven for future generations.
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
