import MapStylesIcon from "@mui/icons-material/MapOutlined";
// import { FC, MouseEvent } from "react";

export const MapStylesButton = () => {
  return (
    <div id="map-stykes-button" className="icon" title="Map styles">
      <MapStylesIcon />
    </div>
  );
};

// export const MapStylesButton: FC<MouseEvent> = (MouseEvent) => {
//   const clickHandler = (e: MouseEvent<HTMLDivElement>): void => {
//     console.log("MAP CLICKED");
//   };

//   return (
//     <div
//       id="map-stykes-button"
//       className="icon"
//       title="Map styles"
//       onClick={clickHandler}
//     >
//       <MapStylesIcon />
//     </div>
//   );
// };
