import { useMarkers } from "../utils/useMarkers";
import { FC } from "react";

export const TorontoLitterMarkers: FC<> = () => {
  const markers = useMarkers(
    "6c74cc93-3814-4970-84ab-0755e845b25f",
    100,
    "yellow"
  );
  return markers;
};
