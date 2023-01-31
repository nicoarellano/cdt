import { MapStyleDark } from "./map-style-dark";
import { MapStyleLight } from "./map-style-ligth";
import { MapStyleSatellite } from "./map-style-satellite";
import { MapStyleStreets } from "./map-style-streets";
import { MapStyleTraffic } from "./map-style-traffic";

export const MapStyles = () => {
  return (
    <nav id="map-styles" className="right-menu-body">
      <MapStyleStreets />
      <MapStyleSatellite />
      <MapStyleLight />
      <MapStyleDark />
      <MapStyleTraffic />
    </nav>
  );
};
