import { FC, useState } from "react";
import { Places } from "../../types/firestore-types";

export const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Places[]>([]);

  return (
    <div>
      {Boolean(places.length) ? (
        <ul>
          {places.map((place) => {
            return <li key={place.uid}>{place.name}</li>;
          })}
        </ul>
      ) : (
        <p>No places were found</p>
      )}
    </div>
  );
};
