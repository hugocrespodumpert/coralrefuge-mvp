import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Protect Coral Refugia in Egypt's Red Sea
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Sponsor marine protected areas and receive a verified certificate with GPS
              coordinates. Your direct contribution funds patrol operations protecting
              the last surviving coral reefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sponsor"
                className="bg-white text-cyan-700 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg"
              >
                Start Protecting Now
              </Link>
              <Link
                href="/dashboard"
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all text-lg"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">$100</div>
              <div className="text-gray-600">Per hectare/year</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">220+</div>
              <div className="text-gray-600">Corals per hectare</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-gray-600">Patrol monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">100%</div>
              <div className="text-gray-600">Transparent impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-900 mb-12">
            How It Works
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Choose Your Area
              </h3>
              <p className="text-gray-600">
                Select a marine protected area in Egypt's Red Sea and decide how many
                hectares to sponsor.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Complete your sponsorship through Stripe. Funds go directly to patrol
                operations and enforcement.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Receive Certificate
              </h3>
              <p className="text-gray-600">
                Get your certificate instantly via email with GPS coordinates and
                quarterly impact reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-900 mb-12">
            Your Conservation Impact
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start bg-cyan-50 rounded-xl p-6">
              <span className="text-4xl mr-4">🪸</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Direct Coral Protection
                </h3>
                <p className="text-gray-700">
                  Every hectare protects approximately 220 coral colonies. Your
                  sponsorship provides immediate funding for patrol boats and
                  enforcement operations.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-cyan-50 rounded-xl p-6">
              <span className="text-4xl mr-4">🐟</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Biodiversity Hotspot
                </h3>
                <p className="text-gray-700">
                  Coral refugia support over 1,000 fish species and countless
                  invertebrates. Protecting these areas preserves entire marine
                  ecosystems.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-cyan-50 rounded-xl p-6">
              <span className="text-4xl mr-4">🌡️</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Climate Resilience
                </h3>
                <p className="text-gray-700">
                  Red Sea coral refugia are heat-resistant and critical for reef
                  recovery worldwide. Your sponsorship supports vital climate research.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-cyan-50 rounded-xl p-6">
              <span className="text-4xl mr-4">📊</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Transparent Tracking
                </h3>
                <p className="text-gray-700">
                  Receive quarterly reports with underwater photos, satellite imagery,
                  and research updates directly from HEPCA field teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Protect Coral Refugia?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your sponsorship today and receive your certificate within minutes.
            Every hectare counts in the fight to save coral reefs.
          </p>
          <Link
            href="/sponsor"
            className="inline-block bg-white text-cyan-700 font-bold py-4 px-12 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg"
          >
            Sponsor Now
          </Link>
        </div>
      </section>
    </div>
  );
}
