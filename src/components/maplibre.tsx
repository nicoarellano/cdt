import { FC, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Map, {
  Source,
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
  useMap,
} from "react-map-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import maplibregl from "maplibre-gl";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";

import mapboxgl, { LngLatLike, MercatorCoordinate } from "mapbox-gl";

// import GeocoderControl from "./geocoder-control";

import { UseOpenTorontoMarkers } from "../utils/use-open-toronto-markers";

import {
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  Vector3,
  Matrix4,
  WebGLRenderer,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { IFCLoader } from "web-ifc-three";
import { OpenBuildings } from "./openBuildings";
import { Sky } from "./skyLayer";
import { Osm } from "./osmLayer";

export const Maplibre: FC<{
  mapboxAccessToken: string | undefined;
  osmVisibility: boolean;
  mapStyle?: string;
}> = ({ mapboxAccessToken, osmVisibility, mapStyle }) => {
  const mapRef: any = useRef();

  // Get shared position
  const currentUrl: string = window.location.href;
  const url = new URL(currentUrl);

  const [viewState, setViewState] = useState({
    longitude: url.searchParams.get("lng")
      ? Number(url.searchParams.get("lng"))
      : -75.69435,
    latitude: url.searchParams.get("lat")
      ? Number(url.searchParams.get("lat"))
      : 45.38435,
    zoom: url.searchParams.get("zoom")
      ? Number(url.searchParams.get("zoom"))
      : 11,
    bearing: url.searchParams.get("bearing")
      ? Number(url.searchParams.get("bearing"))
      : 0,
    pitch: url.searchParams.get("pitch")
      ? Number(url.searchParams.get("pitch"))
      : 0,
  });

  const [, setSearchParams] = useSearchParams();

  const onMoveChange = (event: ViewStateChangeEvent) => {
    setViewState(event.viewState);
    let currentLat = event.viewState.latitude.toString();
    let currentLng = event.viewState.longitude.toString();
    let currentZoom = event.viewState.zoom.toString();
    let currentBearing = event.viewState.bearing.toString();
    let currentPitch = event.viewState.pitch.toString();

    setSearchParams({
      lat: currentLat,
      lng: currentLng,
      zoom: currentZoom,
      bearing: currentBearing,
      pitch: currentPitch,
    });
  };

  // THREE JS 3️⃣
  const [_customLayer, setCustomlayer]: any = useState(null);

  useEffect(() => {
    const modelOrigin: LngLatLike = [-75.69435, 45.38435];
    const modelAltitude = 115;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate: MercatorCoordinate =
      mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform: any = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since the 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const customLayer: any = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map: any, gl: any) {
        this.camera = new PerspectiveCamera();
        this.scene = new Scene();
        const directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const gltfLoader = new GLTFLoader();
        const ifcLoader = new IFCLoader();
        ifcLoader.ifcManager.setWasmPath("../wasm/");

        gltfLoader.load("./ON-Ottawa-cu-masses.glb", (gltf) => {
          this.scene.add(gltf.scene);
        });
        this.map = map;

        this.renderer = new WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl: any, matrix: any) {
        const rotationX = new Matrix4().makeRotationAxis(
          new Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new Matrix4().makeRotationAxis(
          new Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new Matrix4().makeRotationAxis(
          new Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new Matrix4().fromArray(matrix);
        const l = new Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };
    setCustomlayer(customLayer);
  }, []);

  let geocoder_api = {
    forwardGeocode: async (config: any) => {
      const features = [];
      try {
        let request =
          "https://nominatim.openstreetmap.org/search?q=" +
          config.query +
          "&format=geojson&polygon_geojson=1&addressdetails=1";
        const response = await fetch(request);
        const geojson = await response.json();
        for (let feature of geojson.features) {
          let center = [
            feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
            feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
          ];
          let point = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: center,
            },
            place_name: feature.properties.display_name,
            properties: feature.properties,
            text: feature.properties.display_name,
            place_type: ["place"],
            center: center,
          };
          features.push(point);
        }
      } catch (e) {
        console.error(`Failed to forwardGeocode with error: ${e}`);
      }

      return {
        features: features,
      };
    },
  };

  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={onMoveChange}
        ref={mapRef}
        maxPitch={85}
        mapStyle="https://api.maptiler.com/maps/bright/style.json?key=q54cDjzBUzfxYseOWe5v"
        // mapStyle={`https://api.maptiler.com/maps/${mapStyle}/style.json?key=q54cDjzBUzfxYseOWe5v`}

        onLoad={(map) => {
          map.target.addLayer(_customLayer);
          let layers = map.target.getStyle().layers;

          // map.target.addControl(
          //   new MaplibreGeocoder(geocoder_api, {
          //     maplibregl: maplibregl,
          //   })
          // );

          let labelLayerId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === "symbol") {
              labelLayerId = layers[i].id;
              break;
            }
          }

          map.target.addLayer(
            {
              id: "3d-buildings",
              source: "openmaptiles",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 15,
              paint: {
                "fill-extrusion-color": "#f00",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "height"],
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.6,
              },
            },
            labelLayerId
          );
        }}
      >
        {/* <OpenBuildings /> */}
        {Boolean(osmVisibility) ? <OpenBuildings /> : null}
        {/* {Boolean(osmVisibility) ? <Osm /> : null} */}
        <NavigationControl position="bottom-left" visualizePitch={true} />
        <GeolocateControl position="bottom-left" />
        {/* <GeocoderControl
          mapboxAccessToken={mapboxAccessToken}
          position="top-left"
        /> */}
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
