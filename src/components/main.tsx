import { FC, useEffect, useState } from "react";
import { Mapbox } from "./Mapbox";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { TopBar } from "./topBar";
import { IcdtLogo } from "./icdt-logo";
import { RightMenuContainer } from "./right-menu-container";
import { BimViewer } from "./bim-viewer";
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

  const [mapStyle, setMapStyle] = useState<string>(
    "mapbox://styles/mapbox/satellite-streets-v11"
  );

  const updateMapStyle = (mapStyle: string): void => {
    setMapStyle(mapStyle);
  };

  return (
    <>
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
        </div>
      </TopBar>
      <RightMenuContainer updateMapStyle={updateMapStyle} />
      {Boolean(user) ? (
        <Router>
          <Mapbox mapboxAccessToken={token} mapStyle={mapStyle} />
        </Router>
      ) : (
        <div className="message">
          Please log in to get our full Digital Twin experience!
        </div>
      )}
      <BimViewer />
    </>
  );
};
