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

import mapboxgl, { LngLatLike, MercatorCoordinate, AnyLayer } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./geocoder-control";

import { UseOpenTorontoMarkers } from "../utils/use-open-toronto-markers";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

export const Mapbox: FC<{
  mapboxAccessToken: any;
  mapStyle: string;
  osmVisibility: boolean;
}> = ({ mapboxAccessToken, mapStyle, osmVisibility }) => {
  // Get shared position
  const currentUrl: string = window.location.href;
  const url = new URL(currentUrl);
  const mapRef: any = useRef();

  let lng = Number(url.searchParams.get("lng"));
  lng = Boolean(lng) ? lng : -75.7003243105428;
  let lat = Number(url.searchParams.get("lat"));
  lat = Boolean(lat) ? lat : 45.38051079589255;
  let zoom = Number(url.searchParams.get("zoom"));
  zoom = Boolean(zoom) ? zoom : 14;
  let bearing = Number(url.searchParams.get("bearing"));
  let pitch = Number(url.searchParams.get("pitch"));

  // const mainUrl = `${url.origin}${url.pathname}`;
  const [, setSearchParams] = useSearchParams();

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

  // const onMoveChange = useCallback(()=>{
  //   mapRef.current.on('move', () => {
  //           (event: ViewStateChangeEvent) => {
  //   let lat = event.viewState.latitude.toString();
  //   let lng = event.viewState.longitude.toString();
  //   let zoom = event.viewState.zoom.toString();
  //   let bearing = event.viewState.bearing.toString();
  //   let pitch = event.viewState.pitch.toString();

  //   setSearchParams({
  //     lng: lng,
  //     lat: lat,
  //     zoom: zoom,
  //     bearing: bearing,
  //     pitch: pitch,
  //   });
  // };
  //   })

  // })

  // const [lng, setLng] = useState(32.866287);
  // const [lat, setLang] = useState(39.925533);
  // const [zoom, setZoom] = useState(20);

  const [_customLayer, setCustomlayer]: any = useState(null);

  useEffect(() => {
    const modelOrigin: LngLatLike = [-75.6945467664462, 45.384566477004036];
    const modelAltitude = 100;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

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

    const THREE = window.THREE;

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer: any = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map: any, gl: any) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const loader = new GLTFLoader();
        loader.load("./ON-Ottawa-cu-masses.glb", (gltf) => {
          this.scene.add(gltf.scene);
        });
        this.map = map;

        console.log("model loaded complete", this.scene);

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl: any, matrix: any) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
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
        onLoad={(map) => {
          map.target.addLayer(_customLayer);
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
        ></Source>
        {Boolean(true) ? <Layer {...osmLayer} /> : null}
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
