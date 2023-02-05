import { FC } from "react";

export const MapStyle: FC<{ type: string; url: string }> = ({ type, url }) => {
  return (
    <div id={url} title={`${type} style`} className="map-styles">
      <h3 id={url} className="effect">
        {type}
      </h3>
      <img
        id={url}
        src={`./${type}.png`}
        alt={`${type} style`}
        height="55px"
        width="55"
        className="icon"
      />
    </div>
  );
};
