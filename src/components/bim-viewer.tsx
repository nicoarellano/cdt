import { RightMenuButton } from "../../archive/right-menu-button";
import { TopBar } from "./topBar";
import { IcdtLogo } from "./icdt-logo";
// import { SearchButton } from "./search-button";
import { RightMenuContainer } from "./right-menu-container";
import { ToolsButton } from "./tools-button";
import { LayersButton } from "./layers-button";
import { ShareViewButton } from "./share-view-button";
import { InfoButton } from "./info-button";
import { SettingsButton } from "./settings-button";

export const BimViewer = () => {
  return (
    <div id="bim-viewer" className="full-page-iframe hidden">
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
          {/* <SearchButton /> */}
        </div>
      </TopBar>
      <RightMenuContainer>
        <ToolsButton />
        <LayersButton />
        <ShareViewButton />
        <InfoButton />
        <SettingsButton />
      </RightMenuContainer>
    </div>
  );
};

export default BimViewer;
