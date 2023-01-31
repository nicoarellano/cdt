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
import { SignIn } from "./auth/sign-in";

export const RightMenuContainer: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  // const [isHidden, setisHidden] = useState("");

  // const handleClickEvent = () => {
  //   console.log(isHidden);
  //   if (isHidden === "hidden") {
  //     setisHidden("");
  //   } else setisHidden("hidden");
  // };

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
        <RightMenu>
          <div id="map-styles-container" className="hidden">
            <RightMenuHeader title="Map Styles" />
            <MapStyles />
          </div>

          <div id="sign-in-container" className="">
            <RightMenuHeader title="Sign In" />
            <SignIn />
          </div>

          <div id="datasets-container" className="hidden">
            <RightMenuHeader title="Data" />
            <TorontoPkgsApi />
          </div>
        </RightMenu>
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
