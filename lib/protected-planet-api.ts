/**
 * Protected Planet API Client
 *
 * API Documentation: https://api.protectedplanet.net/documentation
 * Sign up for free token: https://api.protectedplanet.net/
 *
 * Free tier: 5,000 requests/month
 */

import type {
  ProtectedPlanetResponse,
  ProtectedPlanetSearchResponse,
} from '@/types/protected-planet';

const PROTECTED_PLANET_API = 'https://api.protectedplanet.net/v3';

/**
 * Get Protected Planet API token from environment
 * Token is optional - if not provided, system will fall back to placeholder data
 */
function getAPIToken(): string | null {
  const token = process.env.PROTECTED_PLANET_TOKEN || process.env.NEXT_PUBLIC_PROTECTED_PLANET_TOKEN;

  if (!token) {
    console.warn(
      '⚠️  Protected Planet API token not configured. Using fallback MPA boundaries.\n' +
      'To use official WDPA data, sign up at https://api.protectedplanet.net/ and add:\n' +
      'PROTECTED_PLANET_TOKEN=your_token to .env.local'
    );
    return null;
  }

  return token;
}

/**
 * Fetch a specific protected area by WDPA ID
 *
 * @param wdpaId - World Database on Protected Areas ID
 * @returns Protected area data with GeoJSON geometry, or null if not found/error
 */
export async function fetchProtectedArea(
  wdpaId: number
): Promise<ProtectedPlanetResponse | null> {
  const token = getAPIToken();

  if (!token) {
    return null; // No token, return null to trigger fallback
  }

  try {
    console.log(`📡 Fetching WDPA ${wdpaId} from Protected Planet API...`);

    const response = await fetch(
      `${PROTECTED_PLANET_API}/protected_areas/${wdpaId}?with_geometry=true`,
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        // Cache for 24 hours in Next.js
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`❌ WDPA ${wdpaId} not found in Protected Planet database`);
      } else if (response.status === 401) {
        console.error('❌ Invalid Protected Planet API token');
      } else if (response.status === 429) {
        console.error('❌ Protected Planet API rate limit exceeded');
      } else {
        console.error(`❌ Protected Planet API error: ${response.status}`);
      }
      return null;
    }

    const data: ProtectedPlanetResponse = await response.json();
    console.log(`✅ Successfully fetched WDPA ${wdpaId}: ${data.protected_area.name}`);

    return data;
  } catch (error) {
    console.error(`❌ Failed to fetch WDPA ${wdpaId}:`, error);
    return null;
  }
}

/**
 * Search for protected areas by name and country
 *
 * @param query - Search query (MPA name)
 * @param country - ISO3 country code (default: EGY for Egypt)
 * @returns Search results or null if error
 */
export async function searchProtectedAreas(
  query: string,
  country: string = 'EGY'
): Promise<ProtectedPlanetSearchResponse | null> {
  const token = getAPIToken();

  if (!token) {
    return null;
  }

  try {
    console.log(`🔍 Searching Protected Planet for "${query}" in ${country}...`);

    const url = new URL(`${PROTECTED_PLANET_API}/protected_areas`);
    url.searchParams.set('q', query);
    url.searchParams.set('country', country);
    url.searchParams.set('marine', 'true'); // Only marine protected areas

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`❌ Search failed: ${response.status}`);
      return null;
    }

    const data: ProtectedPlanetSearchResponse = await response.json();

    if (data.protected_areas && data.protected_areas.length > 0) {
      console.log(`✅ Found ${data.protected_areas.length} result(s) for "${query}"`);
      data.protected_areas.forEach((pa) => {
        console.log(`   - ${pa.name} (WDPA ID: ${pa.id})`);
      });
    } else {
      console.log(`ℹ️  No results found for "${query}"`);
    }

    return data;
  } catch (error) {
    console.error(`❌ Search failed for "${query}":`, error);
    return null;
  }
}

/**
 * Fetch multiple protected areas by WDPA IDs
 *
 * @param wdpaIds - Array of WDPA IDs
 * @returns Array of protected area data (nulls for failed fetches)
 */
export async function fetchMultipleProtectedAreas(
  wdpaIds: number[]
): Promise<(ProtectedPlanetResponse | null)[]> {
  console.log(`📡 Fetching ${wdpaIds.length} protected areas from Protected Planet...`);

  // Fetch in parallel for better performance
  const promises = wdpaIds.map((id) => fetchProtectedArea(id));
  const results = await Promise.all(promises);

  const successCount = results.filter((r) => r !== null).length;
  console.log(`✅ Successfully fetched ${successCount}/${wdpaIds.length} protected areas`);

  return results;
}

/**
 * Check if Protected Planet API is accessible
 * Useful for debugging and health checks
 */
export async function checkAPIHealth(): Promise<boolean> {
  const token = getAPIToken();

  if (!token) {
    return false;
  }

  try {
    // Try to fetch a known MPA (Ras Mohammed - WDPA 2332)
    const response = await fetch(
      `${PROTECTED_PLANET_API}/protected_areas/2332`,
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.ok;
  } catch {
    return false;
  }
}
