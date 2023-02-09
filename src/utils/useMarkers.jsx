import { useResources } from "./useResources";
import { Marker } from "react-map-gl";

export const useMarkers = (resourceId, limit = 100, color = "red") => {
  const resources = useResources(resourceId, limit);

  let markers = [];
  Boolean(resources.length) &&
    resources.map((resource, index) => {
      const { geometry } = resource;
      const parsedGeometry = JSON.parse(geometry);
      const coordinates = parsedGeometry.coordinates;
      const lng = coordinates[0];
      const lat = coordinates[1];
      markers.push(
        <Marker
          longitude={lng}
          latitude={lat}
          color={color}
          // anchor="bottom"
        ></Marker>
      );
      return markers;
    });
  return markers;
};
