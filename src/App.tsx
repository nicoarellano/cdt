import { Mapbox } from "./components/Mapbox";
import { RightBarButton } from "./components/right-bar-button";
import { TopBar } from "./components/topBar";
import { IcdtLogo } from "./components/icdt-logo";
import { SearchButton } from "./components/search-button";
import { RightMenu } from "./components/right-menu";
import { BimViewer } from "./components/bim-viewer";

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
      <RightMenu />
      <Mapbox mapboxAccessToken={mapboxAccessToken} />
      <BimViewer />
    </>
  );
}

export default App;
