/**
 * TypeScript types for Protected Planet API
 * API Documentation: https://api.protectedplanet.net/documentation
 */

export type IUCNCategory =
  | 'Ia'  // Strict Nature Reserve
  | 'Ib'  // Wilderness Area
  | 'II'  // National Park
  | 'III' // Natural Monument
  | 'IV'  // Habitat/Species Management Area
  | 'V'   // Protected Landscape/Seascape
  | 'VI'  // Protected Area with sustainable use
  | 'Not Reported'
  | 'Not Applicable';

export interface ProtectedAreaGeometry {
  type: 'Polygon' | 'MultiPolygon' | 'Point' | 'LineString';
  coordinates: number[][][] | number[][][][];
}

export interface ProtectedAreaGeoJSON {
  type: 'Feature';
  geometry: ProtectedAreaGeometry;
  properties?: Record<string, any>;
}

export interface ProtectedAreaProperties {
  id: number;
  name: string;
  original_name?: string;
  designation: string;
  designation_eng?: string;
  designation_type?: string;
  iucn_category?: IUCNCategory;
  marine: boolean;
  reported_marine_area_km2?: number;
  reported_area_km2?: number;
  no_take_area_km2?: number;
  governance_type?: string;
  management_authority?: string;
  management_plan?: string;
  legal_status?: string;
  legal_status_updated_at?: string;
  countries?: string[];
  iso3?: string;
  sub_locations?: string[];
}

export interface ProtectedPlanetResponse {
  protected_area: {
    id: number;
    name: string;
    original_name?: string;
    designation: string;
    designation_eng?: string;
    designation_type?: string;
    iucn_category?: IUCNCategory;
    marine: boolean;
    reported_marine_area_km2?: number;
    reported_area_km2?: number;
    no_take_area_km2?: number;
    governance_type?: string;
    management_authority?: string;
    management_plan?: string;
    legal_status?: string;
    legal_status_updated_at?: string;
    countries?: string[];
    iso3?: string;
    geojson?: ProtectedAreaGeoJSON;
  };
}

export interface ProtectedPlanetSearchResult {
  id: number;
  name: string;
  designation: string;
  iucn_category?: IUCNCategory;
  marine: boolean;
  countries?: string[];
}

export interface ProtectedPlanetSearchResponse {
  protected_areas: ProtectedPlanetSearchResult[];
  page?: number;
  per_page?: number;
  total?: number;
}

export interface EnhancedMPAMetadata {
  wdpaId?: number;
  marineArea?: number;
  established?: string;
  legalStatus?: string;
  managementAuthority?: string;
  iucnCategory?: IUCNCategory;
  governance?: string;
  dataSource: 'protected_planet' | 'fallback';
  fetchedAt?: string;
}
