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
      <MapStyle type={"Satellite"} id={"satellite-streets-v11"} />
      <MapStyle type={"Streets"} id={"streets-v11"} />
      <MapStyle type={"Light"} id={"light-v10"} />
      <MapStyle type={"Dark"} id={"dark-v10"} />
      <MapStyle type={"Traffic"} id={"navigation-day-v1"} />
    </nav>
  );
};
