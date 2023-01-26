import { useResources } from "../utils/useResources";

export const useCoordinates = (resourceId, limit = 100) => {
  const resources = useResources(resourceId, (limit = 100));
  const coordinates = [];

  Boolean(resources.length) &&
    resources.map((resource) => {
      const { geometry } = resource;
      const coordinate = JSON.parse(geometry);
      coordinates.push(coordinate);
      console.log(coordinate);
      return coordinates;
    });
};
