'use client';

import { useState } from 'react';

interface CoralToggleControlProps {
  isVisible: boolean;
  opacity: number;
  onToggle: (visible: boolean) => void;
  onOpacityChange: (opacity: number) => void;
  isLoading?: boolean;
}

export default function CoralToggleControl({
  isVisible,
  opacity,
  onToggle,
  onOpacityChange,
  isLoading = false,
}: CoralToggleControlProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-24 right-4 z-10 max-w-xs">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        {/* Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🪸</span>
            <span className="font-bold text-gray-900">Coral Cover</span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-3">
            {/* Toggle Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onToggle(true)}
                disabled={isLoading}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  isVisible
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Loading...' : 'Show'}
              </button>
              <button
                onClick={() => onToggle(false)}
                disabled={isLoading}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  !isVisible
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Hide
              </button>
            </div>

            {/* Opacity Slider - Only show when visible */}
            {isVisible && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <label className="text-gray-700 font-medium">Opacity</label>
                  <span className="text-gray-600">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(opacity * 100)}
                  onChange={(e) => {
                    const newOpacity = parseInt(e.target.value) / 100;
                    onOpacityChange(newOpacity);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                      opacity * 100
                    }%, #E5E7EB ${opacity * 100}%, #E5E7EB 100%)`,
                  }}
                />
              </div>
            )}

            {/* Info Text */}
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
              <p>
                Live coral distribution from{' '}
                <a
                  href="https://allencoralatlas.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Allen Coral Atlas
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-optimized compact version */}
      <style jsx>{`
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
          }

          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: none;
          }
        }

        @media (min-width: 641px) {
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
          }

          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: none;
          }
        }
      `}</style>
    </div>
  );
}
