import { FC, useRef, useState } from "react";
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

import { Three } from "../utils/three";
import { Geocoder } from "../utils/geocoder";

export const Maplibre: FC<{
  osmVisibility: boolean;
  mapStyle: string;
}> = ({ osmVisibility, mapStyle }) => {
  const mapRef: any = useRef();

  const places = canada.provinces.ON.cities.Ottawa.places;
  // const [three, setThree] = useState(Three(places.Carleton_University));
  const three = Three(places.Carleton_University);

  const geocoderControl = Geocoder();

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

  const [, setPlace]: any = useState(
    url.searchParams.get("place") ? url.searchParams.get("place") : ""
  );
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

    setPlace(url.searchParams.get("place"));
  };

  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={onMoveChange}
        ref={mapRef}
        onLoad={(map) => {
          if (geocoderControl) {
            map.target.addControl(geocoderControl);
          }
          if (three) map.target.addLayer(three);
        }}
        maxPitch={60}
        minZoom={3}
        maxBounds={[
          [-141.1, 41.5],
          [-52, 83.4],
        ]}
        mapStyle={`./assets/map/${mapStyle}.json`}
        terrain={{ source: "terrainSource", exaggeration: 0.05 }}
      >
        <Source
          id="terrainSource"
          type="raster-dem"
          url="./assets/map/terrain.json"
          tileSize={256}
        ></Source>
        <NavigationControl position="bottom-left" visualizePitch={true} />
        <GeolocateControl position="bottom-left" />
      </Map>
    </>
  );
};
