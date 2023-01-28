import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const RightMenuButton = () => {
  const [buttonState, setButtonState] = useState(false);
  const onClick = () => {
    setButtonState(!buttonState);
  };

  if (!buttonState)
    return (
      <div id="right-menu-button" title="Side menu" className="icon">
        <MenuIcon onClick={onClick} />
      </div>
    );
  else
    return (
      <div id="right-menu-button" title="Side menu" className="icon">
        <CloseIcon onClick={onClick} />
      </div>
    );
};
