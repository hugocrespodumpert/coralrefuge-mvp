'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mpaGeoJSON } from '@/lib/mpa-data';
import CoralToggleControl from './CoralToggleControl';
import CoralLegend from './CoralLegend';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Coral layer state
  const [coralVisible, setCoralVisible] = useState(false);
  const [coralOpacity, setCoralOpacity] = useState(0.6);
  const [coralLoading, setCoralLoading] = useState(false);

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

        // Add Allen Coral Atlas WMS source
        map.current.addSource('coral-atlas', {
          type: 'raster',
          tiles: [
            'https://allencoralatlas.org/geoserver/wms?' +
            'service=WMS&' +
            'version=1.1.1&' +
            'request=GetMap&' +
            'layers=allen_coral_atlas:benthic&' +
            'bbox={bbox-epsg-3857}&' +
            'width=256&' +
            'height=256&' +
            'srs=EPSG:3857&' +
            'styles=&' +
            'format=image/png&' +
            'transparent=true'
          ],
          tileSize: 256,
          attribution: '© Allen Coral Atlas'
        });

        // Add coral cover layer (initially hidden)
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

        // Add MPA GeoJSON source
        map.current.addSource('mpa-boundaries', {
          type: 'geojson',
          data: mpaGeoJSON as GeoJSON.FeatureCollection<GeoJSON.Geometry>
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
              // Show tooltip popup
              if (popup.current && e.lngLat) {
                const htmlContent = `
                  <div class="font-sans">
                    <h3 class="font-bold text-base mb-1">${properties.name}</h3>
                    <p class="text-sm text-gray-600">${properties.hectares.toLocaleString()} hectares • Available to Sponsor</p>
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

        // Click event
        map.current.on('click', 'mpa-fills', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const properties = feature.properties;

            if (properties) {
              console.log('MPA clicked:', properties);

              // Show simple alert for now (will be replaced with modal in Phase 4)
              const message = `${properties.name}\n\nSize: ${properties.hectares.toLocaleString()} hectares\nManaged by: ${properties.partner}\nDesignation: ${properties.designation}\n\n${properties.description}\n\n[Detailed modal coming in Phase 4]`;
              alert(message);
            }
          }
        });

        setIsLoading(false);
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map. Please check your internet connection and Mapbox token.');
        setIsLoading(false);
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

  // Coral layer control functions
  const toggleCoralLayer = (visible: boolean) => {
    if (!map.current) return;

    setCoralLoading(true);
    setCoralVisible(visible);

    try {
      map.current.setLayoutProperty(
        'coral-cover',
        'visibility',
        visible ? 'visible' : 'none'
      );
    } catch (err) {
      console.error('Error toggling coral layer:', err);
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
          />
          <CoralLegend isVisible={coralVisible} />
        </>
      )}

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
