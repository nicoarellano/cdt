import { FC } from "react";

import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./geocoder-control";

import type { SkyLayer } from "react-map-gl";
import { TorontoBikesMarkers } from "./toronto-bikes-markers";
import { TorontoLitterMarkers } from "./toronto-litter-markers";

const skyLayer: SkyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
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
        <NavigationControl position="bottom-left" visualizePitch={true} />
        <GeolocateControl position="bottom-left" />
        <GeocoderControl
          mapboxAccessToken={mapboxAccessToken}
          position="top-left"
        />
        <TorontoBikesMarkers />
        <TorontoLitterMarkers />
      </Map>
    </>
  );
};

export default Mapbox;
