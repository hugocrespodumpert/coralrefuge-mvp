/**
 * Marine Protected Area (MPA) Data for Coral Refuge
 *
 * Phase 1-2: Placeholder rectangular boundaries (fallback data)
 * Phase 3: Enhanced with Protected Planet API integration
 *
 * This data serves as:
 * 1. Fallback when Protected Planet API is unavailable
 * 2. Base data structure enhanced with official WDPA data
 * 3. Mapping of local slugs to WDPA IDs
 *
 * WDPA Source: World Database on Protected Areas (UNEP-WCMC)
 * https://protectedplanet.net
 */

export interface MPAFeature {
  type: "Feature";
  properties: {
    id: string;
    slug: string;
    name: string;
    wdpaId?: number; // World Database on Protected Areas ID
    hectares: number;
    designation: string;
    partner: string;
    description: string;
    pricePerHectare: number;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export interface MPAGeoJSON {
  type: "FeatureCollection";
  features: MPAFeature[];
}

export const mpaFeatures: MPAFeature[] = [
  {
    type: "Feature",
    properties: {
      id: "1",
      slug: "ras-mohammed",
      name: "Ras Mohammed National Park",
      wdpaId: 2332, // Confirmed WDPA ID from Protected Planet
      hectares: 480,
      designation: "National Park",
      partner: "HEPCA",
      description: "Egypt's first national park, featuring unique underwater ecosystems with cooler water channels that protect corals from bleaching.",
      pricePerHectare: 50
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [34.2167, 27.7500],
        [34.3167, 27.7500],
        [34.3167, 27.8833],
        [34.2667, 27.9000],
        [34.2167, 27.8833],
        [34.2167, 27.7500]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      id: "2",
      slug: "giftun-islands",
      name: "Giftun Islands",
      wdpaId: undefined, // To be looked up via Protected Planet search
      hectares: 350,
      designation: "Marine Protected Area",
      partner: "HEPCA",
      description: "Biodiversity hotspot with pristine reefs surrounding protected islands near Hurghada.",
      pricePerHectare: 50
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [33.8833, 27.1833],
        [33.9833, 27.1833],
        [33.9833, 27.2833],
        [33.8833, 27.2833],
        [33.8833, 27.1833]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      id: "3",
      slug: "wadi-el-gemal",
      name: "Wadi El Gemal National Park",
      wdpaId: undefined, // To be looked up via Protected Planet search
      hectares: 5200,
      designation: "National Park",
      partner: "EEAA",
      description: "Egypt's largest marine protected area in the southern Red Sea, featuring pristine reefs and critical refugia.",
      pricePerHectare: 50
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [35.3667, 24.6000],
        [35.5667, 24.6000],
        [35.5667, 24.8000],
        [35.3667, 24.8000],
        [35.3667, 24.6000]
      ]]
    }
  }
];

export const mpaGeoJSON: MPAGeoJSON = {
  type: "FeatureCollection",
  features: mpaFeatures
};

// Utility function to calculate total hectares
export const getTotalHectares = (): number => {
  return mpaFeatures.reduce((sum, feature) => sum + feature.properties.hectares, 0);
};

// Utility function to calculate total protection potential (in dollars)
export const getTotalProtectionPotential = (): number => {
  return mpaFeatures.reduce(
    (sum, feature) => sum + (feature.properties.hectares * feature.properties.pricePerHectare),
    0
  );
};
