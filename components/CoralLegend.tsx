'use client';

import { useState } from 'react';

interface CoralLegendProps {
  isVisible: boolean;
}

export default function CoralLegend({ isVisible }: CoralLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) return null;

  const legendItems = [
    { color: '#E91E63', label: 'Live Coral', icon: '🟣' },
    { color: '#757575', label: 'Rock / Substrate', icon: '⚫' },
    { color: '#F5F5F5', label: 'Sand', icon: '⚪', border: true },
    { color: '#8D6E63', label: 'Rubble', icon: '🟤' },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-10 max-w-xs">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-bold text-sm text-gray-900">Coral Cover Legend</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
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

        {/* Legend Items */}
        {isExpanded && (
          <div className="px-4 pb-3 space-y-2">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className={`w-6 h-4 rounded flex-shrink-0 ${
                    item.border ? 'border border-gray-300' : ''
                  }`}
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700">{item.label}</span>
              </div>
            ))}

            {/* Attribution */}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Data:{' '}
                <a
                  href="https://allencoralatlas.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Allen Coral Atlas
                </a>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Coral cover mapped from satellite imagery
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
