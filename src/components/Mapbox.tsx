import { FC, useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Map, {
  Source,
  NavigationControl,
  GeolocateControl,
  ViewStateChangeEvent,
  FullscreenControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl, { LngLatLike, MercatorCoordinate } from "mapbox-gl";
import GeocoderControl from "./geocoder-control";
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

import { UseOpenTorontoMarkers } from "../utils/use-open-toronto-markers";
import { Osm } from "./osmLayer";
import { Sky } from "./skyLayer";
import { TopBar } from "./topBar";

export const Mapbox: FC<{
  mapboxAccessToken: string | undefined;
  osmVisibility: boolean;
  mapStyle: string;
}> = ({ mapboxAccessToken, osmVisibility, mapStyle }) => {
  const mapRef: any = useRef();

  // Get shared position
  const currentUrl: string = window.location.href;
  const url = new URL(currentUrl);

  const [viewport, setViewport] = useState({
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

  const [, setSearchParams]: any = useSearchParams();

  const onMoveChange = (event: ViewStateChangeEvent) => {
    setViewport(event.viewState);
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
      province: url.searchParams.get("province")
        ? url.searchParams.get("province")
        : "",
      city: url.searchParams.get("city") ? url.searchParams.get("city") : "",
      place: url.searchParams.get("place") ? url.searchParams.get("place") : "",
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

        gltfLoader.load("./assets/models/ON-Ottawa-cu-masses.glb", (gltf) => {
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
        {...viewport}
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
        mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
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
        {Boolean(osmVisibility) ? <Osm /> : null}
        <Sky />
        <NavigationControl position="bottom-left" visualizePitch={true} />
        <GeolocateControl
          position="bottom-left"
          trackUserLocation={true}
          showUserHeading={true}
        />
        <GeocoderControl
          mapboxAccessToken={mapboxAccessToken}
          position="top-left"
          country="CA"
        />
        {Boolean(url.searchParams.get("city") === "Toronto") ? (
          <UseOpenTorontoMarkers
            resourceId="12ef161c-1553-43f6-8180-fed700e42912"
            limit={200}
            color="blue"
          />
        ) : null}

        {/* <UseOpenTorontoMarkers
          resourceId="6c74cc93-3814-4970-84ab-0755e845b25f"
          limit={50}
          color="yellow"
        /> */}
      </Map>
    </>
  );
};
