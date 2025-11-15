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
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-ocean-deep mb-12 text-center">
            What are Coral Refugia?
          </h2>

          <div className="bg-white rounded-2xl p-10 shadow-2xl mb-12">
            <p className="text-3xl font-bold text-ocean-deep mb-8 text-center">
              Think of refugia as genetic seed banks for the ocean
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Coral refugia are rare reef ecosystems with unique conditions that allow them to survive warming seas.
              While 90% of reefs may bleach and die, these special places can weather the storm—preserving biodiversity
              and serving as sources for reef recovery worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80"
                  alt="Healthy coral reef refugia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80"
                  alt="Diverse coral species"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-turquoise/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">What Makes a Refugia?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-turquoise rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700"><strong>Cooler water circulation</strong> from deep channels</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-turquoise rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700"><strong>Strong currents</strong> providing nutrients and temperature regulation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-turquoise rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700"><strong>Genetic diversity</strong> with heat-tolerant coral strains</span>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 bg-turquoise rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700"><strong>Geographic isolation</strong> from major stressors</span>
                </li>
              </ul>
            </div>

            <div className="bg-ocean-deep/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">The Science</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We leverage the <strong>50 Reefs</strong> initiative and <strong>Allen Coral Atlas</strong> to identify
                these critical areas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Protected reefs in refugia <strong>recover 40% faster</strong> than unprotected areas. By safeguarding
                these ecosystems now, we preserve the coral genes that will repopulate tomorrow&apos;s oceans.
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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-ocean-deep mb-16 text-center">Our Approach</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Leverage the Science</h3>
              <p className="text-xl leading-relaxed">
                We partner with the <strong>50 Reefs</strong> initiative and use data from the <strong>Allen Coral Atlas</strong>.
                Every refugia is backed by peer-reviewed research and satellite mapping.
              </p>
            </div>

            <div className="bg-gradient-to-br from-turquoise to-ocean-blue text-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Partner with Local MPAs</h3>
              <p className="text-xl leading-relaxed">
                100% of funds go to established marine protected areas like <strong>HEPCA</strong> in Egypt.
                These are organizations with decades of proven conservation success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-ocean-blue to-turquoise text-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Radical Transparency</h3>
              <p className="text-xl leading-relaxed">
                GPS coordinates. Quarterly reports. Real data on coral health and biodiversity.
                You&apos;ll know exactly where your money goes and what it achieves.
              </p>
            </div>

            <div className="bg-gradient-to-br from-ocean-deep via-ocean-blue to-turquoise text-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Proven Model</h3>
              <p className="text-xl leading-relaxed">
                Protected reefs in refugia <strong>recover 40% faster</strong> than unprotected areas.
                This isn&apos;t just conservation—it&apos;s climate adaptation.
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
