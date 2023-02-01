import { FC } from "react";
import CameraIcon from "@mui/icons-material/CameraAltOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";

export const ShareViewWindow: FC = () => {
  return (
    <div id="share-view-window">
      <h3>Share your camera view</h3>
      <br />
      <input id="share-position-input" type="text" className="menu-input" />
      <div id="share-icons" className="row">
        <h4 id="camera-position-button" className="icon row">
          <CameraIcon />
          Camera Position
        </h4>
        <h4 id="link-camera-position-button" className="icon row">
          <LinkIcon />
          Copy link
        </h4>
      </div>
      <button id="done-share-button" className="menu-button">
        Done
      </button>
    </div>
  );
};
