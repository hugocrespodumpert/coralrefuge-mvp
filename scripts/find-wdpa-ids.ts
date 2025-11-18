/**
 * WDPA ID Lookup Utility
 *
 * This script helps find WDPA IDs for Egyptian MPAs from Protected Planet
 * Run once to discover IDs, then add them to mpa-data.ts
 *
 * Setup:
 * 1. Get API token from https://api.protectedplanet.net/
 * 2. Add to .env.local: PROTECTED_PLANET_TOKEN=your_token
 * 3. Run: npx tsx scripts/find-wdpa-ids.ts
 */

import { searchProtectedAreas } from '../lib/protected-planet-api';

/**
 * List of Egyptian MPAs to search for
 */
const MPAS_TO_SEARCH = [
  'Ras Mohammed',
  'Giftun',
  'Giftun Islands',
  'Wadi El Gemal',
  'Wadi Gimal',
  'Nabq',
  'Abu Galum',
  'Abu Ghalum',
  'Tiran',
  'Sanafir',
];

/**
 * Search for an MPA and display results
 */
async function searchMPA(name: string): Promise<void> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 Searching for: "${name}"`);
  console.log('='.repeat(60));

  const results = await searchProtectedAreas(name, 'EGY');

  if (!results?.protected_areas || results.protected_areas.length === 0) {
    console.log('❌ No results found');
    return;
  }

  console.log(`✅ Found ${results.protected_areas.length} result(s):\n`);

  results.protected_areas.forEach((pa, index) => {
    console.log(`${index + 1}. ${pa.name}`);
    console.log(`   WDPA ID: ${pa.id}`);
    console.log(`   Designation: ${pa.designation}`);
    console.log(`   IUCN Category: ${pa.iucn_category || 'Not reported'}`);
    console.log(`   Marine: ${pa.marine ? 'Yes' : 'No'}`);
    console.log(`   Countries: ${pa.countries?.join(', ') || 'Not specified'}`);
    console.log();
  });
}

/**
 * Main function
 */
async function main() {
  console.log('\n🌊 Protected Planet WDPA ID Lookup');
  console.log('Finding WDPA IDs for Egyptian MPAs...\n');

  // Check if API token is configured
  const token = process.env.PROTECTED_PLANET_TOKEN || process.env.NEXT_PUBLIC_PROTECTED_PLANET_TOKEN;

  if (!token) {
    console.error('❌ ERROR: PROTECTED_PLANET_TOKEN not found in environment');
    console.error('\nSetup instructions:');
    console.error('1. Sign up at https://api.protectedplanet.net/');
    console.error('2. Get your API token');
    console.error('3. Add to .env.local:');
    console.error('   PROTECTED_PLANET_TOKEN=your_token_here');
    console.error('4. Run this script again\n');
    process.exit(1);
  }

  console.log('✅ API token found\n');

  // Search for each MPA
  for (const mpaName of MPAS_TO_SEARCH) {
    await searchMPA(mpaName);
    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Search complete!');
  console.log('='.repeat(60));
  console.log('\nNext steps:');
  console.log('1. Find the correct WDPA IDs from the results above');
  console.log('2. Update lib/mpa-data.ts with the wdpaId values');
  console.log('3. Update lib/mpa-service.ts MPA_WDPA_MAPPING with the IDs');
  console.log('4. Test the map to verify boundaries load correctly\n');
}

// Run the script
main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
