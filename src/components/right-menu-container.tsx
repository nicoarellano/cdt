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
import { RightMenu } from "./right-menu";
import { TorontoPkgsApi } from "./toronto-packages-api";
import { RightMenuButtons } from "./right-menu-buttons";
import { MapStyles } from "./map-styles";
import { RightMenuHeader } from "./right-menu-header";
import { Auth } from "./auth/auth";

export const RightMenuContainer: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [currentMenu, setCurrentMenu] = useState<{}>({});
  const [previousMenu, setPrevious] = useState<[]>([]);

  const sideMenuToggle = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const rightMenu = {
    mapStyles: (
      <div id="map-styles-container" title="Map Styles">
        <MapStyles />
      </div>
    ),
    auth: (
      <div id="sign-in-container" title="Authentication">
        <Auth />
      </div>
    ),
    datasets: (
      <div id="datasets-container" title="Datasets">
        <TorontoPkgsApi />
      </div>
    ),
  };

  // const currentMenuElement =

  return (
    <div id="right-container">
      <div id="right-menu-button" title="Menu">
        <Hamburger
          color="white"
          size={28}
          rounded={true}
          toggled={isOpen}
          toggle={setOpen}
        />
      </div>
      <aside id="right-box" className={isOpen ? "" : "hidden"}>
        <aside className={sideMenuOpen ? "" : "hidden"}>
          <RightMenu>
            <header onClick={sideMenuToggle}>
              <RightMenuHeader title={rightMenu.auth.props.title} />
            </header>
            {rightMenu.auth}
          </RightMenu>
        </aside>
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
