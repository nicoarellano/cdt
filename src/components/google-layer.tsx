import { Layer, Source } from "react-map-gl";

export const Google = () => {
  const googleLayer: any = {
    id: "osm",
    type: "raster",
    source: "osm",
  };
  return (
    <Source
      id="osm"
      type="raster"
      tiles={["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"]}
      tileSize={256}
      attribution="&copy; OpenStreetMap Contributors"
      maxzoom={19}
    >
      <Layer {...googleLayer} />
    </Source>
  );
};
