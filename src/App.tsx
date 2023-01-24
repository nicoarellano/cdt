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
  // const [buttonState, setButtonState] = useState(false);
  // const [currentClass, setcurrentClass] = useState("white-icon");
  // const onClick = () => {
  //   // setcurrentClass(buttonState ? "white-icon" : "white-icon selected-button");
  //   // setcurrentClass(buttonState ? "white-icon" : "animate");
  //   setButtonState(!buttonState);
  // };
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
      {/* <RightMenu newClass={currentClass}>
        <ToolsButton />
        <LayersButton />
        <ShareViewButton />
        <MapStylesButton />
        <LoginButton />
        <InfoButton />
        <SettingsButton />
        <TorontoPkgsApi />
      </RightMenu> */}
      <Mapbox mapboxAccessToken={mapboxAccessToken} />
      <BimViewer />
    </>
  );
}

export default App;
