import { FC, PropsWithChildren } from "react";
// import NavButton from "./nav-button";
import { ToolsButton } from "./tools-button";
import { LayersButton } from "./layers-button";
import { ShareViewButton } from "./share-view-button";
import { UploadButton } from "./upload-button";
import { MapStylesButton } from "./map-styles-button";
import { LoginButton } from "./login-button";
import { InfoButton } from "./info-button";
import { SettingsButton } from "./settings-button";

export const RightMenu: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <aside>
        <nav id="right-menu">
          <nav id="right-menu-container" className={"column"}></nav>
          <nav id="right-menu-buttons" className="column">
            <ToolsButton />
            <LayersButton />
            <ShareViewButton />
            <UploadButton />
            <MapStylesButton />
            <LoginButton />
            <InfoButton />
            <SettingsButton />
          </nav>
          {children}
        </nav>
      </aside>
    </>
  );
};
