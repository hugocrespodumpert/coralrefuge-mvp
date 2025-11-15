# Interactive Map Requirements

This document outlines the requirements for the interactive map feature to be integrated into Coral Refuge in a future phase.

## Overview

An interactive world map showing Marine Protected Areas (MPAs) in Egypt's Red Sea, allowing users to explore and select refugia for sponsorship.

## Map Features Needed

### 1. Homepage Map Integration

**Location:** Landing page between "The Solution" and "How It Works" sections

**Functionality:**
- Interactive world map showing Egypt's Red Sea region
- Click on Egypt → auto-zoom to Red Sea area
- Show 3 MPA locations as interactive pins/markers
- Smooth zoom and pan animations
- Responsive design (mobile, tablet, desktop)

### 2. MPA Pin Markers

**Each pin should display:**
- MPA name
- Location (city/region)
- Small thumbnail image
- Quick stats (hectares available, price)
- "Sponsor" button

**Pin Locations:**
1. **Ras Mohammed National Park** - 27.73°N, 34.23°E (South Sinai)
2. **Giftun Islands Protected Area** - 27.18°N, 33.93°E (Hurghada)
3. **Wadi El Gemal National Park** - 24.70°N, 35.10°E (Marsa Alam)

### 3. Interactive Popup Windows

**When user clicks on a pin:**
- Popup overlay appears with:
  - MPA hero image (large)
  - MPA name and location
  - Key stats:
    - Total area
    - Established year
    - Coral species count
    - Fish species count
    - Available hectares
    - Price per hectare
  - "Sponsor This Refuge" button
  - "Learn More" link to /mpa/[slug] page

### 4. Map Actions

**"Sponsor" button in popup:**
- Redirects to `/sponsor` page with MPA pre-selected
- Passes MPA ID via URL parameter (e.g., `/sponsor?mpa=ras-mohammed`)
- Auto-scrolls to payment form

**"Learn More" link:**
- Navigates to individual MPA detail page
- E.g., `/mpa/ras-mohammed`

## Technology Options

### Option 1: Mapbox GL JS (Recommended)

**Pros:**
- Beautiful, customizable maps
- Excellent performance
- Built-in vector tiles
- Good mobile support
- Free tier available (up to 50,000 loads/month)

**Cons:**
- Requires Mapbox API key
- Learning curve for customization

**Implementation:**
```bash
npm install mapbox-gl
```

**Code Example:**
```typescript
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize map
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [34.5, 26.5], // Red Sea center
  zoom: 6
});

// Add MPA markers
const mpas = [
  { name: 'Ras Mohammed', coordinates: [34.23, 27.73], id: 'ras-mohammed' },
  { name: 'Giftun Islands', coordinates: [33.93, 27.18], id: 'giftun-islands' },
  { name: 'Wadi El Gemal', coordinates: [35.10, 24.70], id: 'wadi-el-gemal' }
];

mpas.forEach(mpa => {
  const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h3>${mpa.name}</h3><a href="/sponsor?mpa=${mpa.id}">Sponsor</a>`);

  new mapboxgl.Marker({ color: '#00D4AA' })
    .setLngLat(mpa.coordinates)
    .setPopup(popup)
    .addTo(map);
});
```

### Option 2: Leaflet

**Pros:**
- Open source, no API key required
- Lightweight
- Large ecosystem of plugins
- Easy to learn

**Cons:**
- Less modern appearance
- Requires third-party tile provider (OpenStreetMap, etc.)
- Heavier customization needed

**Implementation:**
```bash
npm install leaflet react-leaflet
```

## Data Structure

### GeoJSON Format

Store MPA data in `/public/data/mpas.geojson`:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "ras-mohammed",
        "name": "Ras Mohammed National Park",
        "location": "South Sinai, Egypt",
        "totalArea": 48000,
        "established": 1983,
        "coralSpecies": 220,
        "fishSpecies": 1000,
        "available": 1200,
        "pricePerHectare": 50,
        "image": "/images/mpas/ras-mohammed.jpg",
        "slug": "ras-mohammed"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [34.23, 27.73]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "giftun-islands",
        "name": "Giftun Islands Protected Area",
        "location": "Hurghada, Red Sea, Egypt",
        "totalArea": 28800,
        "established": 1986,
        "coralSpecies": 196,
        "fishSpecies": 850,
        "available": 800,
        "pricePerHectare": 50,
        "image": "/images/mpas/giftun-islands.jpg",
        "slug": "giftun-islands"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [33.93, 27.18]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "wadi-el-gemal",
        "name": "Wadi El Gemal National Park",
        "location": "Marsa Alam, Red Sea, Egypt",
        "totalArea": 50000,
        "established": 2005,
        "coralSpecies": 150,
        "fishSpecies": 450,
        "available": 1500,
        "pricePerHectare": 50,
        "image": "/images/mpas/wadi-el-gemal.jpg",
        "slug": "wadi-el-gemal"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [35.10, 24.70]
      }
    }
  ]
}
```

## Design Specifications

### Map Styling

- **Pin Color:** `#00D4AA` (turquoise - matches brand)
- **Pin Size:** 40px diameter
- **Pin Icon:** Custom coral/reef icon or simple circle
- **Hover Effect:** Scale up 1.2x, show shadow
- **Active Pin:** Pulse animation

### Popup Styling

- **Width:** 320px (mobile), 400px (desktop)
- **Max Height:** 600px
- **Background:** White with subtle shadow
- **Border Radius:** 16px
- **Padding:** 24px
- **Image Aspect Ratio:** 16:9
- **Font:** Inter (consistent with site)
- **CTA Button:** Coral color (`#FF6B6B`), full width, bold

### Responsive Behavior

**Mobile (< 768px):**
- Map height: 400px
- Popups appear as bottom sheets (full-width overlays)
- Touch-friendly pin sizes (44px minimum)
- Single-finger pan, pinch to zoom

**Tablet (768px - 1024px):**
- Map height: 500px
- Standard popup positioning
- Touch and mouse support

**Desktop (> 1024px):**
- Map height: 600px
- Hover effects on pins
- Popup positioned relative to pin

## Integration Points

### 1. Homepage Component

Create `/components/MPAMap.tsx`:
- Self-contained map component
- Accepts MPA data as props
- Emits events for user interactions

### 2. Sponsor Page Pre-selection

Update `/app/sponsor/page.tsx` to:
- Accept `?mpa=<mpa-id>` URL parameter
- Auto-select MPA if parameter present
- Scroll to selected MPA card

### 3. Data Fetching

Options:
- **Static:** Load from GeoJSON file in `/public/data/`
- **Dynamic:** Fetch from API endpoint `/api/mpas`
- **Hybrid:** Static GeoJSON + dynamic availability updates

## Future Enhancements

### Phase 2 (Future):
- Show sponsored hectares on map (visual overlay)
- Filter by available vs. fully sponsored
- Heatmap of protection levels
- Time-lapse of sponsorship growth

### Phase 3 (Future):
- 3D terrain view
- Satellite imagery toggle
- Coral health data visualization
- Real-time monitoring data

### Phase 4 (Future):
- Global expansion - add more countries
- Climate projections overlay
- Migration corridors
- Biodiversity hotspots

## API Requirements

### Optional: Protected Planet API Integration

For live MPA boundary data:
- API: https://www.protectedplanet.net/en/developers
- Free tier available
- Provides official MPA boundaries
- Updates automatically

**Example API call:**
```bash
GET https://api.protectedplanet.net/v3/protected_areas/search?name=Ras%20Mohammed
```

## Accessibility Requirements

- Keyboard navigation support
- Screen reader compatible
- ARIA labels for all interactive elements
- High contrast mode support
- Focus indicators on pins/buttons
- Alt text for all images

## Performance Targets

- Initial map load: < 2 seconds
- Pin interaction: < 100ms
- Smooth animations: 60fps
- Mobile data usage: < 500KB (initial load)

## Testing Checklist

- [ ] Map loads correctly on all devices
- [ ] All 3 MPA pins appear in correct locations
- [ ] Click/tap on pin opens popup
- [ ] Popup displays all required information
- [ ] "Sponsor" button redirects correctly
- [ ] "Learn More" link navigates to MPA page
- [ ] Zoom controls work
- [ ] Pan/drag works smoothly
- [ ] Popup closes when clicking outside
- [ ] Mobile responsive behavior works
- [ ] Keyboard navigation functional
- [ ] Screen reader announces pins correctly

## Development Timeline

**Estimated: 12-16 hours**

1. **Setup & Configuration (2 hours)**
   - Install Mapbox GL JS
   - Configure API keys
   - Create base map component

2. **MPA Markers & Data (3 hours)**
   - Create GeoJSON data file
   - Add markers to map
   - Implement pin styling

3. **Popup Windows (4 hours)**
   - Design popup component
   - Fetch and display MPA data
   - Add CTA buttons with routing

4. **Homepage Integration (2 hours)**
   - Add map to landing page
   - Style and position
   - Test responsiveness

5. **Sponsor Page Integration (2 hours)**
   - Add URL parameter support
   - Implement auto-selection
   - Test user flow

6. **Testing & Polish (3 hours)**
   - Cross-browser testing
   - Mobile testing
   - Accessibility audit
   - Performance optimization

## Resources

- **Mapbox Documentation:** https://docs.mapbox.com/mapbox-gl-js/
- **Allen Coral Atlas:** https://allencoralatlas.org/ (for reef mapping reference)
- **Protected Planet:** https://www.protectedplanet.net/
- **50 Reefs Initiative:** https://50reefs.org/

## Notes

- Keep map implementation separate from core sponsorship flow
- Ensure map is optional - site should work without it
- Consider static map image as fallback for slow connections
- Cache map tiles for better performance
- Monitor Mapbox API usage to stay within free tier

---

**Last Updated:** November 2024
**Status:** Documentation Only - Implementation Pending
