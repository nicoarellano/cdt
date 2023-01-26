import { useMarkers } from "../utils/useMarkers";
import { FC } from "react";

export const TorontoBikesMarkers: FC<> = ({ resourceId, limit, color }) => {
  const markers = useMarkers(
    "12ef161c-1553-43f6-8180-fed700e42912",
    100,
    "blue"
  );
  return markers;
};
