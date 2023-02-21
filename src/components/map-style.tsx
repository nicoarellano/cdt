import { FC } from "react";

export const MapStyle: FC<{ type: string; id: string }> = ({ type, id }) => {
  return (
    <div id={id} title={`${type} style`} className="map-styles">
      <h3 id={id} className="effect">
        {type}
      </h3>
      <img
        id={id}
        src={`./${type}.png`}
        alt={`${type} style`}
        height="55px"
        width="55"
        className="icon"
      />
    </div>
  );
};
