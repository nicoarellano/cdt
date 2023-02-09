import { FC, MouseEvent } from "react";
import { MapStyle } from "./map-style";

interface Props {
  updateMapStyle: (arg: string) => void;
}

export const MapStyles: FC<Props> = ({ updateMapStyle }) => {
  const handleMouseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as Element;
    const newMapStyle = `mapbox://styles/mapbox/${target.id}`;
    if (target) updateMapStyle(newMapStyle);
  };

  return (
    <nav id="map-styles" className="right-menu-body" onClick={handleMouseEvent}>
      <MapStyle type={"Satellite"} url={"satellite-streets-v11"} />
      <MapStyle type={"Streets"} url={"streets-v11"} />
      <MapStyle type={"Light"} url={"light-v10"} />
      <MapStyle type={"Dark"} url={"dark-v10"} />
      <MapStyle type={"Traffic"} url={"navigation-day-v1"} />
    </nav>
  );
};
