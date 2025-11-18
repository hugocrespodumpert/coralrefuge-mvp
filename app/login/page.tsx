'use client';

import { useState } from 'react';
import { sendMagicLink } from '@/lib/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await sendMagicLink(email);

      if (!result.success) {
        throw new Error(result.error);
      }

      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send magic link';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-ocean-blue to-teal rounded-full mb-4">
              <span className="text-4xl">🪸</span>
            </div>
            <h1 className="text-3xl font-bold text-navy-deep mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Access your coral reef portfolio
            </p>
          </div>

          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-deep mb-2">
                Check your email!
              </h3>
              <p className="text-gray-600 mb-4">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Click the link in the email to sign in. The link is valid for 30 days and will keep you logged in.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                  }}
                  className="text-teal hover:underline text-sm"
                >
                  Send to a different email
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll use this for your certificate
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-teal to-ocean-blue text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-ocean-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? 'Sending magic link...' : 'Send Magic Link'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-4">
                  <strong>No password needed!</strong> We'll email you a secure link that logs you in automatically.
                </p>
                <ul className="space-y-2 text-xs text-gray-500">
                  <li className="flex items-start">
                    <span className="text-teal mr-2">✓</span>
                    <span>Link valid for 30 days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">✓</span>
                    <span>Stay logged in across devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2">✓</span>
                    <span>Access your sponsorship dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-teal transition-colors"
                >
                  ← Back to homepage
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>New here?</strong> After your first sponsorship, you'll receive an email invitation to create your portfolio account.
          </p>
        </div>
      </div>
    </main>
  );
}
