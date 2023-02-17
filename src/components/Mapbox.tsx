import { FC, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
} from "react-map-gl";

import type { SkyLayer } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl, {
  LngLatLike,
  MercatorCoordinate,
  AnyLayer,
  FillExtrusionLayer,
} from "mapbox-gl";

import GeocoderControl from "./geocoder-control";

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
import { FillPaintProps } from "maplibre-gl";

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

const osmLayer: FillExtrusionLayer = {
  id: "add-3d-buildings",
  type: "fill-extrusion",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  minzoom: 14,
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": ["get", "height"],
    "fill-extrusion-base": ["get", "min_height"],
    "fill-extrusion-opacity": 0.9,
  },
};

export const Mapbox: FC<{
  mapboxAccessToken: string | undefined;
  mapStyle: string;
  osmVisibility: boolean;
}> = ({ mapboxAccessToken, mapStyle, osmVisibility }) => {
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

  return (
    <>
      <Map
        id="my-map"
        {...viewState}
        onMove={onMoveChange}
        fog={{
          range: [-1, 15],
          "horizon-blend": 0.05,
          color: "white",
        }}
        ref={mapRef}
        onLoad={(map) => {
          map.target.addLayer(_customLayer);
        }}
        projection="globe"
        antialias={true}
        doubleClickZoom={false}
        maxPitch={85}
        minZoom={3}
        maxBounds={[
          [-141.1, 41.5],
          [-52, 83.4],
        ]}
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
        <Source id="buildings">
          <Layer {...osmLayer} />
        </Source>
        id=
        {/* {Boolean(osmVisibility) ? <Layer {...osmLayer} /> : null} */}
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
