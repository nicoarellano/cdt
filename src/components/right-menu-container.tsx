import { FC, PropsWithChildren, useState } from "react";
import Hamburger from "hamburger-react";
import { ToolsButton } from "./tools-button";
import { LayersButton } from "./layers-button";
import { ShareViewButton } from "./share-view-button";
import { UploadButton } from "./upload-button";
import { MapStylesButton } from "./map-styles-button";
import { LoginButton } from "./login-button";
import { InfoButton } from "./info-button";
import { SettingsButton } from "./settings-button";
import { RightBox } from "./right-box";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { TorontoPkgsApi } from "./toronto-packages-api";
import { RightMenuButtons } from "./right-menu-buttons";
import { MapStyles } from "./map-styles";

export const RightMenuContainer: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div id="right-container">
      <div id="right-menu-button" title="Menu">
        <Hamburger
          color="white"
          size={25}
          rounded={true}
          toggled={isOpen}
          toggle={setOpen}
        />
      </div>
      <aside id="right-menu-container" className={isOpen ? "" : "hidden"}>
        <RightBox>
          <div id="right-menu-header" className="row">
            <div id="back-button" title="Back" className="icon">
              <ArrowBackIcon />
            </div>
            <h2>Title</h2>
          </div>

          <div id="right-menu-title">
            <aside id="right-menu-content">
              <MapStyles />
              <TorontoPkgsApi />
            </aside>
          </div>
        </RightBox>
        <RightMenuButtons>
          <ToolsButton />
          <LayersButton />
          <ShareViewButton />
          <UploadButton />
          <MapStylesButton />
          <LoginButton />
          <InfoButton />
          <SettingsButton />
        </RightMenuButtons>
        {children}
      </aside>
      ;
    </div>
  );
};
