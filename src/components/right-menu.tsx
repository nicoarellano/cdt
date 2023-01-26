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
  // const [navVisibility, setNavVisibility] = useState(true);

  // function handleClick() {
  //   setNavVisibility(!navVisibility);
  // }

  // const navList = [
  //   "Tools",
  //   "Layers",
  //   "Share View",
  //   "Map Styles",
  //   "Login",
  //   "Info",
  //   "Settings",
  // ];

  return (
    <>
      <aside>
        <nav id="right-menu" className={`right-menu`}>
          <ToolsButton />
          <LayersButton />
          <ShareViewButton />
          <UploadButton />
          <MapStylesButton />
          <LoginButton />
          <InfoButton />
          <SettingsButton />
          {/* <TorontoBikes /> */}
          {/* <RightBarButton showList={handleClick} />
          {navVisibility &&
            navList.map((list, index) => {
              return <NavButton id={index} name={list} />;
            })} */}
          {/* <RightBarButton /> */}
          {children}
        </nav>
      </aside>
    </>
  );
};
