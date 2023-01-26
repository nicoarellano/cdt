import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const RightBarButton = () => {
  const [buttonState, setButtonState] = useState(false);
  // const [currentClass, setcurrentClass] = useState("white-icon");
  const onClick = () => {
    // setcurrentClass(buttonState ? "white-icon" : "white-icon selected-button");
    setButtonState(!buttonState);
  };

  if (!buttonState)
    return (
      <div id="right-menu-button" title="Side menu" className="white-icon">
        <MenuIcon onClick={onClick} />
      </div>
    );
  else
    return (
      <div id="right-menu-button" title="Side menu" className="white-icon">
        <CloseIcon onClick={onClick} />
      </div>
    );
};
