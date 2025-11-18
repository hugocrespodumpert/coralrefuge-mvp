import Image from 'next/image';
import Button from '@/components/Button';

export default function RefugiaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            The reefs evolution designed to survive
          </h1>
          <p className="text-xl text-blue-100">
            Imagine a coral reef that doesn&apos;t bleach white when the ocean warms.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed mb-8">
            It sounds impossible. But these reefs exist. Scientists call them <strong>climate refugia</strong>—ecosystems with natural characteristics that buffer them from thermal stress.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-ocean-deep">What makes a refugia?</h2>

          <div className="space-y-4 mb-12">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">❄️</span>
              <div>
                <strong>Cold water upwelling</strong> from deep ocean channels keeps surface temperatures stable
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🌊</span>
              <div>
                <strong>Strong currents</strong> bring nutrients and regulate heat
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🧬</span>
              <div>
                <strong>Genetic diversity</strong> from millennia of adaptation to variable conditions
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🏝️</span>
              <div>
                <strong>Geographic protection</strong> from major coastal development pressures
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-ocean-deep">Why they matter</h2>

          <p className="text-lg leading-relaxed mb-6">
            When a marine heatwave strikes, most reefs bleach and die. Refugia bleach less, or recover faster. The corals here carry <strong>genetic blueprints for heat tolerance.</strong> If we lose these reefs, we lose nature&apos;s solution to warming oceans.
          </p>

          <div className="bg-blue-50 rounded-xl p-6 my-8">
            <p className="text-xl font-bold text-blue-900 mb-2">
              Protected refugia recover 40% faster than unprotected areas.
            </p>
            <p className="text-sm text-gray-600">
              Source: NOAA Coral Reef Conservation Program
            </p>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            The 50 Reefs Initiative identified these sanctuaries globally and Allen Coral Atlas maps them with satellite precision.
          </p>

          <p className="text-xl font-bold text-center mt-12 mb-8">
            We know where they are. Now we must fund their protection.
          </p>

          <div className="text-center">
            <Button href="/sponsor" size="lg" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
              Sponsor a Refuge
            </Button>
          </div>
        </div>
      </div>

      {/* Visual Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-ocean-deep">
            How refugia survive
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80"
                alt="Healthy coral refuge"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-lg">Climate Refugium</p>
                <p className="text-white/90 text-sm">Natural protection from thermal stress</p>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
                alt="Bleached coral"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-lg">Unprotected Reef</p>
                <p className="text-white/90 text-sm">Vulnerable to warming and bleaching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-ocean-deep">
            The science behind refugia
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl mb-2">50 Reefs Initiative</h3>
              <p className="text-gray-600">
                Global scientists identified priority reefs with the highest probability of surviving climate change and repopulating other reefs. Coral Refuge focuses protection on these critical sanctuaries.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl mb-2">Allen Coral Atlas</h3>
              <p className="text-gray-600">
                Satellite mapping technology provides unprecedented detail on coral reef extent, composition, and health. We use this data to validate refuge boundaries and monitor impact.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl mb-2">Climate resilience research</h3>
              <p className="text-gray-600">
                Studies show protected refugia withstand marine heatwaves better, maintain genetic diversity, and serve as source populations for damaged reefs. Protection today ensures ocean recovery tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Protect what evolution built to survive
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sponsor hectares in verified climate refugia and fund real protection.
          </p>
          <Button href="/map" size="lg" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition">
            Explore Refuges on Map
          </Button>
        </div>
      </section>
    </main>
  );
}
