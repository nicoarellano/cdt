import { Mapbox } from "./components/Mapbox";
// import { RightMenuButton } from "./components/right-menu-button";
import { TopBar } from "./components/topBar";
import { IcdtLogo } from "./components/icdt-logo";
// import { SearchButton } from "./components/search-button";
import { RightMenuContainer } from "./components/right-menu-container";
import { BimViewer } from "./components/bim-viewer";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  return (
    <>
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
          {/* <SearchButton /> */}
        </div>
        {/* <RightMenuButton /> */}
      </TopBar>
      <RightMenuContainer />
      <Mapbox mapboxAccessToken={token} />
      <BimViewer />
    </>
  );
}

export default App;
