'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchMPABoundaries, mpasToGeoJSON, type EnhancedMPA } from '@/lib/mpa-service';
import { getMPAById, type MPAFeature } from '@/lib/mpa-data';
import CoralToggleControl from './CoralToggleControl';
import CoralLegend from './CoralLegend';
import MPADetailModal from './MPADetailModal';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // MPA data state
  const [mpas, setMpas] = useState<EnhancedMPA[]>([]);

  // Modal state
  const [selectedMPA, setSelectedMPA] = useState<MPAFeature | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Coral layer state
  const [coralVisible, setCoralVisible] = useState(false);
  const [coralOpacity, setCoralOpacity] = useState(0.6);
  const [coralLoading, setCoralLoading] = useState(false);
  const [coralError, setCoralError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Mapbox token is available
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      setError('Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file.');
      setIsLoading(false);
      return;
    }

    // Check if container exists
    if (!mapContainer.current) return;

    // Initialize map only once
    if (map.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      // Create the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [34.5, 26.0], // Red Sea, Egypt
        zoom: 6.5,
        pitch: 0,
        bearing: 0,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      }), 'bottom-right');

      // Wait for map to load
      map.current.on('load', () => {
        if (!map.current) return;

        console.log('🗺️  Map loaded successfully');

        // Add Allen Coral Atlas WMS source
        // Using updated endpoint with version 1.3.0
        console.log('🪸 Adding Allen Coral Atlas WMS source...');
        try {
          map.current.addSource('coral-atlas', {
            type: 'raster',
            tiles: [
              'https://allencoralatlas.org/geoserver/coral-atlas/wms?' +
              'service=WMS&' +
              'version=1.3.0&' +
              'request=GetMap&' +
              'layers=coral-atlas:benthic&' +
              'bbox={bbox-epsg-3857}&' +
              'width=256&' +
              'height=256&' +
              'crs=EPSG:3857&' +
              'format=image/png&' +
              'transparent=true'
            ],
            tileSize: 256,
            attribution: '© Allen Coral Atlas'
          });
          console.log('✅ Coral Atlas source added:', map.current.getSource('coral-atlas') ? 'EXISTS' : 'MISSING');
        } catch (err) {
          console.error('❌ Failed to add coral source:', err);
          setCoralError('Failed to add coral data source');
        }

        // Add coral cover layer (initially hidden)
        // IMPORTANT: Add BEFORE MPA layers so MPA borders stay on top
        console.log('🪸 Adding coral cover layer...');
        try {
          map.current.addLayer({
            id: 'coral-cover',
            type: 'raster',
            source: 'coral-atlas',
            layout: {
              visibility: 'none'
            },
            paint: {
              'raster-opacity': 0.6,
              'raster-fade-duration': 300
            }
          });
          console.log('✅ Coral layer added:', map.current.getLayer('coral-cover') ? 'EXISTS' : 'MISSING');
        } catch (err) {
          console.error('❌ Failed to add coral layer:', err);
          setCoralError('Failed to add coral visualization layer');
        }

        // Add MPA GeoJSON source (initially empty, will be populated when data loads)
        map.current.addSource('mpa-boundaries', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          } as GeoJSON.FeatureCollection<GeoJSON.Geometry>
        });

        // Add fill layer for MPA polygons
        map.current.addLayer({
          id: 'mpa-fills',
          type: 'fill',
          source: 'mpa-boundaries',
          paint: {
            'fill-color': '#0080ff',
            'fill-opacity': 0.3
          }
        });

        // Add border layer for MPA polygons
        map.current.addLayer({
          id: 'mpa-borders',
          type: 'line',
          source: 'mpa-boundaries',
          paint: {
            'line-color': '#0080ff',
            'line-width': 2
          }
        });

        // Create a popup instance
        popup.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 15
        });

        // Hover effect - mouseenter
        map.current.on('mouseenter', 'mpa-fills', (e) => {
          if (!map.current) return;

          // Change cursor to pointer
          map.current.getCanvas().style.cursor = 'pointer';

          // Increase opacity on hover
          map.current.setPaintProperty('mpa-fills', 'fill-opacity', 0.5);
          map.current.setPaintProperty('mpa-borders', 'line-width', 3);

          // Get feature properties
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const properties = feature.properties;

            if (properties) {
              // Show tooltip with MPA information
              if (popup.current && e.lngLat) {
                const htmlContent = `
                  <div class="font-sans max-w-xs">
                    <h3 class="font-bold text-base mb-2">${properties.name}</h3>
                    <div class="space-y-1 text-sm text-gray-700">
                      <div>📏 ${Number(properties.hectares).toLocaleString()} hectares</div>
                      <div>🏛️ ${properties.designation}</div>
                      <div>🛡️ Managed by ${properties.partner}</div>
                    </div>
                    <div class="mt-2 pt-2 border-t border-gray-200">
                      <span class="text-blue-600 font-medium text-sm">✨ Available to Sponsor</span>
                    </div>
                    <div class="text-xs text-gray-500 mt-2">ℹ️ Approximate boundary</div>
                  </div>
                `;

                popup.current
                  .setLngLat(e.lngLat)
                  .setHTML(htmlContent)
                  .addTo(map.current);
              }
            }
          }
        });

        // Hover effect - mousemove (update popup position)
        map.current.on('mousemove', 'mpa-fills', (e) => {
          if (popup.current && e.lngLat) {
            popup.current.setLngLat(e.lngLat);
          }
        });

        // Hover effect - mouseleave
        map.current.on('mouseleave', 'mpa-fills', () => {
          if (!map.current) return;

          // Reset cursor
          map.current.getCanvas().style.cursor = '';

          // Reset opacity
          map.current.setPaintProperty('mpa-fills', 'fill-opacity', 0.3);
          map.current.setPaintProperty('mpa-borders', 'line-width', 2);

          // Remove popup
          if (popup.current) {
            popup.current.remove();
          }
        });

        // Click event - Open MPA Detail Modal
        map.current.on('click', 'mpa-fills', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const properties = feature.properties;

            if (properties && properties.id) {
              console.log('🗺️  MPA clicked:', properties.name);

              // Get full MPA data with all properties
              const mpaData = getMPAById(properties.id);

              if (mpaData) {
                console.log('✅ Opening modal for:', mpaData.properties.name);
                setSelectedMPA(mpaData);
                setModalOpen(true);
              } else {
                console.warn('⚠️  MPA data not found for ID:', properties.id);
              }
            }
          }
        });

        setIsLoading(false);
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);

        // Check if error is related to coral tiles
        // Mapbox error events may include sourceId in the error object
        const errorObj = e.error as any;
        if (errorObj && (errorObj.sourceId === 'coral-atlas' || e.toString().includes('coral-atlas'))) {
          console.error('❌ Coral Atlas tiles failed to load:', e);
          setCoralError('Coral data temporarily unavailable');
          // Don't set main error - map should still work without coral layer
        } else {
          setError('Failed to load map. Please check your internet connection and Mapbox token.');
          setIsLoading(false);
        }
      });

    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map. Please check your Mapbox token.');
      setIsLoading(false);
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Fetch MPA boundaries on component mount
  useEffect(() => {
    async function loadMPAs() {
      try {
        console.log('🗺️  Loading MPA boundaries...');
        const mpaData = await fetchMPABoundaries();
        setMpas(mpaData);
        console.log(`✅ Loaded ${mpaData.length} MPAs`);
      } catch (err) {
        console.error('❌ Failed to load MPAs:', err);
        // Keep mpas as empty array - map will show without MPAs
      }
    }

    loadMPAs();
  }, []);

  // Update map source when MPAs are loaded
  useEffect(() => {
    if (!map.current || mpas.length === 0) return;

    const source = map.current.getSource('mpa-boundaries') as mapboxgl.GeoJSONSource;
    if (source) {
      const geojson = mpasToGeoJSON(mpas);
      source.setData(geojson as GeoJSON.FeatureCollection<GeoJSON.Geometry>);
      console.log('✅ Updated map with MPA boundaries');
    }
  }, [mpas]);

  // Coral layer control functions
  const toggleCoralLayer = (visible: boolean) => {
    if (!map.current) {
      console.warn('⚠️  Map not initialized');
      return;
    }

    console.log(`🪸 Toggle coral layer: ${visible ? 'SHOW' : 'HIDE'}`);

    setCoralLoading(true);
    setCoralVisible(visible);

    try {
      // Verify layer exists
      const layer = map.current.getLayer('coral-cover');
      if (!layer) {
        console.error('❌ Coral layer not found!');
        setCoralError('Coral layer not initialized');
        setCoralLoading(false);
        return;
      }

      // Verify source exists
      const source = map.current.getSource('coral-atlas');
      if (!source) {
        console.error('❌ Coral source not found!');
        setCoralError('Coral data source not initialized');
        setCoralLoading(false);
        return;
      }

      console.log('✅ Layer and source exist, setting visibility...');
      map.current.setLayoutProperty(
        'coral-cover',
        'visibility',
        visible ? 'visible' : 'none'
      );
      console.log(`✅ Coral visibility set to: ${visible ? 'visible' : 'none'}`);

      // Clear any previous errors on successful toggle
      if (coralError) {
        setCoralError(null);
      }
    } catch (err) {
      console.error('❌ Error toggling coral layer:', err);
      setCoralError('Failed to toggle coral overlay');
    } finally {
      // Small delay to show loading state
      setTimeout(() => setCoralLoading(false), 300);
    }
  };

  const updateCoralOpacity = (opacity: number) => {
    if (!map.current) return;

    setCoralOpacity(opacity);

    try {
      map.current.setPaintProperty('coral-cover', 'raster-opacity', opacity);
    } catch (err) {
      console.error('Error updating coral opacity:', err);
    }
  };

  // Handle sponsorship CTA
  const handleSponsor = (mpaSlug: string) => {
    console.log('🎯 Sponsor CTA clicked for:', mpaSlug);
    // Pre-fill sponsorship form with selected MPA
    router.push(`/sponsor?mpa=${mpaSlug}`);
  };

  // Error state
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Map Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-sm font-mono text-gray-700">
              Add to <strong>.env.local</strong>:
            </p>
            <code className="text-xs text-blue-600 block mt-2">
              NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
            </code>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Coral Layer Controls */}
      {!isLoading && !error && (
        <>
          <CoralToggleControl
            isVisible={coralVisible}
            opacity={coralOpacity}
            onToggle={toggleCoralLayer}
            onOpacityChange={updateCoralOpacity}
            isLoading={coralLoading}
            error={coralError}
          />
          <CoralLegend isVisible={coralVisible} />
        </>
      )}

      {/* MPA Detail Modal */}
      <MPADetailModal
        mpa={selectedMPA}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSponsor={handleSponsor}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Loading map...</p>
            <p className="text-gray-500 text-sm mt-2">Initializing satellite imagery</p>
          </div>
        </div>
      )}
    </div>
  );
}
