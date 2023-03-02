import { Layer } from "react-map-gl";
import type { SkyLayer } from "react-map-gl";

export const Sky = () => {
  const skyLayer: any = {
    id: "sky",
    type: "sky",
    paint: {
      "sky-type": "atmosphere",
      "sky-atmosphere-sun": [0.0, 0.0],
      "sky-atmosphere-sun-intensity": 15,
    },
  };
  return <Layer {...skyLayer} />;
};
