import { FC, PropsWithChildren, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Hamburger from "hamburger-react";
import { MenuButton } from "./menu-button";

// Icons
import LayersIcon from "@mui/icons-material/LayersOutlined";
import ToolsIcon from "@mui/icons-material/DesignServicesOutlined";
import UploadIcon from "@mui/icons-material/UploadFileOutlined";
import MapStylesIcon from "@mui/icons-material/MapOutlined";
import SharedViewIcon from "@mui/icons-material/OpenInNewOutlined";
import LoginIcon from "@mui/icons-material/PersonOutlineOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

// Menus
import { RightMenuHeader } from "./right-menu-header";
import { ShareViewWindow } from "./share-view-window";
import { RightMenu } from "./right-menu";
import { MapStyles } from "./map-styles";
import { TorontoPkgsApi } from "./toronto-packages-api";
import { Auth } from "./auth/auth";

export const RightMenuContainer: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  // const [currentMenu, setCurrentMenu] = useState<{}>({});
  // const [previousMenu, setPrevious] = useState<[]>([]);

  const [rightmenuOpen, setRightMenuOpen] = useState(false);
  const menuButtonClick = (e: any) => {
    e.preventDefault();
    setRightMenuOpen(!rightmenuOpen);
  };

  const [shareViewMenuOpen, setShareViewMenuOpen] = useState(false);
  const haredViewClick = (e: any) => {
    e.preventDefault();
    setShareViewMenuOpen(!shareViewMenuOpen);
  };

  const rightMenu = {
    mapStyles: (
      <Router>
        <div id="map-styles-container" title="Map Styles">
          <MapStyles />
        </div>
      </Router>
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

  const currentMenuElement = rightMenu.mapStyles;

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
        <aside className={rightmenuOpen ? "hidden" : ""}>
          <RightMenu>
            <header onClick={menuButtonClick}>
              <RightMenuHeader title={currentMenuElement.props.title} />
            </header>
            {currentMenuElement}
          </RightMenu>
        </aside>
        <div className={rightmenuOpen ? "full-page-flex" : "hidden"}></div>
        <nav id="right-menu-buttons" className={rightmenuOpen ? "" : "hidden"}>
          <MenuButton type={"Tools"} Icon={<ToolsIcon />} />
          <MenuButton
            type={"Layers"}
            Icon={<LayersIcon />}
            handleClick={menuButtonClick}
          />
          <MenuButton
            type={"Share View"}
            Icon={<SharedViewIcon />}
            handleClick={haredViewClick}
          />
          <MenuButton type={"Upload"} Icon={<UploadIcon />} />
          <MenuButton
            type={"Map Styles"}
            Icon={<MapStylesIcon />}
            handleClick={menuButtonClick}
          />
          <MenuButton
            type={"Log in"}
            Icon={<LoginIcon />}
            handleClick={menuButtonClick}
          />
          <MenuButton type={"Info"} Icon={<InfoIcon />} />
          <MenuButton type={"Settings"} Icon={<SettingsIcon />} />
        </nav>
        {children}
      </aside>
      <div className="full-page-flex">
        <ShareViewWindow
          handleClick={haredViewClick}
          toggled={shareViewMenuOpen}
        />
        ;
      </div>
    </div>
  );
};
