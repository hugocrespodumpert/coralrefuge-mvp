'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { getAllPartnerAccounts } from '@/lib/stripe-connect';

interface Partner {
  id: string;
  partner_name: string;
  partner_email: string;
  stripe_account_id: string;
  mpa_slugs: string[];
  contact_person?: string;
  contact_phone?: string;
  active: boolean;
  onboarded_at: string;
  created_at: string;
  updated_at: string;
}

export default function PartnersAdminPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check auth
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') !== 'true') {
      router.push('/admin');
      return;
    }

    loadPartners();
  }, [router]);

  async function loadPartners() {
    try {
      setLoading(true);
      const data = await getAllPartnerAccounts();
      setPartners(data);
      setError(null);
    } catch (error) {
      console.error('Failed to load partners:', error);
      setError('Failed to load partners. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading partners...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-ocean-deep mb-2">Partner Management</h1>
            <p className="text-gray-600">
              Manage conservation partners and their connected Stripe accounts
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/admin')}
              variant="outline"
            >
              ← Back to Dashboard
            </Button>
            <Button
              onClick={() => alert('Add partner feature coming soon!')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              + Add New Partner
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Partner Cards */}
        <div className="grid gap-6">
          {partners.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <p className="text-gray-500 text-lg">No partners found</p>
              <p className="text-gray-400 text-sm mt-2">
                Add your first partner to start processing payments
              </p>
            </div>
          ) : (
            partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-6">
                  {/* Partner Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-ocean-deep">
                        {partner.partner_name}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          partner.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {partner.active ? '✓ Active' : '○ Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{partner.partner_email}</p>

                    {/* Partner Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {/* Contact Person */}
                      {partner.contact_person && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Contact Person</div>
                          <div className="font-medium text-gray-900">
                            {partner.contact_person}
                          </div>
                        </div>
                      )}

                      {/* Contact Phone */}
                      {partner.contact_phone && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Phone</div>
                          <div className="font-medium text-gray-900">
                            {partner.contact_phone}
                          </div>
                        </div>
                      )}

                      {/* Onboarded Date */}
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Onboarded</div>
                        <div className="font-medium text-gray-900">
                          {new Date(partner.onboarded_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Stripe Account */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Stripe Account ID</div>
                      <code className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-mono text-gray-800 inline-block">
                        {partner.stripe_account_id}
                      </code>
                      {partner.stripe_account_id.includes('placeholder') && (
                        <span className="ml-3 text-yellow-600 text-sm font-medium">
                          ⚠ Test placeholder - Update with real account
                        </span>
                      )}
                    </div>

                    {/* Managing MPAs */}
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Managing MPAs</div>
                      <div className="flex flex-wrap gap-2">
                        {partner.mpa_slugs.map((slug) => (
                          <span
                            key={slug}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {slug}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() =>
                        alert('View analytics feature coming soon!')
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition-colors"
                    >
                      View Analytics
                    </button>
                    <button
                      onClick={() => alert('Edit partner feature coming soon!')}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold text-sm transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Revenue Stats Preview (Future Enhancement) */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Total Sponsorships</div>
                      <div className="text-2xl font-bold text-gray-900">-</div>
                      <div className="text-xs text-gray-400 mt-1">Coming soon</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
                      <div className="text-2xl font-bold text-gray-900">$0.00</div>
                      <div className="text-xs text-gray-400 mt-1">Coming soon</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Hectares Managed</div>
                      <div className="text-2xl font-bold text-gray-900">-</div>
                      <div className="text-xs text-gray-400 mt-1">Coming soon</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* How It Works */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              💡 How Stripe Connect Works
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Sponsors pay for coral reef protection</li>
              <li>• Stripe automatically splits payment 15/85</li>
              <li>• Partners receive funds instantly in their account</li>
              <li>• No manual transfers needed</li>
              <li>• Full transparency for all parties</li>
            </ul>
          </div>

          {/* Adding Partners */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 mb-3">
              🚀 Adding New Partners
            </h3>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Partner creates Stripe Connected account</li>
              <li>• Add partner details to database</li>
              <li>• Assign MPAs to partner</li>
              <li>• System automatically routes payments</li>
              <li>• Easy to scale to 100+ partners</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
