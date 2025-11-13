import Button from '@/components/Button';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Coral Refuge
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Protecting the coral reefs that can survive climate change
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ocean-deep mb-8 text-center">Our Mission</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-6">
              Coral Refuge exists to protect and preserve climate-resilient coral reef refugia—the ocean&apos;s last hope in the face of climate change.
            </p>
            <p className="leading-relaxed mb-6">
              By connecting individuals and organizations with marine protected areas, we create a global network of guardians dedicated to safeguarding these critical ecosystems. Every hectare protected contributes to biodiversity conservation, coastal protection, and the livelihoods of millions who depend on healthy reefs.
            </p>
          </div>
        </div>
      </section>

      {/* What Are Coral Refugia */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ocean-deep mb-8 text-center">
            What Are Coral Refugia?
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="leading-relaxed mb-6">
                <strong>Coral refugia</strong> are special reef areas with unique environmental conditions that help them survive rising ocean temperatures and other climate change impacts.
              </p>
              <p className="leading-relaxed mb-6">
                These refuges might benefit from:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-turquoise mr-2">🌊</span>
                  <span><strong>Upwelling currents</strong> that bring cooler, nutrient-rich water</span>
                </li>
                <li className="flex items-start">
                  <span className="text-turquoise mr-2">🏔️</span>
                  <span><strong>Deep water access</strong> where corals can retreat during heat waves</span>
                </li>
                <li className="flex items-start">
                  <span className="text-turquoise mr-2">🧬</span>
                  <span><strong>Genetic adaptations</strong> that make them more heat-tolerant</span>
                </li>
                <li className="flex items-start">
                  <span className="text-turquoise mr-2">🌍</span>
                  <span><strong>Geographic protection</strong> from storm damage and bleaching events</span>
                </li>
              </ul>
              <p className="leading-relaxed">
                By protecting these refugia now, we ensure that coral reefs can survive, adapt, and eventually help restore degraded reef systems worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Funds Are Used */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ocean-deep mb-12 text-center">
            How Your Funds Are Used
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                👮
              </div>
              <h3 className="text-xl font-bold text-ocean-deep mb-3">MPA Patrols</h3>
              <p className="text-gray-600">
                Funding patrol boats and rangers to prevent illegal fishing, anchoring, and other destructive activities in protected areas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                🔬
              </div>
              <h3 className="text-xl font-bold text-ocean-deep mb-3">Scientific Monitoring</h3>
              <p className="text-gray-600">
                Supporting coral health assessments, biodiversity surveys, and water quality monitoring to track refuge status.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-ocean-deep mb-3">Protection Infrastructure</h3>
              <p className="text-gray-600">
                Installing mooring buoys, signage, and equipment that reduce human impact on sensitive reef areas.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-turquoise/10 rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              <strong>100% of your sponsorship</strong> goes directly to marine protected area management and conservation activities.
            </p>
            <p className="text-gray-600">
              We partner with established MPAs and conservation organizations with proven track records in reef protection.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ocean-deep mb-8 text-center">Our Approach</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-ocean-deep mb-3">🎯 Science-Based Selection</h3>
              <p className="text-gray-600">
                We work with marine scientists to identify true climate refugia based on peer-reviewed research and long-term monitoring data.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-ocean-deep mb-3">🤝 Local Partnerships</h3>
              <p className="text-gray-600">
                All funding goes to established marine protected areas and local conservation organizations with deep community connections.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-ocean-deep mb-3">📊 Transparent Impact</h3>
              <p className="text-gray-600">
                Every sponsor receives regular updates on how their funds are used and the measurable conservation outcomes achieved.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-ocean-deep mb-3">🌍 Global Network</h3>
              <p className="text-gray-600">
                By connecting refugia across oceans, we build resilience into the global coral reef system and support ecosystem recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-ocean-deep mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about coral refugia, our partnerships, or how to get involved?
          </p>
          <div className="mb-8">
            <a
              href="mailto:info@coralrefuge.org"
              className="text-xl text-turquoise hover:text-ocean-blue font-semibold"
            >
              info@coralrefuge.org
            </a>
          </div>
          <Button href="/sponsor" size="lg">
            Become a Guardian Today
          </Button>
        </div>
      </section>

      {/* Built With Science */}
      <section className="py-12 bg-gradient-to-br from-ocean-deep to-ocean-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl font-light italic">
            Built with science. Driven by purpose.
          </p>
        </div>
      </section>
    </main>
  );
}
