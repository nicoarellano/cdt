import { FC, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { canada } from "../utils/canada";

import Map, {
  Source,
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
} from "react-map-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import maplibregl from "maplibre-gl";

import mapboxgl, { LngLatLike, MercatorCoordinate } from "mapbox-gl";

import GeocoderControl from "./geocoder-control";
// import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
// import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";

import { UseOpenTorontoMarkers } from "../utils/use-open-toronto-markers";

import {
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  AmbientLight,
  Vector3,
  Matrix4,
  WebGLRenderer,
  Group,
  Box3,
  AxesHelper,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { IFCLoader } from "web-ifc-three";

import { Three } from "../utils/three";

const isMobile: boolean =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export const Maplibre: FC<{
  mapboxAccessToken: string | undefined;
  osmVisibility: boolean;
  mapStyle: string;
}> = ({ mapboxAccessToken, osmVisibility, mapStyle }) => {
  const mapRef: any = useRef();

  // Get shared position
  const currentUrl: string = window.location.href;
  const url = new URL(currentUrl);

  const [viewState, setViewState] = useState({
    zoom: url.searchParams.get("zoom")
      ? Number(url.searchParams.get("zoom"))
      : 11,
    bearing: url.searchParams.get("bearing")
      ? Number(url.searchParams.get("bearing"))
      : 0,
    pitch: url.searchParams.get("pitch")
      ? Number(url.searchParams.get("pitch"))
      : 0,
    longitude: url.searchParams.get("lng")
      ? Number(url.searchParams.get("lng"))
      : -75.69435,
    latitude: url.searchParams.get("lat")
      ? Number(url.searchParams.get("lat"))
      : 45.38435,
  });

  const [, setSearchParams]: any = useSearchParams();

  const onMoveChange = (event: ViewStateChangeEvent) => {
    setViewState(event.viewState);
    let currentZoom = event.viewState.zoom.toString();
    let currentBearing = event.viewState.bearing.toString();
    let currentPitch = event.viewState.pitch.toString();
    let currentLat = event.viewState.latitude.toString();
    let currentLng = event.viewState.longitude.toString();

    setSearchParams({
      zoom: currentZoom,
      bearing: currentBearing,
      pitch: currentPitch,
      lat: currentLat,
      lng: currentLng,
      province: url.searchParams.get("province")
        ? url.searchParams.get("province")
        : "",
      city: url.searchParams.get("city") ? url.searchParams.get("city") : "",
      place: url.searchParams.get("place") ? url.searchParams.get("place") : "",
    });
  };

  const place = canada.provinces.ON.cities.Ottawa.places.CDC;

  const three: any = Three(place);

  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={onMoveChange}
        ref={mapRef}
        onLoad={(map) => {
          map.target.addLayer(three);
        }}
        maxPitch={60}
        minZoom={3}
        maxBounds={[
          [-141.1, 41.5],
          [-52, 83.4],
        ]}
        // mapStyle={`./assets/map/${mapStyle}.json`} //Streets
        // mapStyle="./assets/map/satellite.json" //Google Satellite
        mapStyle={`./assets/map/${mapStyle}.json`}
        terrain={{ source: "terrainSource", exaggeration: 0.05 }}
      >
        <Source
          id="terrainSource"
          type="raster-dem"
          url="./assets/map/terrain.json"
          tileSize={256}
        ></Source>
        {/* {Boolean(osmVisibility) ? <OpenBuildings /> : null} */}
        <NavigationControl position="bottom-left" visualizePitch={true} />
        <GeolocateControl position="bottom-left" />
        <GeocoderControl
          mapboxAccessToken={mapboxAccessToken}
          position="top-left"
          country="CA"
        />
      </Map>
    </>
  );
};
