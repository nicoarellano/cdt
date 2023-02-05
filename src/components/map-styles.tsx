import { FC, MouseEvent, useState } from "react";
import { MapStyle } from "./map-style";
import { useSearchParams } from "react-router-dom";

interface Props {
  updateMapStyle: (arg: string) => void;
}

export const MapStyles: FC<Props> = ({ updateMapStyle }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMouseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as Element;
    const newMapStyle = `mapbox://styles/mapbox/${target.id}`;
    if (target) updateMapStyle(newMapStyle);
    // if (target) setSearchParams({ mapStyle: target.id });
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
