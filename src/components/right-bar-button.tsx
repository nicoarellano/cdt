import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export const RightBarButton = () => {
  const [buttonState, setButtonState] = useState(false);
  const [currentClass, setcurrentClass] = useState("white-icon");
  const onClick = () => {
    setcurrentClass(buttonState ? "white-icon" : "white-icon selected-button");
    setButtonState(!buttonState);
  };

  return (
    <div id="right-menu-button" title="Side menu" className={currentClass}>
      <MenuIcon onClick={onClick} />
    </div>
  );
};
