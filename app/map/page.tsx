import Map from '@/components/Map';
import { getTotalHectares, getTotalProtectionPotential, mpaFeatures } from '@/lib/mpa-data';

export const metadata = {
  title: 'Explore Coral Refugia Map | Coral Refuge',
  description: 'Interactive map showing climate-resilient coral reef protected areas available for sponsorship in the Egyptian Red Sea.',
};

export default function MapPage() {
  const totalHectares = getTotalHectares();
  const totalPotential = getTotalProtectionPotential();

  return (
    <main className="relative">
      <div className="w-full h-screen">
        <Map />
      </div>

      {/* Stats Overlay - Top Left */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs z-10">
        <h3 className="font-bold text-lg mb-2 text-gray-900">Protecting Climate-Resilient Reefs</h3>
        <div className="space-y-1 text-sm">
          <p className="text-gray-700">
            🗺️ <strong>{mpaFeatures.length}</strong> Marine Protected Areas
          </p>
          <p className="text-gray-700">
            🪸 <strong>{totalHectares.toLocaleString()}</strong> Hectares of Coral Refugia
          </p>
          <p className="text-gray-700">
            💰 <strong>${totalPotential.toLocaleString()}</strong> Protection Potential
          </p>
        </div>
        <p className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-200">
          Click any MPA to learn more
        </p>
      </div>

      {/* Legend - Bottom Left */}
      <div className="absolute bottom-20 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs z-10">
        <h4 className="font-bold text-sm mb-2 text-gray-900">Map Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-blue-500 opacity-30 border-2 border-blue-500 rounded"></div>
            <span className="text-gray-700">Marine Protected Area</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-blue-500 opacity-50 border-2 border-blue-600 rounded"></div>
            <span className="text-gray-700">Hovered Area</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
          Phase 1: Placeholder boundaries
          <br />
          Real polygons coming in Phase 3
        </p>
      </div>
    </main>
  );
}
