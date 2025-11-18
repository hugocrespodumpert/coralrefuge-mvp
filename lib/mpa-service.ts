/**
 * MPA Service Layer
 *
 * Combines Protected Planet API data with local fallback data
 * Handles caching, error recovery, and data transformation
 */

import { fetchProtectedArea } from './protected-planet-api';
import { mpaFeatures, type MPAFeature } from './mpa-data';
import type { EnhancedMPAMetadata } from '@/types/protected-planet';

/**
 * Enhanced MPA data combining local and API sources
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
 * Mapping of MPA slugs to WDPA IDs
 * Source: Protected Planet database (https://protectedplanet.net)
 */
const MPA_WDPA_MAPPING: Record<string, number | null> = {
  'ras-mohammed': 2332, // Confirmed: Ras Mohammed National Park
  'giftun-islands': null, // Need to search by name
  'wadi-el-gemal': null, // Need to search by name
};

/**
 * Convert square kilometers to hectares
 */
function km2ToHectares(km2: number): number {
  return Math.round(km2 * 100);
}

/**
 * Enhance a single MPA with Protected Planet data
 */
async function enhanceMPA(mpa: MPAFeature): Promise<EnhancedMPA> {
  const wdpaId = MPA_WDPA_MAPPING[mpa.properties.slug];

  // Start with fallback data
  let enhanced: EnhancedMPA = {
    ...mpa.properties,
    geometry: mpa.geometry,
    metadata: {
      dataSource: 'fallback',
    },
  };

  // Try to fetch from Protected Planet if WDPA ID is known
  if (wdpaId) {
    try {
      const apiData = await fetchProtectedArea(wdpaId);

      if (apiData?.protected_area) {
        const pa = apiData.protected_area;

        // Update with official data
        enhanced = {
          ...enhanced,
          name: pa.name, // Use official name
          designation: pa.designation_eng || pa.designation,
          hectares: pa.reported_marine_area_km2
            ? km2ToHectares(pa.reported_marine_area_km2)
            : pa.reported_area_km2
            ? km2ToHectares(pa.reported_area_km2)
            : enhanced.hectares,
          geometry: pa.geojson?.geometry || mpa.geometry,
          metadata: {
            wdpaId: pa.id,
            marineArea: pa.reported_marine_area_km2,
            established: pa.legal_status_updated_at,
            legalStatus: pa.legal_status,
            managementAuthority: pa.management_authority,
            iucnCategory: pa.iucn_category,
            governance: pa.governance_type,
            dataSource: 'protected_planet',
            fetchedAt: new Date().toISOString(),
          },
        };

        console.log(`✅ Enhanced ${mpa.properties.slug} with Protected Planet data`);
      } else {
        console.warn(
          `⚠️  Could not fetch WDPA ${wdpaId} for ${mpa.properties.slug}, using fallback`
        );
      }
    } catch (error) {
      console.error(`❌ Error enhancing ${mpa.properties.slug}:`, error);
    }
  } else {
    console.log(
      `ℹ️  No WDPA ID for ${mpa.properties.slug}, using placeholder boundaries`
    );
  }

  return enhanced;
}

/**
 * Fetch all MPA boundaries with enhancement from Protected Planet
 *
 * This is the main function used by the Map component
 */
export async function fetchMPABoundaries(): Promise<EnhancedMPA[]> {
  console.log('📍 Loading MPA boundaries...');

  const mpas: EnhancedMPA[] = [];

  // Process each MPA
  for (const mpa of mpaFeatures) {
    const enhancedMPA = await enhanceMPA(mpa);
    mpas.push(enhancedMPA);
  }

  // Summary statistics
  const protectedPlanetCount = mpas.filter(
    (m) => m.metadata.dataSource === 'protected_planet'
  ).length;
  const fallbackCount = mpas.filter(
    (m) => m.metadata.dataSource === 'fallback'
  ).length;

  console.log(`\n📊 MPA Data Summary:`);
  console.log(`   Total MPAs: ${mpas.length}`);
  console.log(`   ✅ Protected Planet (official): ${protectedPlanetCount}`);
  console.log(`   ⚠️  Fallback (placeholder): ${fallbackCount}\n`);

  if (fallbackCount > 0) {
    console.log(
      `ℹ️  To use official boundaries for all MPAs, configure PROTECTED_PLANET_TOKEN in .env.local`
    );
    console.log(`   Sign up at: https://api.protectedplanet.net/\n`);
  }

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
        // Flatten metadata for easier access in popups
        wdpaId: mpa.metadata.wdpaId,
        iucnCategory: mpa.metadata.iucnCategory,
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
