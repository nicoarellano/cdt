import { TopBar } from "./topBar";
import { IcdtLogo } from "./icdt-logo";

export const BimViewer = () => {
  return (
    <div id="bim-viewer" className="full-page-iframe hidden">
      <TopBar>
        <div id="top-left" className="row">
          <IcdtLogo />
        </div>
      </TopBar>
    </div>
  );
};

export default BimViewer;
