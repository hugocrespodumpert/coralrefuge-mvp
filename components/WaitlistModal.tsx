'use client';

import { useState, useEffect } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: {
      individual: false,
      corporate: false,
      diveOperator: false,
      stayingInformed: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Prepare interest types
      const interestTypes = [];
      if (formData.interests.individual) interestTypes.push('individual');
      if (formData.interests.corporate) interestTypes.push('corporate');
      if (formData.interests.diveOperator) interestTypes.push('dive_operator');
      if (formData.interests.stayingInformed) interestTypes.push('staying_informed');

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          interest_types: interestTypes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setIsSuccess(true);

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          interests: {
            individual: false,
            corporate: false,
            diveOperator: false,
            stayingInformed: false,
          },
        });
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-deep mb-2">
                Thanks! You&apos;re on the list
              </h3>
              <p className="text-gray-600">
                We&apos;ll email you when we launch.
              </p>
              <p className="text-sm text-teal mt-4">
                In the meantime, explore our interactive map →
              </p>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mb-4">
                  <span className="text-3xl">🪸</span>
                </div>
                <h2 className="text-3xl font-bold text-navy-deep mb-2">
                  Be the first to protect coral refugia
                </h2>
                <p className="text-gray-600">
                  Join our waitlist and get:
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-teal mr-2 mt-0.5">✓</span>
                  <span className="text-gray-700">Early access notification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 mt-0.5">✓</span>
                  <span className="text-gray-700">15% founding sponsor discount</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 mt-0.5">✓</span>
                  <span className="text-gray-700">Exclusive updates from the field</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2 mt-0.5">✓</span>
                  <span className="text-gray-700">First choice of reef locations</span>
                </li>
              </ul>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interested in:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.individual}
                        onChange={(e) => setFormData({
                          ...formData,
                          interests: { ...formData.interests, individual: e.target.checked }
                        })}
                        className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                      />
                      <span className="ml-2 text-gray-700">Individual sponsorship</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.corporate}
                        onChange={(e) => setFormData({
                          ...formData,
                          interests: { ...formData.interests, corporate: e.target.checked }
                        })}
                        className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                      />
                      <span className="ml-2 text-gray-700">Corporate partnership</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.diveOperator}
                        onChange={(e) => setFormData({
                          ...formData,
                          interests: { ...formData.interests, diveOperator: e.target.checked }
                        })}
                        className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                      />
                      <span className="ml-2 text-gray-700">Dive operator partnership</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.stayingInformed}
                        onChange={(e) => setFormData({
                          ...formData,
                          interests: { ...formData.interests, stayingInformed: e.target.checked }
                        })}
                        className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                      />
                      <span className="ml-2 text-gray-700">Just staying informed</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
