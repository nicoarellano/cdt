import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
} from "react-map-gl";
// import ModelLayer from "./model-layer";

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

// LOAD THREE 🏢
// const modelLayer: any = {
//   id: "layer-3d",
//   url: "./src/assets/models/ON-Ottawa-cu-masses.glb",
//   origin: [45.38435, -75.69435],
//   altitude: 80,
//   rotateY: 1,
//   scale: 1,
// };

/*
coordinates: {
  lat: 45.38435,
  lng: -75.69435,
  msl: 80,
map.on("load", () => {
  map.addControl(new mapboxgl.NavigationControl());
  map.addLayer(
    new ModelLayer({
      id: "layer-3d",
      url: "./model.glb",
      origin: [30.519551776681, 50.428953714395],
      altitude: 26.3,
      rotateY: 1,
      scale: 34.8
    })
  );
});
*/

export const Mapbox: FC<{ mapboxAccessToken: any; mapStyle: string }> = ({
  mapboxAccessToken,
  mapStyle = "satellite-streets-v11",
}) => {
  // Get shared position
  const currentUrl: string = window.location.href;
  const url = new URL(currentUrl);

  let lng = Number(url.searchParams.get("lng"));
  lng = Boolean(lng) ? lng : -98.74;
  let lat = Number(url.searchParams.get("lat"));
  lat = Boolean(lat) ? lat : 56.415;
  let zoom = Number(url.searchParams.get("zoom"));
  zoom = Boolean(zoom) ? zoom : 4;
  let bearing = Number(url.searchParams.get("bearing"));
  let pitch = Number(url.searchParams.get("pitch"));

  const mainUrl = `${url.origin}${url.pathname}`;

  // const { mapboxAccessToken } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const onMoveChange = (event: ViewStateChangeEvent) => {
    let lat = event.viewState.latitude.toString();
    let lng = event.viewState.longitude.toString();
    let zoom = event.viewState.zoom.toString();
    let bearing = event.viewState.bearing.toString();
    let pitch = event.viewState.pitch.toString();

    setSearchParams({
      lng: lng,
      lat: lat,
      zoom: zoom,
      bearing: bearing,
      pitch: pitch,
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
          bearing: bearing,
          pitch: pitch,
        }}
        onMove={onMoveChange}
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
        />
        <Layer {...skyLayer} />
        <Layer {...osmLayer} />
        {/* <Layer {...modelLayer} /> */}
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
