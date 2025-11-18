'use client';

import { useState } from 'react';

interface PricingSelectorProps {
  hectares: number;
  onPriceChange: (totalPrice: number, pricingDetails: PricingDetails) => void;
}

export interface PricingDetails {
  type: 'annual' | 'multi-year' | 'monthly';
  years?: number; // For multi-year
  pricePerHectarePerYear: number;
  totalYears: number;
  totalPrice: number;
  savings?: number;
}

export default function PricingSelector({ hectares, onPriceChange }: PricingSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<'annual' | 'multi-year' | 'monthly'>('annual');
  const [multiYearOption, setMultiYearOption] = useState<number>(2);

  const baseAnnualPrice = 150; // $150 per hectare per year

  // Calculate pricing based on tier
  const calculatePricing = (
    tier: 'annual' | 'multi-year' | 'monthly',
    years: number = 1
  ): PricingDetails => {
    let pricingDetails: PricingDetails;

    switch (tier) {
      case 'annual':
        pricingDetails = {
          type: 'annual',
          pricePerHectarePerYear: baseAnnualPrice,
          totalYears: 1,
          totalPrice: hectares * baseAnnualPrice,
        };
        break;

      case 'multi-year':
        // Discount structure: 2yr = 5%, 3yr = 10%, 5yr = 15%
        const discounts: Record<number, number> = {
          2: 0.05,
          3: 0.10,
          5: 0.15,
        };
        const discount = discounts[years] || 0;
        const discountedPrice = baseAnnualPrice * (1 - discount);
        const totalWithoutDiscount = hectares * baseAnnualPrice * years;
        const totalWithDiscount = hectares * discountedPrice * years;

        pricingDetails = {
          type: 'multi-year',
          years,
          pricePerHectarePerYear: discountedPrice,
          totalYears: years,
          totalPrice: totalWithDiscount,
          savings: totalWithoutDiscount - totalWithDiscount,
        };
        break;

      case 'monthly':
        // Monthly is $15/hectare/month = $180/year (slight premium)
        const monthlyPrice = 15;
        pricingDetails = {
          type: 'monthly',
          pricePerHectarePerYear: monthlyPrice * 12,
          totalYears: 1,
          totalPrice: hectares * monthlyPrice, // First month
        };
        break;

      default:
        pricingDetails = {
          type: 'annual',
          pricePerHectarePerYear: baseAnnualPrice,
          totalYears: 1,
          totalPrice: hectares * baseAnnualPrice,
        };
    }

    return pricingDetails;
  };

  const handleTierChange = (tier: 'annual' | 'multi-year' | 'monthly', years: number = 1) => {
    setSelectedTier(tier);
    if (tier === 'multi-year') {
      setMultiYearOption(years);
    }
    const pricing = calculatePricing(tier, years);
    onPriceChange(pricing.totalPrice, pricing);
  };

  const currentPricing = calculatePricing(
    selectedTier,
    selectedTier === 'multi-year' ? multiYearOption : 1
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Select Payment Plan</h3>

      {/* Tier 1: Annual Subscription */}
      <div
        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedTier === 'annual'
            ? 'border-teal bg-teal/5'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => handleTierChange('annual')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                checked={selectedTier === 'annual'}
                onChange={() => handleTierChange('annual')}
                className="w-4 h-4 text-teal"
              />
              <span className="font-bold text-gray-800">Annual Subscription</span>
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                MOST POPULAR
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              ${baseAnnualPrice}/hectare/year • Renews automatically • Flexible
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-teal">
              ${hectares * baseAnnualPrice}
            </div>
            <div className="text-xs text-gray-500">per year</div>
          </div>
        </div>
      </div>

      {/* Tier 2: Multi-Year Commitment */}
      <div
        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedTier === 'multi-year'
            ? 'border-teal bg-teal/5'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => handleTierChange('multi-year', multiYearOption)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                checked={selectedTier === 'multi-year'}
                onChange={() => handleTierChange('multi-year', multiYearOption)}
                className="w-4 h-4 text-teal"
              />
              <span className="font-bold text-gray-800">Multi-Year Commitment</span>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                BEST VALUE
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              One-time payment • Long-term impact • Save up to 15%
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-teal">
              ${Math.round(currentPricing.totalPrice)}
            </div>
            <div className="text-xs text-gray-500">one-time</div>
          </div>
        </div>

        {selectedTier === 'multi-year' && (
          <div className="ml-6 space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Choose duration:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { years: 2, discount: 5 },
                { years: 3, discount: 10 },
                { years: 5, discount: 15 },
              ].map((option) => {
                const pricing = calculatePricing('multi-year', option.years);
                return (
                  <button
                    key={option.years}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTierChange('multi-year', option.years);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      multiYearOption === option.years
                        ? 'border-teal bg-teal/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-gray-800">
                      {option.years} years
                    </div>
                    <div className="text-xs text-gray-600">
                      ${Math.round(pricing.totalPrice)}
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      Save ${Math.round(pricing.savings || 0)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({option.discount}% off)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tier 3: Monthly Subscription */}
      <div
        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedTier === 'monthly'
            ? 'border-teal bg-teal/5'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => handleTierChange('monthly')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                checked={selectedTier === 'monthly'}
                onChange={() => handleTierChange('monthly')}
                className="w-4 h-4 text-teal"
              />
              <span className="font-bold text-gray-800">Monthly Subscription</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              $15/hectare/month • 3-month minimum • Cancel anytime after
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-teal">
              ${hectares * 15}
            </div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-teal/10 to-ocean-blue/10 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Your investment</div>
            <div className="text-2xl font-bold text-navy-deep">
              ${Math.round(currentPricing.totalPrice)}
            </div>
            {currentPricing.savings && currentPricing.savings > 0 && (
              <div className="text-sm text-green-600 font-semibold">
                Save ${Math.round(currentPricing.savings)}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {currentPricing.type === 'monthly' ? 'First month' :
               currentPricing.type === 'multi-year' ? `${currentPricing.years} years` : '1 year'}
            </div>
            <div className="text-xs text-gray-500">
              {hectares} hectare{hectares > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
