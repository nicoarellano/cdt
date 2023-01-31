import { useMarkers } from "./useMarkers";
import { FC } from "react";

export const UseOpenTorontoMarkers: FC<{
  resourceId: string;
  limit?: number;
  color?: string;
}> = ({ resourceId, limit = 100, color = "red" }) => {
  const markers: any = useMarkers(resourceId, limit, color);
  return markers;
};
