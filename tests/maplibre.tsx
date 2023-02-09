import { FC, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
} from "react-map-gl";

// import mapboxgl, { LngLatLike, MercatorCoordinate, AnyLayer } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "../src/components/geocoder-control";

import type { SkyLayer } from "react-map-gl";
import { UseOpenTorontoMarkers } from "../src/utils/use-open-toronto-markers";

const skyLayer: SkyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
  },
};

// LOAD OSM BUILDING 🏢
const osmLayer: any = {
  id: "OSM-buildings",
  source: "composite",
  "source-layer": "building",
  type: "fill-extrusion",
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": ["get", "height"],
    "fill-extrusion-base": ["get", "min_height"],
    "fill-extrusion-opacity": 0.9,
  },
};

export const Maplibre: FC<{
  mapStyle: string;
}> = ({ mapStyle }) => {
  // Get shared position
  const currentUrl: string = window.location.href;
  const url = new URL(currentUrl);
  const mapRef: any = useRef();

  let lng = Number(url.searchParams.get("lng"));
  lng = Boolean(lng) ? lng : -98.74;
  let lat = Number(url.searchParams.get("lat"));
  lat = Boolean(lat) ? lat : 56.415;
  let zoom = Number(url.searchParams.get("zoom"));
  zoom = Boolean(zoom) ? zoom : 4;
  let bearing = Number(url.searchParams.get("bearing"));
  let pitch = Number(url.searchParams.get("pitch"));

  // const mainUrl = `${url.origin}${url.pathname}`;
  const [, setSearchParams] = useSearchParams();

  const onMapLoad = React.useCallback(() => {
    mapRef.current.on("move", () => {
      // do something
    });
  }, []);

  return (
    <>
      <Map
        id="my-map"
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
          bearing: bearing,
          pitch: pitch,
        }}
        fog={{
          range: [-1, 15],
          "horizon-blend": 0.05,
          color: "white",
        }}
        ref={mapRef}
        onLoad={onMapLoad}
        // onMove={onMoveChange}
        projection="globe"
        antialias={true}
        doubleClickZoom={false}
        maxPitch={85}
        mapStyle={mapStyle}
        mapboxAccessToken={mapboxAccessToken}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        ></Source>
        <Layer {...osmLayer} />
        <Layer {...skyLayer} />
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
