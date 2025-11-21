'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Partnership inquiry:', formData);

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      email: '',
      purpose: '',
    });
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ocean Impact for Your Business
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
            Turn every transaction into reef protection
          </p>
        </div>
      </section>

      {/* Revenue Split Model */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>

          {/* Visual Diagram */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-lg font-semibold text-gray-900">Your Sale</p>
              </div>
              <div className="text-3xl text-[#00B4D8]">→</div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-lg font-semibold text-gray-900">Wild Reefs Platform</p>
              </div>
              <div className="text-3xl text-[#00B4D8]">→</div>
              <div className="bg-[#00B4D8] rounded-xl p-6 text-white">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm">to MPAs</p>
              </div>
            </div>
            <div className="text-center mt-6 text-gray-600">
              <p className="text-sm">15% platform fee</p>
            </div>
          </div>

          {/* Description */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed">
              Every sale automatically protects ocean hectares. Your customers see real-time impact. We handle all conservation logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Partnership Tiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Startup Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Good for &lt;$1M revenue
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Startup</h3>
                <div className="text-4xl font-bold text-[#00B4D8]">$500<span className="text-lg text-gray-500">/year</span></div>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  Basic integration
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  Quarterly reports
                </li>
              </ul>
              <span className="block text-center text-sm text-gray-400 bg-gray-100 rounded-lg py-2">
                Coming Soon
              </span>
            </div>

            {/* Growth Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-[#00B4D8]">
              <div className="text-center mb-6">
                <span className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Good for $1M-$10M revenue
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth</h3>
                <div className="text-4xl font-bold text-[#00B4D8]">$2,500<span className="text-lg text-gray-500">/year</span></div>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  API access
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  Monthly reports
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  Co-marketing
                </li>
              </ul>
              <span className="block text-center text-sm text-gray-400 bg-gray-100 rounded-lg py-2">
                Coming Soon
              </span>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  $10M+ revenue
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-[#00B4D8]">Custom</div>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  White-label
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-start">
                  <span className="text-[#00B4D8] mr-2">✓</span>
                  Custom MPA selection
                </li>
              </ul>
              <span className="block text-center text-sm text-gray-400 bg-gray-100 rounded-lg py-2">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form - Simplified */}
      <section className="py-20 bg-white">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Be the first to know when partnerships launch
            </p>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#00B4D8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks!</h3>
                <p className="text-gray-600">
                  We&apos;ll contact you about early access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00B4D8] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00B4D8] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    I am a... *
                  </label>
                  <select
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00B4D8] focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate Partner</option>
                    <option value="ngo">NGO/Non-profit</option>
                    <option value="research">Research Institution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00B4D8] hover:bg-[#0096B8] text-white py-3 text-lg rounded-lg"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
