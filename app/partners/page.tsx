'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    companySize: '',
    interestType: '',
    message: '',
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
      companyName: '',
      contactName: '',
      email: '',
      companySize: '',
      interestType: '',
      message: '',
    });
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Conservation as a Service
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Integrate ocean protection into your business model and make measurable impact
          </p>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ocean-deep text-center mb-12">
            Partnership Models
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Revenue-Based */}
            <div className="bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-3xl mb-6">
                💰
              </div>
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">Revenue-Based</h3>
              <p className="text-gray-700 mb-4">
                Donate a percentage of sales to protect coral reefs. Perfect for eco-conscious brands wanting ongoing impact.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-turquoise">
                <p className="text-sm font-semibold text-gray-700">Example:</p>
                <p className="text-sm text-gray-600">1% of monthly revenue = X hectares protected</p>
              </div>
            </div>

            {/* Flat Commitment */}
            <div className="bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-3xl mb-6">
                📊
              </div>
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">Flat Commitment</h3>
              <p className="text-gray-700 mb-4">
                Annual or monthly MPA sponsorship with predictable costs. Ideal for ESG reporting and sustainability goals.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-turquoise">
                <p className="text-sm font-semibold text-gray-700">Example:</p>
                <p className="text-sm text-gray-600">$5,000/year protects 100 hectares annually</p>
              </div>
            </div>

            {/* Custom Programs */}
            <div className="bg-gradient-to-br from-turquoise/10 to-ocean-blue/10 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center text-3xl mb-6">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-ocean-deep mb-4">Custom Programs</h3>
              <p className="text-gray-700 mb-4">
                Tailored conservation partnerships aligned with your brand values and business objectives.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-turquoise">
                <p className="text-sm font-semibold text-gray-700">Example:</p>
                <p className="text-sm text-gray-600">Product-linked campaigns, employee engagement programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-ocean-deep text-center mb-12">
            Partnership Benefits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📈</div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">Measurable Conservation Impact</h3>
                  <p className="text-gray-600">
                    Track exactly how many hectares your business protects with transparent reporting and real-time updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">ESG & Sustainability Reporting</h3>
                  <p className="text-gray-600">
                    Support for ESG frameworks with detailed impact metrics and sustainability documentation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📣</div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">Co-Marketing Opportunities</h3>
                  <p className="text-gray-600">
                    Share your conservation story through joint campaigns, content, and social media.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">Public Recognition</h3>
                  <p className="text-gray-600">
                    Featured in our public registry, website, and impact reports as a conservation leader.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">Exclusive Impact Updates</h3>
                  <p className="text-gray-600">
                    Quarterly reports on MPA health, biodiversity monitoring, and conservation milestones.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">👥</div>
                <div>
                  <h3 className="text-xl font-bold text-ocean-deep mb-2">Employee Engagement</h3>
                  <p className="text-gray-600">
                    Engage your team with meaningful environmental action and conservation education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-ocean-blue/5 to-turquoise/5 rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-ocean-deep mb-2 text-center">
              Request Partnership Information
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Let&apos;s explore how your business can make a lasting impact on ocean conservation
            </p>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-ocean-deep mb-2">Thank you for your interest!</h3>
                <p className="text-gray-600 mb-6">
                  Our partnerships team will reach out within 24-48 hours to discuss opportunities.
                </p>
                <Button onClick={() => setIsSuccess(false)}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                    placeholder="contact@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Size *
                  </label>
                  <select
                    required
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201+">201+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Partnership Interest *
                  </label>
                  <select
                    required
                    value={formData.interestType}
                    onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                  >
                    <option value="">Select partnership type</option>
                    <option value="revenue-based">Revenue-Based Partnership</option>
                    <option value="flat-commitment">Flat Commitment</option>
                    <option value="custom">Custom Program</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                    placeholder="Tell us about your conservation goals and any specific questions..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Sending Request...' : 'Request Partnership Info'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Featured Partners (Placeholder) */}
      <section className="py-16 bg-gradient-to-br from-ocean-deep to-ocean-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Leading Organizations</h2>
          <p className="text-white/90 mb-8">
            Companies worldwide are integrating ocean conservation into their business models
          </p>
          <Button href="/registry" variant="secondary" size="lg">
            View Our Impact Registry
          </Button>
        </div>
      </section>
    </main>
  );
}
