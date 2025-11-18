'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MPAFeature } from '@/lib/mpa-data';
import { X, MapPin, Calendar, Shield, Leaf } from 'lucide-react';

interface MPADetailModalProps {
  mpa: MPAFeature | null;
  isOpen: boolean;
  onClose: () => void;
  onSponsor: (mpaSlug: string) => void;
}

export default function MPADetailModal({ mpa, isOpen, onClose, onSponsor }: MPADetailModalProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset image states when modal opens with new MPA
  useEffect(() => {
    if (isOpen && mpa) {
      setImageError(false);
      setImageLoading(true);
    }
  }, [isOpen, mpa]);

  if (!isOpen || !mpa) return null;

  const props = mpa.properties;
  const totalCost = props.hectares * props.pricePerHectare;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-0 md:inset-y-0 md:right-0 w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg z-10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-500 to-teal-500">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <div className="animate-pulse text-white text-6xl">🪸</div>
            </div>
          )}
          {!imageError && props.imageUrl ? (
            <Image
              src={props.imageUrl}
              alt={props.name}
              fill
              className="object-cover"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-8xl mb-4">🪸</div>
                <div className="text-2xl font-bold">{props.name}</div>
              </div>
            </div>
          )}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-1">{props.name}</h2>
            <p className="text-sm opacity-90">{props.nameArabic}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {props.hectares.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Hectares Protected</div>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600">
                {props.biodiversity.coralSpecies}+
              </div>
              <div className="text-sm text-gray-600">Coral Species</div>
            </div>
            {props.biodiversity.fishSpecies && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {props.biodiversity.fishSpecies.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600">Fish Species</div>
              </div>
            )}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {props.established}
              </div>
              <div className="text-sm text-gray-600">Established</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold mb-2">About This Marine Protected Area</h3>
            <p className="text-gray-700 leading-relaxed">
              {props.descriptionLong || props.description}
            </p>
          </div>

          {/* Highlights */}
          {props.highlights && props.highlights.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-3">Conservation Highlights</h3>
              <ul className="space-y-2">
                {props.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm text-gray-500">Location</div>
                <div className="text-gray-900">{props.location}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm text-gray-500">Designation</div>
                <div className="text-gray-900">{props.designation}</div>
                <div className="text-xs text-gray-500">{props.designationArabic}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm text-gray-500">Managed By</div>
                <div className="text-gray-900">{props.partnerFullName}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm text-gray-500">Governance</div>
                <div className="text-gray-900 text-sm">{props.governance}</div>
              </div>
            </div>
          </div>

          {/* Conservation Status */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              🛡️ Conservation Status
            </h4>
            <div className="space-y-1 text-sm">
              <div><strong>Refugium Type:</strong> {props.conservation.refugiumType}</div>
              <div><strong>Climate Threat:</strong> {props.conservation.climateThreat}</div>
              <div><strong>Protection Level:</strong> {props.conservation.protectionLevel}</div>
            </div>
          </div>

          {/* Endangered Species */}
          {props.biodiversity.endangeredSpecies && props.biodiversity.endangeredSpecies.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                ⚠️ Endangered Species Present
              </h4>
              <div className="flex flex-wrap gap-2">
                {props.biodiversity.endangeredSpecies.map((species, idx) => (
                  <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-amber-300">
                    {species}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sponsorship CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-bold">Sponsor This Coral Refugium</h3>
            <p className="text-blue-50">
              Protect {props.hectares.toLocaleString()} hectares of climate-resilient coral reefs.
              Your sponsorship directly funds conservation efforts by {props.partner}.
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">${props.pricePerHectare}</span>
              <span className="text-blue-100">per hectare/year</span>
            </div>

            <div className="bg-white/10 rounded-lg p-3 text-sm">
              <div className="flex justify-between mb-1">
                <span>Full MPA Sponsorship:</span>
                <span className="font-bold">${totalCost.toLocaleString()}/year</span>
              </div>
              <div className="text-blue-100 text-xs">
                Or sponsor any number of hectares
              </div>
            </div>

            <button
              onClick={() => onSponsor(props.slug)}
              className="w-full bg-white text-blue-600 font-bold py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
            >
              Sponsor This Reef →
            </button>

            <div className="text-center text-xs text-blue-100">
              85% goes directly to conservation • Tax-deductible receipt • GPS coordinates included
            </div>
          </div>

          {/* Data Attribution */}
          <div className="text-xs text-gray-400 pt-4 border-t border-gray-200 space-y-1">
            <div className="font-semibold">Data Sources:</div>
            {props.dataSources.map((source, idx) => (
              <div key={idx}>• {source}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
