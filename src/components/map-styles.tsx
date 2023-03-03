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
      <MapStyle type={"Satellite"} id={"satellite"} />
      <MapStyle type={"Streets"} id={"streets"} />
      <MapStyle type={"Light"} id={"light"} />
      <MapStyle type={"Dark"} id={"dark"} />
    </nav>
  );
};
