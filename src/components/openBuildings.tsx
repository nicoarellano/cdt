import { FillExtrusionLayer } from "mapbox-gl";
import { Layer } from "react-map-gl";

export const OpenBuildings = () => {
  const openBuildingsLayer: FillExtrusionLayer = {
    id: "3d-buildings",
    source: "openmaptiles",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",
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
      "fill-extrusion-opacity": 1,
    },
  };
  return <Layer {...openBuildingsLayer} />;
};
