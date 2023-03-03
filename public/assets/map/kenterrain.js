{
    version: 8,
    sources: {
    osm: {
    type: 'raster',
    tiles: ['https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'],
    tileSize: 256,
    attribution: '&copy; OpenStreetMap Contributors',
    maxzoom: 19
    },
    terrainSource: {
    type: 'raster-dem',
    url: "terrain/terrain.json",
    // url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
    tileSize: 256
    },
    hillshadeSource: {
    type: 'raster-dem',
    url: "terrain/hillshade.json",
    // url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
    tileSize: 256
    }
    },
    layers: [
    {
    id: 'osm',
    type: 'raster',
    source: 'osm'
    },
    {
    id: 'hills',
    type: 'hillshade',
    source: 'hillshadeSource',
    layout: { visibility: 'visible' },
    paint: { 'hillshade-shadow-color': '#473B24' }
    }
    ],
    terrain: {
    source: 'terrainSource',
    exaggeration: 0.08
    }
    }