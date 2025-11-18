# Coral Refuge Interactive Map - Phase 2 Documentation

## Overview

Phase 2 adds the Allen Coral Atlas coral cover overlay to the interactive map, allowing users to visualize live coral distribution within Marine Protected Areas.

## What Was Built

### New Features

1. **Allen Coral Atlas WMS Integration**
   - Live coral cover data overlay
   - High-resolution benthic habitat mapping
   - Transparent raster layer over satellite imagery

2. **Interactive Toggle Controls**
   - Show/Hide buttons to toggle coral layer visibility
   - Opacity slider (0-100%) for adjusting transparency
   - Collapsible control panel
   - Loading states during layer transitions

3. **Color Legend**
   - Visual guide showing coral cover classifications
   - Colors: Live Coral (pink/purple), Rock (gray), Sand (white), Rubble (brown)
   - Attribution to Allen Coral Atlas
   - Collapsible panel
   - Only visible when coral layer is active

4. **Responsive Design**
   - Desktop: Fixed position controls (bottom-right)
   - Mobile: Touch-friendly sliders with larger hit targets
   - Collapsible panels to save screen space

## Technical Implementation

### New Files Created

1. **`/components/CoralToggleControl.tsx`**
   - Toggle buttons (Show/Hide)
   - Opacity slider with live feedback
   - Collapsible panel
   - Loading state indicator
   - Link to Allen Coral Atlas website

2. **`/components/CoralLegend.tsx`**
   - Color-coded legend items
   - Collapsible panel
   - Attribution links
   - Conditional rendering (only when coral layer visible)

3. **`/docs/MAP_PHASE_2.md`** - This documentation

### Modified Files

1. **`/components/Map.tsx`**
   - Added Allen Coral Atlas WMS source
   - Added coral-cover raster layer
   - State management for visibility and opacity
   - Toggle and opacity control functions
   - Imported and rendered new control components

## Allen Coral Atlas Integration

### WMS Service Details

**Service URL**: `https://allencoralatlas.org/geoserver/wms`

**Layer**: `allen_coral_atlas:benthic`

**Parameters**:
- Service: WMS
- Version: 1.1.1
- Format: image/png
- Transparent: true
- SRS: EPSG:3857
- Tile Size: 256x256

**No API Key Required** - Free service with attribution

### Data Coverage

Allen Coral Atlas provides benthic habitat maps showing:
- **Live Coral**: Pink/purple colors
- **Rock/Substrate**: Gray/brown colors
- **Sand**: White/beige colors
- **Rubble**: Mixed earth tones

Coverage includes the Egyptian Red Sea region with high-resolution satellite-derived classification.

## Layer Architecture

### Layer Order (Bottom to Top)

1. **Satellite Base Map** (Mapbox satellite-streets-v12)
2. **Coral Cover Layer** (Allen Coral Atlas WMS) ← Added in Phase 2
3. **MPA Fill Polygons** (Blue with transparency)
4. **MPA Border Lines** (Blue borders)

This ordering ensures:
- Coral data appears over satellite imagery
- MPA polygons remain visible and interactive
- MPA borders stay on top for clarity

## User Experience Flow

1. User opens map → Sees MPA polygons over satellite
2. Notices "🪸 Coral Cover" control in bottom-right
3. Clicks "Show" → Coral layer fades in (300ms transition)
4. Legend appears in bottom-left showing color meanings
5. User adjusts opacity slider to see underlying satellite
6. Zooms in to see detailed coral distribution within MPAs
7. Can toggle layer off/on as needed

## State Management

### React State

```typescript
const [coralVisible, setCoralVisible] = useState(false); // Default: hidden
const [coralOpacity, setCoralOpacity] = useState(0.6);   // Default: 60%
const [coralLoading, setCoralLoading] = useState(false); // Loading indicator
```

### Toggle Function

```typescript
const toggleCoralLayer = (visible: boolean) => {
  setCoralVisible(visible);
  map.setLayoutProperty('coral-cover', 'visibility', visible ? 'visible' : 'none');
};
```

### Opacity Function

```typescript
const updateCoralOpacity = (opacity: number) => {
  setCoralOpacity(opacity);
  map.setPaintProperty('coral-cover', 'raster-opacity', opacity);
};
```

## Responsive Design

### Desktop (≥640px)
- Controls: Bottom-right, fixed position
- Legend: Bottom-left, fixed position
- Slider thumb: 16px diameter
- Expanded by default

### Mobile (<640px)
- Controls: Same position, touch-optimized
- Legend: Same position, smaller footprint
- Slider thumb: 20px diameter (larger for touch)
- Collapsible to save screen space

## Performance Optimizations

1. **Lazy Loading**: Coral layer loads on demand (only when "Show" clicked)
2. **Tile Caching**: Browser caches WMS tiles automatically
3. **Fade Duration**: 300ms fade prevents jarring transitions
4. **Initial State**: Layer hidden by default (reduces initial load)
5. **Error Handling**: Graceful fallback if WMS service unavailable

## Testing

### Success Criteria

After Phase 2 implementation, verify:
- ✅ Click "Show" → Coral layer appears over satellite
- ✅ Opacity slider adjusts transparency smoothly (0-100%)
- ✅ Click "Hide" → Coral layer disappears
- ✅ Legend shows when coral layer visible
- ✅ Legend colors match actual coral atlas display
- ✅ MPA polygon borders stay on top of coral layer
- ✅ Controls work on mobile (touch-friendly)
- ✅ Layer loads within 2-3 seconds
- ✅ Attribution displayed correctly
- ✅ No console errors

### Test Scenarios

1. **Basic Toggle**
   - Click "Show" → Layer appears
   - Click "Hide" → Layer disappears
   - Toggle multiple times → No memory leaks

2. **Opacity Control**
   - Drag slider left → Opacity decreases
   - Drag slider right → Opacity increases
   - Set to 0% → Layer invisible but still active
   - Set to 100% → Coral fully opaque

3. **Legend Visibility**
   - Coral hidden → Legend hidden
   - Coral visible → Legend visible
   - Click collapse arrow → Panel minimizes

4. **Mobile Responsiveness**
   - Open on mobile device
   - Touch slider → Responds smoothly
   - Panels fit within viewport
   - No horizontal scrolling

5. **Zoom Behavior**
   - Zoom in → See detailed coral patterns
   - Zoom out → See regional coral distribution
   - Pan around → Tiles load smoothly

6. **Network Conditions**
   - Fast connection → Instant loading
   - Slow connection → Shows loading indicator
   - Offline → Graceful error (cached tiles may work)

## Known Limitations

1. **WMS Service Dependency**: Relies on Allen Coral Atlas uptime
   - If service down, coral layer won't load
   - No offline fallback currently

2. **Data Coverage**: Allen Coral Atlas covers major reef regions
   - Some remote MPAs may have limited or no data
   - Data resolution varies by region

3. **Update Frequency**: Coral data may be several years old
   - Not real-time monitoring
   - Updates depend on Allen Coral Atlas schedule

4. **Mobile Data Usage**: WMS tiles can be large
   - Users on limited data plans may want to avoid
   - Consider adding data usage warning in future

## Browser Compatibility

**Supported**:
- Chrome/Edge 79+ ✅
- Firefox 70+ ✅
- Safari 13+ ✅
- Mobile Safari (iOS 13+) ✅
- Chrome Mobile ✅

**Requirements**:
- WebGL support (for Mapbox base map)
- JavaScript ES6+
- CSS Grid/Flexbox

## Attribution

Allen Coral Atlas attribution is displayed in:
1. Map attribution control (bottom-right)
2. Control panel info text
3. Legend attribution section

**Required Attribution**: "© Allen Coral Atlas"

**Learn More**: [https://allencoralatlas.org](https://allencoralatlas.org)

## Troubleshooting

### Coral Layer Won't Show

**Problem**: Click "Show" but nothing appears

**Solutions**:
1. Check browser console for errors
2. Verify internet connection
3. Try zooming to Egypt Red Sea region
4. Check if Allen Coral Atlas service is operational
5. Wait a few seconds for tiles to load

### Tiles Loading Slowly

**Problem**: Coral layer takes long to appear

**Solutions**:
1. Check internet connection speed
2. Reduce zoom level temporarily
3. Allen Coral Atlas WMS may be under heavy load
4. Try again later

### Slider Not Responding

**Problem**: Opacity slider doesn't move

**Solutions**:
1. Ensure coral layer is visible (slider only works when shown)
2. Try clicking slider track instead of dragging
3. Check browser console for JavaScript errors
4. Refresh page and try again

### Legend Colors Don't Match

**Problem**: Legend colors seem different from map

**Solutions**:
1. Adjust opacity slider to see colors better
2. Zoom in for more detailed view
3. Colors vary by region and depth
4. Compare with allencoralatlas.org for reference

## File Structure

```
coralrefuge-mvp/
├── components/
│   ├── Map.tsx                    # Updated with coral layer
│   ├── CoralToggleControl.tsx     # New toggle control
│   └── CoralLegend.tsx           # New legend component
├── docs/
│   ├── MAP_PHASE_1.md            # Phase 1 docs
│   └── MAP_PHASE_2.md            # This file
└── app/map/page.tsx              # Map page (unchanged)
```

## What's Next - Phase 3

Phase 3 will integrate real MPA polygon data from the Protected Planet API, replacing the current placeholder rectangular boundaries.

**Planned Features**:
- Fetch MPA boundaries from Protected Planet
- Dynamic loading of MPA data
- Expand beyond initial 3 MPAs
- Search and filter functionality
- More accurate polygon shapes

**Estimated**: 4-5 hours

## Resources

- [Allen Coral Atlas Official Site](https://allencoralatlas.org/)
- [Allen Coral Atlas API Documentation](https://allencoralatlas.org/atlas/)
- [Mapbox Raster Layer Documentation](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#raster)
- [WMS Specification](https://www.ogc.org/standards/wms)
- [Phase 1 Documentation](./MAP_PHASE_1.md)

## Support

For issues specific to Phase 2:
1. Check this documentation
2. Review browser console for errors
3. Verify Allen Coral Atlas service is operational
4. Test with different zoom levels and regions
5. Check network tab for WMS tile requests

---

**Phase 2 Status**: ✅ Complete
**Built**: 2025-11-18
**Dependencies**: Phase 1 (Base map with MPA polygons)
**Next Phase**: Phase 3 - Protected Planet API Integration
