import { FC, useState } from "react";
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
import { MapStyles } from "./mapbox-styles";
import { Layers } from "./layers";
import { Auth } from "./auth/auth";
import { ToolsMenu } from "./tools-menu";
import { Upload } from "./upload";



interface Props {
  updateMapStyle: (arg: string) => void;
  toggleOsm: (arg: boolean) => void;
}

export const RightMenuContainer: FC<Props> = ({
  updateMapStyle,
  toggleOsm,
}) => {
  const [isOpen, setOpen] = useState(false);

  //console.log(mapStyleClickEvent);

  const [menuIndex, setMenuIndex] = useState(0);

  const [rightmenuOpen, setRightMenuOpen] = useState(false);
  const menuButtonClick = (e: any) => {
    e.preventDefault();
    const target = e.currentTarget as Element;
    const index = Number(target.id);
    setMenuIndex(index);
    setRightMenuOpen(!rightmenuOpen);
  };

  const [shareViewMenuOpen, setShareViewMenuOpen] = useState(false);
  const haredViewClick = (e: any) => {
    e.preventDefault();
    setShareViewMenuOpen(!shareViewMenuOpen);
  };

  const rightMenu = [
    <div />,
    <div id="tools-container" title="Tools">
      <ToolsMenu toggleOsm={toggleOsm} />
    </div>,
    <div id="datasets-container" title="Layers">
      <Layers />
    </div>,
    <div id="upload-forms" title="Uploads">
      <Upload/>
    </div>,
    <div title="Map Styles">
      <Router>
        <div id="map-styles-container" title="Map Styles">
          <MapStyles updateMapStyle={updateMapStyle} />
        </div>
      </Router>
    </div>,
    <div id="sign-in-container" title="Authentication">
      <Auth />
    </div>,
    <div
      id="info-container"
      title="Information"
      className="right-menu-body"
    ></div>,
    <div
      id="settings-container"
      title="Settings"
      className="right-menu-body"
    ></div>,
  ];

  const currentMenuElement = rightMenu[menuIndex];

  return (
    <div id="right-container">
      <div id="right-menu-button" title="Menu">
        <Hamburger
          color="white"
          size={22}
          rounded={true}
          toggled={isOpen}
          toggle={setOpen}
          distance="lg"
        />
      </div>
      <aside id="right-box" className={isOpen ? "" : "hidden"}>
        <aside className={rightmenuOpen ? "" : "hidden"}>
          <RightMenu>
            <header onClick={menuButtonClick}>
              <RightMenuHeader title={currentMenuElement.props.title} />
            </header>
            {currentMenuElement}
          </RightMenu>
        </aside>
        <div className={rightmenuOpen ? "full-page-flex" : "hidden"}></div>
        <nav id="right-menu-buttons" className={rightmenuOpen ? "hidden" : ""}>
          <MenuButton
            type={"Tools"}
            Icon={<ToolsIcon />}
            handleClick={menuButtonClick}
            index={1}
          />
          <MenuButton
            type={"Layers"}
            Icon={<LayersIcon />}
            handleClick={menuButtonClick}
            index={2}
          />
          <MenuButton
            type={"Share View"}
            Icon={<SharedViewIcon />}
            handleClick={haredViewClick}
          />
          <MenuButton
            type={"Upload"}
            Icon={<UploadIcon />}
            handleClick={menuButtonClick}
            index={3}
          />
          <MenuButton
            type={"Map Styles"}
            Icon={<MapStylesIcon />}
            handleClick={menuButtonClick}
            index={4}
          />
          <MenuButton
            type={"Log in"}
            Icon={<LoginIcon />}
            handleClick={menuButtonClick}
            index={5}
          />
          <MenuButton
            type={"Info"}
            Icon={<InfoIcon />}
            handleClick={menuButtonClick}
            index={6}
          />
          <MenuButton
            type={"Settings"}
            Icon={<SettingsIcon />}
            handleClick={menuButtonClick}
            index={7}
          />
        </nav>
      </aside>
      <div className="full-page-flex">
        <ShareViewWindow
          handleClick={haredViewClick}
          toggled={shareViewMenuOpen}
        />
      </div>
    </div>
  );
};
