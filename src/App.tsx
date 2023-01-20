import React from "react";

import { Mapbox } from "./components/Mapbox";
import { RightBarButton } from "./components/right-bar-button";
import { TopBar } from "./components/topBar";
import { IcdtLogo } from "./components/icdt-logo";
import { SearchButton } from "./components/search-button";

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
        <RightBarButton />
      </TopBar>

      <div id="top-gradient"></div>
      <Mapbox mapboxAccessToken={mapboxAccessToken} />
    </>
  );
}

export default App;
