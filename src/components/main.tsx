import { FC, useEffect, useState } from "react";
import { Mapbox } from "./mapbox";
// import { Maplibre } from "./maplibre";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { TopBar } from "./topBar";
import { IcdtLogo } from "./icdt-logo";
import { RightMenuContainer } from "./right-menu-container";
import { useUserContext } from "../user-provider";
import { BrowserRouter as Router } from "react-router-dom";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

export const Main: FC = () => {
  const auth = getAuth();
  const [user, setUser] = useUserContext();

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ ...firebaseUser });
      } else {
        setUser(null);
      }
    });
  }, []);

  // Set map style 🗺️

  const [mapStyle, setMapStyle] = useState<string>("satellite-streets-v11");

  const updateMapStyle = (mapStyle: string): void => {
    setMapStyle(mapStyle);
  };

  // tooggle OSM 🏢
  const [osmVisibility, setOsmVisibility] = useState<boolean>(true);

  const toggleOsm = (osmVisibility: boolean): void => {
    setOsmVisibility(osmVisibility);
  };
  return (
    <>
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
        </div>
      </TopBar>
      <RightMenuContainer
        updateMapStyle={updateMapStyle}
        toggleOsm={toggleOsm}
      />
      {Boolean(user) ? (
        <Router>
          {/* <Maplibre
            mapboxAccessToken={token}
            mapStyle={mapStyle}
            osmVisibility={osmVisibility}
          /> */}
          <Mapbox
            mapboxAccessToken={token}
            mapStyle={mapStyle}
            osmVisibility={osmVisibility}
          />
        </Router>
      ) : (
        <div className="message">
          Please log in to get our full Digital Twin experience!
        </div>
      )}
    </>
  );
};
