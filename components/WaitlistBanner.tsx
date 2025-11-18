'use client';

import { useState } from 'react';

interface WaitlistBannerProps {
  onJoinClick: () => void;
}

export default function WaitlistBanner({ onJoinClick }: WaitlistBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <p className="text-sm md:text-base font-medium">
          🚀 Launching Early 2026 - <button
            onClick={onJoinClick}
            className="underline font-semibold hover:text-white/90 transition-colors"
          >
            Join Waitlist for Early Access
          </button>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
