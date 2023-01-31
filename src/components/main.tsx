import { FC, useEffect } from "react";
import { Mapbox } from "./Mapbox";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { TopBar } from "./topBar";
import { IcdtLogo } from "./icdt-logo";
// import { SearchButton } from "./search-button";
import { RightMenuContainer } from "./right-menu-container";
import { BimViewer } from "./bim-viewer";
import { useUserContext } from "../user-provider";

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

  return (
    <>
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
          {/* <SearchButton /> */}
        </div>
      </TopBar>
      <RightMenuContainer />
      {Boolean(user) ? (
        <Mapbox mapboxAccessToken={token} />
      ) : (
        <div className="message">Please log in</div>
      )}
      <BimViewer />
    </>
  );
};
