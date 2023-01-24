import { RightBarButton } from "./right-bar-button";
import { TopBar } from "./topBar";
import { IcdtLogo } from "./icdt-logo";
import { SearchButton } from "./search-button";
import { RightMenu } from "./right-menu";
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
          <SearchButton />
        </div>
      </TopBar>
      <RightMenu>
        <RightBarButton />
        <br />
        <ToolsButton />
        <LayersButton />
        <ShareViewButton />
        <InfoButton />
        <SettingsButton />
      </RightMenu>
    </div>
  );
};

export default BimViewer;
