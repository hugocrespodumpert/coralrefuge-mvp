'use client';

import { useState } from 'react';

interface ImpactMetric {
  icon: string;
  label: string;
  value: string;
  change?: string;
}

interface MPAImpactData {
  id: string;
  name: string;
  metrics: ImpactMetric[];
}

export default function ImpactPage() {
  const [selectedMPA, setSelectedMPA] = useState<string>('all');

  // Latest quarterly update (manually updated)
  const latestUpdate = {
    quarter: 'Q4 2024',
    date: 'October - December 2024',
    partner: 'HEPCA (Hurghada Environmental Protection and Conservation Association)',
    summary: 'Strong conservation outcomes across all three MPAs with increased patrol frequency and improved coral health metrics.',
  };

  // Aggregate metrics (manually updated each quarter)
  const aggregateMetrics: ImpactMetric[] = [
    {
      icon: '🚤',
      label: 'Patrol Hours',
      value: '1,240 hours',
      change: '+15% from Q3',
    },
    {
      icon: '🐟',
      label: 'Illegal Fishing Prevented',
      value: '23 incidents',
      change: '-8% from Q3 (improvement)',
    },
    {
      icon: '🪸',
      label: 'Coral Health',
      value: '89% live cover',
      change: 'up from 85%',
    },
    {
      icon: '🦈',
      label: 'Species Spotted',
      value: '187 species',
      change: '+12 species',
    },
    {
      icon: '📊',
      label: 'Water Quality',
      value: 'Excellent',
      change: 'All parameters optimal',
    },
  ];

  // Per-MPA breakdown (manually updated)
  const mpaData: MPAImpactData[] = [
    {
      id: 'ras-mohammed',
      name: 'Ras Mohammed National Park',
      metrics: [
        { icon: '🚤', label: 'Patrol Hours', value: '520 hours' },
        { icon: '🐟', label: 'Incidents Prevented', value: '8 incidents' },
        { icon: '🪸', label: 'Coral Live Cover', value: '92%' },
        { icon: '🦈', label: 'Species Count', value: '220+ species' },
        { icon: '🌡️', label: 'Water Temp', value: '24-26°C (optimal)' },
      ],
    },
    {
      id: 'giftun-islands',
      name: 'Giftun Islands Marine Protected Area',
      metrics: [
        { icon: '🚤', label: 'Patrol Hours', value: '420 hours' },
        { icon: '🐟', label: 'Incidents Prevented', value: '10 incidents' },
        { icon: '🪸', label: 'Coral Live Cover', value: '87%' },
        { icon: '🦈', label: 'Species Count', value: '196 species' },
        { icon: '🌊', label: 'Current Strength', value: 'Strong (healthy)' },
      ],
    },
    {
      id: 'wadi-el-gemal',
      name: 'Wadi El Gemal National Park',
      metrics: [
        { icon: '🚤', label: 'Patrol Hours', value: '300 hours' },
        { icon: '🐟', label: 'Incidents Prevented', value: '5 incidents' },
        { icon: '🪸', label: 'Coral Live Cover', value: '88%' },
        { icon: '🦈', label: 'Species Count', value: '195 species' },
        { icon: '💧', label: 'Water Clarity', value: '25m+ visibility' },
      ],
    },
  ];

  const displayedMetrics = selectedMPA === 'all'
    ? null
    : mpaData.find(mpa => mpa.id === selectedMPA);

  return (
    <main className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track the Impact of Your Protection
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Updated quarterly by our field partners
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
            <p className="text-sm text-white/80">
              <strong>Latest Update:</strong> {latestUpdate.quarter} ({latestUpdate.date})
            </p>
          </div>
        </div>
      </section>

      {/* Latest Update Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal/10 to-ocean-blue/10 rounded-2xl p-8 mb-12">
            <div className="flex items-start mb-4">
              <div className="text-4xl mr-4">📋</div>
              <div>
                <h2 className="text-2xl font-bold text-navy-deep mb-2">
                  {latestUpdate.quarter} Update
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Partner:</strong> {latestUpdate.partner}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {latestUpdate.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Aggregate Metrics Cards */}
          <h3 className="text-2xl font-bold text-navy-deep mb-6 text-center">
            Combined Impact Across All MPAs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {aggregateMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{metric.icon}</div>
                <div className="text-2xl font-bold text-navy-deep mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                {metric.change && (
                  <div className="text-xs text-teal font-semibold">
                    {metric.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-deep mb-6 text-center">
            How Data is Collected
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🤿</div>
              <h3 className="font-bold text-navy-deep mb-2">Reef Surveys</h3>
              <p className="text-sm text-gray-600">
                Monthly surveys by certified divers using standardized protocols
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold text-navy-deep mb-2">GPS Tracking</h3>
              <p className="text-sm text-gray-600">
                Patrol boat routes logged with GPS for accountability
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="font-bold text-navy-deep mb-2">Water Analysis</h3>
              <p className="text-sm text-gray-600">
                Weekly water samples for temperature, pH, and turbidity
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📸</div>
              <h3 className="font-bold text-navy-deep mb-2">Photo Docs</h3>
              <p className="text-sm text-gray-600">
                Underwater photography to track coral health over time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Per-MPA Breakdown */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-deep mb-6 text-center">
            MPA-Specific Metrics
          </h2>

          {/* MPA Selector Tabs */}
          <div className="flex justify-center mb-8 flex-wrap gap-2">
            <button
              onClick={() => setSelectedMPA('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedMPA === 'all'
                  ? 'bg-gradient-to-r from-teal to-ocean-blue text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All MPAs
            </button>
            {mpaData.map((mpa) => (
              <button
                key={mpa.id}
                onClick={() => setSelectedMPA(mpa.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedMPA === mpa.id
                    ? 'bg-gradient-to-r from-teal to-ocean-blue text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {mpa.name}
              </button>
            ))}
          </div>

          {/* Display MPA Metrics */}
          {selectedMPA === 'all' ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <p className="text-gray-600">
                Select an MPA above to view specific metrics
              </p>
            </div>
          ) : (
            displayedMetrics && (
              <div>
                <h3 className="text-2xl font-bold text-navy-deep mb-6 text-center">
                  {displayedMetrics.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {displayedMetrics.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center"
                    >
                      <div className="text-3xl mb-2">{metric.icon}</div>
                      <div className="text-xl font-bold text-navy-deep mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 bg-gradient-to-br from-teal/10 to-ocean-blue/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-teal text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            COMING SOON
          </div>
          <h2 className="text-3xl font-bold text-navy-deep mb-4">
            Enhanced Impact Dashboard
          </h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="flex items-center justify-center text-gray-700">
              <span className="text-teal mr-2">→</span>
              Real-time patrol tracking and live updates
            </p>
            <p className="flex items-center justify-center text-gray-700">
              <span className="text-teal mr-2">→</span>
              Interactive data visualization and charts
            </p>
            <p className="flex items-center justify-center text-gray-700">
              <span className="text-teal mr-2">→</span>
              Monthly updates instead of quarterly
            </p>
            <p className="flex items-center justify-center text-gray-700">
              <span className="text-teal mr-2">→</span>
              Photo galleries from field partners
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
