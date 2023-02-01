import { FC } from "react";

import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
// import { useMapContext } from "../user-provider";

import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./geocoder-control";

import type { SkyLayer } from "react-map-gl";
import { UseOpenTorontoMarkers } from "../utils/use-open-toronto-markers";

const skyLayer: SkyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
  },
};

// [mapStyle] = useMapContext("satellite");

// LOAD OSM BUILDING 🏢
const osmLayer: any = {
  id: "OSM-buildings",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 11,
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": ["get", "height"],
    "fill-extrusion-base": ["get", "min_height"],
    "fill-extrusion-opacity": 0.9,
  },
};

export const Mapbox: FC<{ mapboxAccessToken: any }> = (props) => {
  const { mapboxAccessToken } = props;
  return (
    <>
      <Map
        initialViewState={{
          latitude: 56.415,
          longitude: -98.74,
          zoom: 4,
          bearing: 0,
          pitch: 0,
        }}
        projection="globe"
        antialias={true}
        doubleClickZoom={false}
        maxPitch={85}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxAccessToken={mapboxAccessToken}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />
        <Layer {...osmLayer} />
        <NavigationControl position="bottom-left" visualizePitch={true} />
        <GeolocateControl position="bottom-left" />
        <GeocoderControl
          mapboxAccessToken={mapboxAccessToken}
          position="top-left"
        />
        <UseOpenTorontoMarkers
          resourceId="12ef161c-1553-43f6-8180-fed700e42912"
          limit={50}
          color="blue"
        />
        <UseOpenTorontoMarkers
          resourceId="6c74cc93-3814-4970-84ab-0755e845b25f"
          limit={50}
          color="yellow"
        />
      </Map>
    </>
  );
};

export default Mapbox;
