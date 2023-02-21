import { FC, MouseEvent } from "react";
import { MapStyle } from "./map-style";

interface Props {
  updateMapStyle: (arg: string) => void;
}

export const MapStyles: FC<Props> = ({ updateMapStyle }) => {
  const handleMouseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as Element;
    const newMapStyle = target.id;
    if (target) updateMapStyle(newMapStyle);
  };

  return (
    <nav id="map-styles" className="right-menu-body" onClick={handleMouseEvent}>
      <MapStyle type={"OSM Bright"} id={"osm-bright"} />
      <MapStyle type={"Positron"} id={"position"} />
      <MapStyle type={"Light"} id={"light"} />
      <MapStyle type={"Dark Matter"} id={"dark-matter"} />
      <MapStyle type={"Klokantech Basic"} id={"klokantech-basic"} />
    </nav>
  );
};
