import { FC, useState, MouseEventHandler } from "react";
import CameraIcon from "@mui/icons-material/CameraAltOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";

interface Props {
  toggled: boolean;
  handleClick?: MouseEventHandler;
}

export const ShareViewWindow: FC<Props> = ({ toggled, handleClick }) => {
  const [url, setUrl] = useState<string>("");

  const cameraPositionClickHandler = () => {
    setUrl(window.location.href);
  };

  const copyLinkClickHandler = () => {
    navigator.clipboard.writeText(url);
    alert(`link:\n\n ${url}\n\n copied to clipboard`);
  };

  return (
    <div id="share-view-window" className={toggled ? "" : "hidden"}>
      <h3>Share your camera view</h3>
      <br />
      <input
        id="share-position-input"
        type="text"
        className="menu-input"
        value={url}
      />
      <div id="share-icons" className="row">
        <h4
          id="camera-position-button"
          className="icon row"
          onClick={cameraPositionClickHandler}
        >
          <CameraIcon />
          Camera Position
        </h4>
        <h4
          id="link-camera-position-button"
          className="icon row"
          onClick={copyLinkClickHandler}
        >
          <LinkIcon />
          Copy link
        </h4>
      </div>
      <button
        id="done-share-button"
        className="menu-button"
        onClick={handleClick}
      >
        Done
      </button>
    </div>
  );
};
