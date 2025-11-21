'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

interface Sponsorship {
  id: string;
  stripe_session_id: string;
  stripe_payment_intent?: string;
  name: string;
  email: string;
  company?: string;
  mpa_id: string;
  mpa_name: string;
  hectares: number;
  amount: number;
  is_anonymous: boolean;
  payment_status: string;
  certificate_status: string;
  certificate_url?: string;
  created_at: string;
  updated_at?: string;
  email_sent_at?: string;
  // 🔑 Stripe Connect fields
  connected_account_id?: string;
  platform_fee_amount?: number;
  partner_amount?: number;
  partner_name?: string;
}

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company?: string;
  mpa_id: string;
  hectares: number;
  amount: number;
  interested_in_partnership: boolean;
  created_at: string;
}

interface PartnershipEntry {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  company_size: string;
  interest_type: string;
  message?: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'sponsorships' | 'waitlist' | 'partnerships'>('sponsorships');
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [partnershipEntries, setPartnershipEntries] = useState<PartnershipEntry[]>([]);
  const [isResending, setIsResending] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'coral-admin-2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSponsorships();
      fetchWaitlistEntries();
      fetchPartnershipEntries();
    }
  }, [isAuthenticated]);

  const fetchSponsorships = async () => {
    const { data, error } = await supabase
      .from('sponsorships')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sponsorships:', error);
    } else {
      setSponsorships(data || []);
    }
  };

  const fetchWaitlistEntries = async () => {
    const { data, error } = await supabase
      .from('waitlist_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching waitlist:', error);
    } else {
      setWaitlistEntries(data || []);
    }
  };

  const fetchPartnershipEntries = async () => {
    const { data, error } = await supabase
      .from('partnership_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching partnerships:', error);
    } else {
      setPartnershipEntries(data || []);
    }
  };

  const handleResendCertificate = async (sponsorship: Sponsorship) => {
    if (!confirm(`Resend certificate to ${sponsorship.email}?`)) return;

    setIsResending(sponsorship.id);
    try {
      const response = await fetch('/api/resend-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sponsorshipId: sponsorship.id }),
      });

      if (response.ok) {
        alert('Certificate resent successfully!');
        fetchSponsorships();
      } else {
        alert('Failed to resend certificate');
      }
    } catch (error) {
      console.error('Error resending certificate:', error);
      alert('Error resending certificate');
    } finally {
      setIsResending(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-ocean-deep mb-6 text-center">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-turquoise focus:outline-none"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Login
              </Button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-4">
              For demo purposes, password: coral-admin-2024
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-ocean-deep">Admin Dashboard</h1>
          <Button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem('admin_auth');
            }}
            variant="outline"
          >
            Logout
          </Button>
        </div>

        {/* Stats - General */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-turquoise mb-2">
              {sponsorships.length}
            </div>
            <div className="text-gray-600">Active Sponsorships</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-turquoise mb-2">
              {sponsorships.reduce((sum, s) => sum + s.hectares, 0)}
            </div>
            <div className="text-gray-600">Hectares Protected</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-turquoise mb-2">
              ${sponsorships.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-turquoise mb-2">
              {waitlistEntries.length}
            </div>
            <div className="text-gray-600">Waitlist Signups</div>
          </div>
        </div>

        {/* 🔑 NEW: Revenue Breakdown Cards (Stripe Connect) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-sm font-medium mb-2 text-purple-100">Total Revenue</h3>
            <p className="text-4xl font-bold mb-3">
              ${sponsorships.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
            </p>
            <p className="text-purple-100 text-sm">All-time platform volume</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-sm font-medium mb-2 text-blue-100">Platform Fees (15%)</h3>
            <p className="text-4xl font-bold mb-3">
              ${(sponsorships.reduce((sum, s) => sum + (s.platform_fee_amount || 0), 0) / 100).toFixed(2)}
            </p>
            <p className="text-blue-100 text-sm">Wild Reefs revenue</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-sm font-medium mb-2 text-green-100">To Partners (85%)</h3>
            <p className="text-4xl font-bold mb-3">
              ${(sponsorships.reduce((sum, s) => sum + (s.partner_amount || 0), 0) / 100).toFixed(2)}
            </p>
            <p className="text-green-100 text-sm">Partners received</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('sponsorships')}
                className={`flex-1 px-6 py-4 font-semibold ${
                  activeTab === 'sponsorships'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sponsorships ({sponsorships.length})
              </button>
              <button
                onClick={() => setActiveTab('waitlist')}
                className={`flex-1 px-6 py-4 font-semibold ${
                  activeTab === 'waitlist'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Waitlist ({waitlistEntries.length})
              </button>
              <button
                onClick={() => setActiveTab('partnerships')}
                className={`flex-1 px-6 py-4 font-semibold ${
                  activeTab === 'partnerships'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Partnerships ({partnershipEntries.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'sponsorships' ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ocean-deep mb-4">Active Sponsorships</h2>
                {sponsorships.length === 0 ? (
                  <p className="text-gray-500">No sponsorships yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Certificate ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Sponsor</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">MPA</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Hectares</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Partner</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform Fee</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Partner Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sponsorships.map((sponsorship) => (
                          <tr key={sponsorship.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-sm">{sponsorship.stripe_session_id.substring(0, 20)}...</td>
                            <td className="py-3 px-4">
                              {sponsorship.is_anonymous ? '🔒 Anonymous' : sponsorship.name}
                            </td>
                            <td className="py-3 px-4 text-sm">{sponsorship.mpa_name}</td>
                            <td className="py-3 px-4">{sponsorship.hectares}</td>
                            <td className="py-3 px-4">${sponsorship.amount}</td>
                            <td className="py-3 px-4 text-blue-600 font-medium text-sm">
                              {sponsorship.partner_name || 'N/A'}
                            </td>
                            <td className="py-3 px-4 text-purple-600 font-medium text-sm">
                              ${((sponsorship.platform_fee_amount || 0) / 100).toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-green-600 font-medium text-sm">
                              ${((sponsorship.partner_amount || 0) / 100).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              {sponsorship.email_sent_at ? (
                                <span className="text-green-600 text-sm">✓ Sent</span>
                              ) : (
                                <span className="text-yellow-600 text-sm">⚠ Pending</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {new Date(sponsorship.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleResendCertificate(sponsorship)}
                                disabled={isResending === sponsorship.id}
                                className="text-turquoise hover:text-ocean-blue font-semibold text-sm disabled:opacity-50"
                              >
                                {isResending === sponsorship.id ? 'Sending...' : 'Resend'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : activeTab === 'waitlist' ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ocean-deep mb-4">Waitlist Signups</h2>
                {waitlistEntries.length === 0 ? (
                  <p className="text-gray-500">No waitlist signups yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">MPA</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Hectares</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Partnership</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waitlistEntries.map((entry) => (
                          <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">{entry.name}</td>
                            <td className="py-3 px-4">{entry.email}</td>
                            <td className="py-3 px-4">{entry.company || '-'}</td>
                            <td className="py-3 px-4">{entry.mpa_id}</td>
                            <td className="py-3 px-4">{entry.hectares}</td>
                            <td className="py-3 px-4">${entry.amount}</td>
                            <td className="py-3 px-4">
                              {entry.interested_in_partnership ? '✓' : '-'}
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-turquoise hover:text-ocean-blue font-semibold text-sm">
                                Generate Certificate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-ocean-deep mb-4">Partnership Inquiries</h2>
                {partnershipEntries.length === 0 ? (
                  <p className="text-gray-500">No partnership inquiries yet.</p>
                ) : (
                  <div className="space-y-4">
                    {partnershipEntries.map((entry) => (
                      <div key={entry.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Company</div>
                            <div className="font-semibold text-ocean-deep">{entry.company_name}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Contact</div>
                            <div className="font-semibold">{entry.contact_name}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div>{entry.email}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Company Size</div>
                            <div>{entry.company_size}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Interest Type</div>
                            <div className="capitalize">{entry.interest_type.replace('-', ' ')}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Date</div>
                            <div>{new Date(entry.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        {entry.message && (
                          <div className="mt-4 pt-4 border-t border-gray-300">
                            <div className="text-sm text-gray-500 mb-2">Message</div>
                            <div className="text-gray-700">{entry.message}</div>
                          </div>
                        )}
                        <div className="mt-4 flex gap-3">
                          <button className="px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise/90 font-semibold text-sm">
                            Contact
                          </button>
                          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold text-sm">
                            Mark as Reviewed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
