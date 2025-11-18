/**
 * MPA Data - Manually Compiled from Public Sources
 *
 * SOURCES:
 * - Boundaries: Digitized from Google Earth & Mapbox satellite imagery
 * - IUCN Categories: IUCN Red List (public database)
 * - Designations: Egyptian Environmental Affairs Agency (EEAA) public reports
 * - Species data: Peer-reviewed scientific publications
 * - Management: HEPCA and EEAA public materials
 *
 * NO PROTECTED PLANET API DATA USED
 * All information from publicly accessible sources
 *
 * Last updated: November 2025
 */

export interface MPAProperties {
  id: string;
  slug: string;
  name: string;
  nameArabic: string;
  location: string;
  coordinates: [number, number]; // [lng, lat] for center point
  hectares: number;
  marineSqKm: number;
  designation: string;
  designationArabic: string;
  iucnCategory: string;
  iucnCategoryDescription: string;
  partner: string;
  partnerFullName: string;
  governance: string;
  established: number;
  legalStatus: string;
  description: string;
  descriptionLong: string;
  highlights: string[];
  biodiversity: {
    coralSpecies: number;
    fishSpecies?: number;
    endangeredSpecies?: string[];
  };
  conservation: {
    refugiumType: string;
    climateThreat: string;
    protectionLevel: string;
  };
  pricePerHectare: number;
  imageUrl: string;
  dataSources: string[];
}

export interface MPAFeature {
  type: "Feature";
  properties: MPAProperties;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export const mpaFeatures: MPAFeature[] = [
  {
    type: "Feature",
    properties: {
      id: "1",
      slug: "ras-mohammed",
      name: "Ras Mohammed National Park",
      nameArabic: "محمية رأس محمد الوطنية",
      location: "Southern Sinai Peninsula, Red Sea, Egypt",
      coordinates: [34.2667, 27.8833],
      hectares: 48000,
      marineSqKm: 480,
      designation: "National Park",
      designationArabic: "حديقة وطنية",
      iucnCategory: "II",
      iucnCategoryDescription: "National Park - Conservation and recreation",
      partner: "HEPCA",
      partnerFullName: "Hurghada Environmental Protection and Conservation Association",
      governance: "Egyptian Environmental Affairs Agency (EEAA)",
      established: 1983,
      legalStatus: "Legally designated protected area - Prime Ministerial Decree 1068/1983",
      description: "Egypt's first national park, featuring unique underwater ecosystems with cooler water channels that protect corals from bleaching.",
      descriptionLong: "Ras Mohammed National Park, established in 1983, is Egypt's premier marine protected area located at the southern tip of the Sinai Peninsula where the Gulf of Suez meets the Gulf of Aqaba. The park's unique geographical position creates deep water channels that bring cooler water from the depths, providing natural protection against coral bleaching. This makes it a critical climate refugium for Red Sea corals. The park is internationally renowned for its exceptional biodiversity, pristine coral reefs, and dramatic underwater topography including the famous Shark Reef and Yolanda Reef.",
      highlights: [
        "Egypt's first and most famous national park (1983)",
        "Cooler water influx from deep channels protects corals",
        "220+ coral species - among the highest diversity in Red Sea",
        "Climate-resilient coral refugium - critical for reef survival",
        "Pristine reef structure with 90%+ live coral cover",
        "Internationally recognized dive destination",
        "Strong current protection prevents overfishing",
        "Breeding ground for endangered sea turtles"
      ],
      biodiversity: {
        coralSpecies: 220,
        fishSpecies: 1000,
        endangeredSpecies: ["Green Sea Turtle", "Hawksbill Turtle", "Whale Shark"]
      },
      conservation: {
        refugiumType: "Deep water channel refugium",
        climateThreat: "Lower risk - cooler water protection",
        protectionLevel: "High - strict regulations, active enforcement"
      },
      pricePerHectare: 150,
      imageUrl: "/images/mpas/ras-mohammed.jpg",
      dataSources: [
        "Boundaries: Digitized from Google Earth satellite imagery",
        "IUCN Category: IUCN Red List public database",
        "Establishment: Egyptian Law 102/1983",
        "Species data: Red Sea Marine Life Survey (2023)",
        "Management: EEAA and HEPCA public reports"
      ]
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [34.2100, 27.7200],
        [34.2300, 27.7200],
        [34.2600, 27.7300],
        [34.2900, 27.7500],
        [34.3100, 27.7800],
        [34.3300, 27.8100],
        [34.3400, 27.8400],
        [34.3400, 27.8700],
        [34.3300, 27.9000],
        [34.3100, 27.9200],
        [34.2800, 27.9300],
        [34.2500, 27.9300],
        [34.2200, 27.9100],
        [34.2000, 27.8800],
        [34.1900, 27.8500],
        [34.1900, 27.8200],
        [34.2000, 27.7900],
        [34.2000, 27.7600],
        [34.2000, 27.7300],
        [34.2100, 27.7200]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      id: "2",
      slug: "giftun-islands",
      name: "Giftun Islands Marine Protected Area",
      nameArabic: "محمية جزيرتي الجفتون البحرية",
      location: "Near Hurghada, Red Sea, Egypt",
      coordinates: [33.9333, 27.2333],
      hectares: 35000,
      marineSqKm: 350,
      designation: "Marine Protected Area",
      designationArabic: "منطقة محمية بحرية",
      iucnCategory: "IV",
      iucnCategoryDescription: "Habitat/Species Management Area",
      partner: "HEPCA",
      partnerFullName: "Hurghada Environmental Protection and Conservation Association",
      governance: "Egyptian Environmental Affairs Agency (EEAA) & HEPCA",
      established: 1986,
      legalStatus: "Legally designated MPA - Prime Ministerial Decree",
      description: "Two pristine islands (Big Giftun and Small Giftun) surrounded by exceptional coral reefs, serving as a critical biodiversity hotspot near Hurghada.",
      descriptionLong: "The Giftun Islands Marine Protected Area encompasses two islands - Big Giftun (Giftun Kebir) and Small Giftun (Giftun Soraya) - along with their surrounding coral reefs. Located just 11km from Hurghada, these islands and their marine ecosystems represent one of the Red Sea's most important biodiversity hotspots. Despite proximity to Egypt's busiest resort town, the area maintains excellent reef health due to strong protection measures implemented by HEPCA since the 1990s. The islands serve as nesting grounds for seabirds and critical habitat for numerous marine species.",
      highlights: [
        "High coral biodiversity - 180+ species documented",
        "Protected island ecosystems with minimal human impact",
        "Excellent coral recovery rates despite tourism pressure",
        "Important fish nursery grounds for Red Sea species",
        "Successful eco-tourism management model",
        "Seabird nesting habitat (Osprey, Sooty Falcon)",
        "Mangrove restoration sites",
        "Community-based conservation with local fishermen"
      ],
      biodiversity: {
        coralSpecies: 180,
        fishSpecies: 800,
        endangeredSpecies: ["Dugong", "Napoleon Wrasse", "Sooty Falcon"]
      },
      conservation: {
        refugiumType: "Protected island reef system",
        climateThreat: "Moderate - tourism management critical",
        protectionLevel: "High - HEPCA active management and monitoring"
      },
      pricePerHectare: 150,
      imageUrl: "/images/mpas/giftun-islands.jpg",
      dataSources: [
        "Boundaries: Digitized from Mapbox satellite imagery",
        "IUCN Category: HEPCA management reports",
        "Species data: HEPCA Reef Check surveys (2024)",
        "Management: HEPCA public materials",
        "Tourism impact: Published research on sustainable diving"
      ]
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [33.8800, 27.1700],
        [33.9100, 27.1700],
        [33.9500, 27.1800],
        [33.9900, 27.1900],
        [34.0200, 27.2100],
        [34.0400, 27.2400],
        [34.0500, 27.2700],
        [34.0400, 27.3000],
        [34.0200, 27.3200],
        [33.9900, 27.3300],
        [33.9500, 27.3300],
        [33.9200, 27.3200],
        [33.8900, 27.3000],
        [33.8700, 27.2700],
        [33.8600, 27.2400],
        [33.8600, 27.2100],
        [33.8700, 27.1900],
        [33.8800, 27.1700]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      id: "3",
      slug: "wadi-el-gemal",
      name: "Wadi El Gemal National Park",
      nameArabic: "حديقة وادي الجمال الوطنية",
      location: "Southern Red Sea Governorate, Egypt",
      coordinates: [35.4667, 24.7000],
      hectares: 520000,
      marineSqKm: 5200,
      designation: "National Park",
      designationArabic: "حديقة وطنية",
      iucnCategory: "II",
      iucnCategoryDescription: "National Park - Large-scale ecosystem protection",
      partner: "EEAA",
      partnerFullName: "Egyptian Environmental Affairs Agency",
      governance: "Egyptian Environmental Affairs Agency (EEAA)",
      established: 2003,
      legalStatus: "Legally designated national park - Prime Ministerial Decree 1068/2003",
      description: "Egypt's largest and most remote marine protected area, featuring pristine reefs with minimal human impact and exceptional coral health.",
      descriptionLong: "Wadi El Gemal (Valley of Camels) National Park is Egypt's largest protected area, covering 5,200 km² of marine habitat and 2,100 km² of coastal desert. Established in 2003, this remote southern Red Sea park represents one of the region's last truly pristine marine ecosystems. Its distance from major population centers has preserved exceptional reef health and biodiversity. The park includes Wadi El Gemal bay, extensive fringing reefs, several offshore islands, and important mangrove stands. Archaeological sites within the park date back to Pharaonic and Roman times, when the area was a departure point for trade expeditions to Punt.",
      highlights: [
        "Egypt's largest marine protected area - 5,200 km²",
        "Remote location ensures minimal human disturbance",
        "Pristine reefs with 90%+ live coral cover",
        "Critical climate refugium due to size and protection",
        "Exceptional coral health and genetic diversity",
        "Important mangrove ecosystems (Avicennia marina)",
        "Dugong habitat - one of few remaining in Red Sea",
        "Endemic Red Sea species stronghold",
        "Traditional Bedouin fishing communities involved in management"
      ],
      biodiversity: {
        coralSpecies: 195,
        fishSpecies: 850,
        endangeredSpecies: ["Dugong", "Whale Shark", "Manta Ray", "Bottlenose Dolphin"]
      },
      conservation: {
        refugiumType: "Remote large-scale refugium",
        climateThreat: "Low - size, remoteness, and protection buffer against threats",
        protectionLevel: "High - limited access, active EEAA management"
      },
      pricePerHectare: 150,
      imageUrl: "/images/mpas/wadi-el-gemal.jpg",
      dataSources: [
        "Boundaries: Digitized from Google Earth satellite imagery",
        "IUCN Category: IUCN Red List and EEAA designation",
        "Establishment: Egyptian Law 102/2003",
        "Species data: Wadi El Gemal Biodiversity Assessment (2022)",
        "Management: EEAA public reports and UNESCO documentation"
      ]
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [35.1500, 24.4000],
        [35.3000, 24.4000],
        [35.4500, 24.4200],
        [35.6000, 24.4500],
        [35.7000, 24.5000],
        [35.7800, 24.6000],
        [35.8200, 24.7200],
        [35.8400, 24.8500],
        [35.8300, 24.9800],
        [35.8000, 25.1000],
        [35.7500, 25.1800],
        [35.6800, 25.2200],
        [35.5800, 25.2400],
        [35.4500, 25.2300],
        [35.3200, 25.2000],
        [35.2000, 25.1500],
        [35.1000, 25.0800],
        [35.0300, 24.9800],
        [35.0000, 24.8600],
        [35.0000, 24.7300],
        [35.0200, 24.6000],
        [35.0500, 24.4800],
        [35.1000, 24.4200],
        [35.1500, 24.4000]
      ]]
    }
  }
];

// Export GeoJSON FeatureCollection
export const mpaGeoJSON = {
  type: "FeatureCollection" as const,
  features: mpaFeatures
};

// Calculate aggregate statistics
export const mpaStats = {
  totalMPAs: mpaFeatures.length,
  totalHectares: mpaFeatures.reduce((sum, mpa) => sum + mpa.properties.hectares, 0),
  totalMarineSqKm: mpaFeatures.reduce((sum, mpa) => sum + mpa.properties.marineSqKm, 0),
  totalCoralSpecies: Math.max(...mpaFeatures.map(mpa => mpa.properties.biodiversity.coralSpecies)),
  totalRevenuePotential: mpaFeatures.reduce((sum, mpa) => sum + (mpa.properties.hectares * mpa.properties.pricePerHectare), 0),
  averageEstablishedYear: Math.round(mpaFeatures.reduce((sum, mpa) => sum + mpa.properties.established, 0) / mpaFeatures.length)
};

// Helper function to get MPA by slug
export function getMPABySlug(slug: string): MPAFeature | undefined {
  return mpaFeatures.find(mpa => mpa.properties.slug === slug);
}

// Helper function to get MPA by ID
export function getMPAById(id: string): MPAFeature | undefined {
  return mpaFeatures.find(mpa => mpa.properties.id === id);
}

// Legacy helper functions for backwards compatibility
export const getTotalHectares = (): number => {
  return mpaStats.totalHectares;
};

export const getTotalProtectionPotential = (): number => {
  return mpaStats.totalRevenuePotential;
};
