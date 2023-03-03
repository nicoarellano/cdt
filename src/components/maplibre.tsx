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

  // THREE JS 3️⃣
  const [_customLayer, setCustomlayer]: any = useState(null);

  useEffect(() => {
    const modelOrigin: LngLatLike = [-75.69435, 45.38435];
    const modelAltitude = 15.5;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate: MercatorCoordinate =
      mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);
    const modelTransform: any = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const customLayer: any = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map: any, gl: any) {
        this.camera = new PerspectiveCamera();
        this.scene = new Scene();

        const axes = new AxesHelper(10);
        axes.renderOrder = 3;
        this.scene.add(axes);

        // create three.js lights to illuminate the model
        const lightColor = 0xffffff;
        const ambientLight = new AmbientLight(lightColor, 0.2);
        this.scene.add(ambientLight);

        const directionalLight = new DirectionalLight(lightColor, 0.9);
        directionalLight.position.set(0, -700, 600).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new DirectionalLight(lightColor, 0.9);
        directionalLight2.position.set(0, 700, 600).normalize();
        this.scene.add(directionalLight2);

        // Load multiple models -----------------------
        const gltfLoader = new GLTFLoader();
        const objects = canada.provinces.ON.cities.Ottawa.places.CDC.objects;
        let categories: any;
        if (isMobile) {
          categories = [];
          gltfLoader.load(`./assets/models/ON-Ottawa-cu-masses.glb`, (gltf) => {
            this.scene.add(gltf.scene);
          });
        } else {
          categories = ["roofs", "walls", "slabs", "curtainwalls", "windows"];
        }
        categories.forEach((category: string) => {
          for (const id in objects) {
            const bb = new Box3();
            let gltfPath = `./assets/models/cdc-glb/ON_Ottawa_CDC_${id}_${category}_allFloors.gltf`;
            gltfLoader.load(gltfPath, (gltf) => {
              if (category === "walls") {
                bb.setFromObject(gltf.scene);
                console.log(id, bb);
              }

              this.scene.add(gltf.scene);
            });
          }
        });
        //-----------------------------------------------
        // const gltfLoader = new GLTFLoader();

        const ifcLoader = new IFCLoader();
        ifcLoader.ifcManager.setWasmPath("../wasm/");

        // gltfLoader.load("./assets/models/ON-Ottawa-cu-masses.glb", (gltf) => {
        //   this.scene.add(gltf.scene);
        // });
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
        mapLib={maplibregl}
        {...viewState}
        onMove={onMoveChange}
        ref={mapRef}
        onLoad={(map) => {
          map.target.addLayer(_customLayer);
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
