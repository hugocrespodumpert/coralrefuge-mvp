'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    // In a real implementation, you would fetch session details from Stripe
    // For now, we'll just show a success message
    setTimeout(() => {
      setLoading(false);
      // Mock session data
      setSessionData({
        customerEmail: 'customer@example.com',
        amount: 100,
      });
    }, 1000);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-xl text-cyan-900">Processing your sponsorship...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-900 mb-4">
              Thank You for Protecting Coral Refugia!
            </h1>

            <p className="text-xl text-gray-700 mb-8">
              Your sponsorship is now active and making a real difference in the Red Sea.
            </p>

            {/* Divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto mb-8"></div>

            {/* What's Next */}
            <div className="bg-cyan-50 rounded-xl p-8 mb-8 text-left">
              <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">
                What Happens Next?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Check Your Email
                    </h3>
                    <p className="text-gray-600">
                      Your certificate has been sent to your email address. It includes GPS
                      coordinates and a unique verification code.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      View Your Dashboard
                    </h3>
                    <p className="text-gray-600">
                      Access satellite imagery, monitoring data, and track the impact of
                      your protected area.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Receive Quarterly Updates
                    </h3>
                    <p className="text-gray-600">
                      Get field reports, underwater photos, and research findings from
                      HEPCA conservation teams.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Visit Your Protected Area
                    </h3>
                    <p className="text-gray-600">
                      Use the GPS coordinates to dive or snorkel in your protected area
                      anytime you visit Egypt!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-6">Your Immediate Impact</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold mb-2">🪸</div>
                  <div className="text-2xl font-bold mb-1">Active</div>
                  <div className="text-sm opacity-90">Protection Deployed</div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">🛡️</div>
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm opacity-90">Patrol Monitoring</div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">📊</div>
                  <div className="text-2xl font-bold mb-1">Live</div>
                  <div className="text-sm opacity-90">Data Tracking</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                View Dashboard
              </Link>

              <Link
                href="/sponsor"
                className="bg-white text-cyan-700 border-2 border-cyan-600 font-bold py-4 px-8 rounded-lg hover:bg-cyan-50 transition-all"
              >
                Protect More Area
              </Link>
            </div>

            {/* Social Share */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-700 mb-4 font-semibold">
                Share your conservation impact:
              </p>
              <div className="flex gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Share on Twitter
                </button>
                <button className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                  Share on Facebook
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Share on WhatsApp
                </button>
              </div>
            </div>

            {/* Email Notice */}
            <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-900">
                <strong>📧 Didn't receive your certificate email?</strong>
                <br />
                <span className="text-sm">
                  Check your spam folder or contact us at support@coralrefuge.org
                </span>
              </p>
            </div>

            {/* Session ID for reference */}
            {sessionId && (
              <p className="text-xs text-gray-500 mt-6">
                Transaction ID: {sessionId}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
