'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'How does reef sponsorship work?',
        answer: 'You select a marine protected area and number of hectares to sponsor. 80% of your contribution goes directly to our conservation partners for patrol boats, monitoring, and enforcement. You receive GPS coordinates, a certificate, and quarterly impact reports.',
      },
      {
        question: 'Why climate refugia specifically?',
        answer: 'Climate refugia are coral reefs with natural advantages—deep water channels, strong currents, genetic diversity—that help them survive warming better than other reefs. Protecting them preserves the ocean\'s genetic seed bank for future restoration.',
      },
      {
        question: 'Can I choose which reef to protect?',
        answer: 'Yes! Explore our interactive map to see available marine protected areas. Each shows coral species count, location, and current protection status.',
      },
    ],
  },
  {
    category: 'Impact & Transparency',
    items: [
      {
        question: 'How is my contribution used?',
        answer: '80% goes directly to local conservation partners (like HEPCA in Egypt) for patrol boats, scientific monitoring, enforcement, and community engagement. 20% funds our platform operations, technology, and impact reporting.',
      },
      {
        question: 'How do you measure impact?',
        answer: 'Our partners provide quarterly reports including: patrol hours logged, illegal fishing incidents prevented, coral health surveys, species counts, and water quality data. We publish all reports publicly.',
      },
      {
        question: 'Can I track my specific hectares?',
        answer: 'Yes! You receive GPS coordinates of your sponsored area and can view quarterly updates specific to your MPA.',
      },
      {
        question: 'Is this tax-deductible?',
        answer: 'Contributions may be tax-deductible depending on your jurisdiction. We provide receipts for all sponsorships. Consult your tax advisor for specific guidance.',
      },
    ],
  },
  {
    category: 'Sponsorship Details',
    items: [
      {
        question: 'What happens after my first year?',
        answer: 'Annual sponsorships renew automatically unless cancelled. You can upgrade, downgrade, or pause anytime from your dashboard. Monthly sponsorships have a 3-month minimum, then cancel anytime.',
      },
      {
        question: 'Can I sponsor as a gift?',
        answer: 'Absolutely! During checkout, select "This is a gift" and add recipient details. They\'ll receive a personalized certificate and quarterly updates.',
      },
      {
        question: 'Can I visit my sponsored reef?',
        answer: 'Yes! We provide exact GPS coordinates. Many sponsors plan dive trips to visit their hectares. Contact us for dive operator recommendations.',
      },
      {
        question: 'What if an MPA reaches full sponsorship?',
        answer: 'We\'ll contact you to choose another refugia or add you to a waitlist. Our goal is 100% coverage of high-priority refugia.',
      },
    ],
  },
  {
    category: 'Scientific Questions',
    items: [
      {
        question: 'What makes a reef a "refugium"?',
        answer: 'Climate refugia have natural characteristics that buffer thermal stress: cold water upwelling, strong currents, genetic diversity, and geographic protection from development. These reefs recover 40% faster from bleaching.',
      },
      {
        question: 'Who identifies these reefs?',
        answer: 'We use criteria from the 50 Reefs Initiative (international scientific collaboration) and validate with Allen Coral Atlas satellite mapping data.',
      },
      {
        question: 'Why protection vs restoration?',
        answer: 'Both are critical! Restoration rebuilds damaged reefs. Protection prevents damage to healthy refugia. Protecting resilient reefs now preserves genetic diversity needed for tomorrow\'s restoration efforts.',
      },
    ],
  },
  {
    category: 'Partnerships',
    items: [
      {
        question: 'Who are your conservation partners?',
        answer: 'We partner with established NGOs with decades of reef protection experience. In Egypt: HEPCA (Hurghada Environmental Protection and Conservation Association), founded 1992.',
      },
      {
        question: 'Can my company sponsor reefs?',
        answer: 'Yes! We offer corporate partnerships including revenue-share integration, flat commitments, and employee engagement programs. See our Conservation as a Service page or contact partnerships@wildreefs.com',
      },
      {
        question: 'I\'m a dive operator/resort. How can we partner?',
        answer: 'We\'d love to explore partnership! Contact us about offering reef sponsorship to your guests, co-branded programs, or hosting impact trips.',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        question: 'How secure is payment processing?',
        answer: 'We use Stripe, the same payment processor as Amazon and Shopify. We never see or store your card details.',
      },
      {
        question: 'Can I cancel my subscription?',
        answer: 'Yes, anytime from your dashboard. Annual subscriptions can be cancelled before renewal. Monthly subscriptions require 3-month minimum, then cancel anytime.',
      },
      {
        question: 'Do you have an API for corporate integration?',
        answer: 'Coming soon! Email partnerships@wildreefs.com if interested in revenue-share integration.',
      },
    ],
  },
  {
    category: 'Contact',
    items: [
      {
        question: 'How do I get in touch?',
        answer: 'Email hello@wildreefs.com or use our contact form. We respond within 24 hours.',
      },
    ],
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 pr-8">{item.question}</span>
        <svg
          className={`w-5 h-5 text-teal transition-transform flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90">
            Everything you need to know about protecting coral refugia
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqData.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal to-ocean-blue text-white py-4 px-6">
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>
                <div>
                  {category.items.map((item, itemIndex) => (
                    <FAQAccordion key={itemIndex} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-navy-deep mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re here to help! Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="mailto:hello@wildreefs.com"
              className="inline-block bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
