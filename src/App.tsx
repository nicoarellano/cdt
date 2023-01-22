import React from "react";

import { Mapbox } from "./components/Mapbox";
import { RightBarButton } from "./components/right-bar-button";
import { TopBar } from "./components/topBar";
import { IcdtLogo } from "./components/icdt-logo";
import { SearchButton } from "./components/search-button";
import { RightMenu } from "./components/right-menu";

const mapboxAccessToken =
  "pk.eyJ1Ijoibmljby1hcmVsbGFubyIsImEiOiJjbDU2bTA3cmkxa3JzM2luejI2dnd3bzJsIn0.lKKSghBtWMQdXszpTJN32Q";

function App() {
  return (
    <>
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
          <SearchButton />
        </div>
      </TopBar>
      <RightMenu>
        <RightBarButton />
        <br />
        <div>I am the right menu</div>
      </RightMenu>
      <Mapbox mapboxAccessToken={mapboxAccessToken} />
    </>
  );
}

export default App;
