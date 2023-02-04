import { MouseEvent } from "react";
import { MapStyle } from "./map-style";
import { useSearchParams } from "react-router-dom";

export const MapStyles = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMouseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as Element;
    if (target) setSearchParams({ mapStyle: target.id });
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
