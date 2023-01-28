import { MapStyleDark } from "./map-style-dark";
import { MapStyleLight } from "./map-style-ligth";
import { MapStyleSatellite } from "./map-style-satellite";
import { MapStyleStreets } from "./map-style-streets";
import { MapStyleTraffic } from "./map-style-traffic";

export const MapStyles = () => {
  return (
    <nav id="map-styles">
      <MapStyleStreets />
      <MapStyleSatellite />
      <MapStyleLight />
      <MapStyleDark />
      <MapStyleTraffic />
    </nav>
  );
};

/*
<div id="styles-container" class="styles-container hidden">
          <h1 id="maps-header" class="header">> &ensp; Maps</h1>
          <a
            id="map-style"
            name="Map mode"
            title="Map mode"
            class="white-icon row space-between pointer"
          >
            <h2>Streets</h2>
            <img src="static\icons\streets.png" alt="" />
          </a>
          <a
            id="satellite-style"
            name="Satellite mode"
            title="Satellite mode"
            class="white-icon row space-between pointer"
          >
            <h2>Satelite</h2>
            <img src="static\icons\satellite.png" alt="" />
          </a>
          <a
            id="light-style"
            name="Light mode"
            title="Light mode"
            class="white-icon row space-between pointer"
          >
            <h2>Light</h2>
            <img src="static\icons\light.png" alt="" />
          </a>
          <a
            id="dark-style"
            name="Dark mode"
            title="Dark mode"
            class="white-icon row space-between pointer"
          >
            <h2>Dark</h2>
            <img src="static\icons\dark.png" alt="" />
          </a>
          <a
            id="traffic-style"
            name="Traffic mode"
            title="Traffic mode"
            class="white-icon row space-between pointer"
          >
            <h2>Traffic</h2>
            <img src="static\icons\traffic.png" alt="" />
          </a>
        </div>
        */
