/**
 * MPA Service Layer
 *
 * IMPORTANT LICENSE COMPLIANCE NOTE:
 * This service previously integrated with Protected Planet API, but that API's
 * terms of service prohibit commercial use. Since Coral Refuge is a commercial
 * platform, we use manually-created placeholder boundaries only.
 *
 * All MPA data is derived from:
 * - Public domain sources
 * - Manual boundary approximations
 * - Published MPA documentation
 * - Scientific literature
 *
 * For production deployment, obtain official boundaries through:
 * - Direct government partnerships (EEAA, HEPCA)
 * - Licensed commercial data providers
 * - Survey data with proper licensing
 */

import { mpaFeatures, type MPAFeature } from './mpa-data';

/**
 * Enhanced MPA metadata (without API integration)
 */
export interface EnhancedMPAMetadata {
  dataSource: 'manual_placeholder';
  notes: string;
}

/**
 * Enhanced MPA data using manual placeholder boundaries
 */
export interface EnhancedMPA {
  id: string;
  slug: string;
  name: string;
  hectares: number;
  designation: string;
  partner: string;
  description: string;
  pricePerHectare: number;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][]; // Support both Polygon and MultiPolygon
  };
  metadata: EnhancedMPAMetadata;
}

/**
 * Enhance a single MPA with metadata (using manual data only)
 */
function enhanceMPA(mpa: MPAFeature): EnhancedMPA {
  return {
    ...mpa.properties,
    geometry: mpa.geometry,
    metadata: {
      dataSource: 'manual_placeholder',
      notes: 'Manually created placeholder boundary. For production, obtain official boundaries through licensed sources.',
    },
  };
}

/**
 * Fetch all MPA boundaries (manual placeholders only)
 *
 * LICENSE COMPLIANCE: Does NOT use Protected Planet API
 * Uses manually-created placeholder boundaries
 */
export async function fetchMPABoundaries(): Promise<EnhancedMPA[]> {
  console.log('📍 Loading MPA boundaries (manual placeholders)...');
  console.warn('⚠️  Protected Planet API NOT USED - License prohibits commercial use');
  console.log('ℹ️  Using manually-created placeholder boundaries');

  const mpas: EnhancedMPA[] = mpaFeatures.map(enhanceMPA);

  console.log(`✅ Loaded ${mpas.length} MPAs with manual boundaries`);

  return mpas;
}

/**
 * Convert EnhancedMPA array to GeoJSON FeatureCollection
 * Used by Mapbox GL for rendering
 */
export function mpasToGeoJSON(mpas: EnhancedMPA[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: mpas.map((mpa) => ({
      type: 'Feature',
      properties: {
        ...mpa,
        dataSource: mpa.metadata.dataSource,
      },
      geometry: mpa.geometry,
    })),
  } as GeoJSON.FeatureCollection;
}

/**
 * Get total hectares across all MPAs
 */
export function getTotalHectares(mpas: EnhancedMPA[]): number {
  return mpas.reduce((sum, mpa) => sum + mpa.hectares, 0);
}

/**
 * Get total protection potential (in USD)
 */
export function getTotalProtectionPotential(mpas: EnhancedMPA[]): number {
  return mpas.reduce((sum, mpa) => sum + mpa.hectares * mpa.pricePerHectare, 0);
}
