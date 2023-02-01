import SharedViewIcon from "@mui/icons-material/OpenInNewOutlined";
import { useState } from "react";
import { ShareViewWindow } from "./share-view-window";

export const ShareViewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openShareView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="share-view-button"
        className="icon"
        title="Share view window"
        onClick={openShareView}
      >
        <SharedViewIcon />
      </div>

      <div className={isOpen ? "full-page-flex" : "hidden"}>
        <ShareViewWindow />
      </div>
    </>
  );
};
