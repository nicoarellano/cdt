import { Mapbox } from "./components/Mapbox";
import { RightBarButton } from "./components/right-bar-button";
import { TopBar } from "./components/topBar";
import { IcdtLogo } from "./components/icdt-logo";
import { SearchButton } from "./components/search-button";
import { RightMenu } from "./components/right-menu";
import { BimViewer } from "./components/bim-viewer";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

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
      <Mapbox mapboxAccessToken={token} />
      <BimViewer />
    </>
  );
}

export default App;
