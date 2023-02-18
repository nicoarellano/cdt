import { FC, MouseEvent, useState } from "react";
import { MenuButton } from "./menu-button";

import BuildingsIcon from "@mui/icons-material/HomeWorkOutlined";
import AddIcon from "@mui/icons-material/AddRounded";

interface Props {
  toggleOsm: (arg: boolean) => void;
}

export const ToolsMenu: FC<Props> = ({ toggleOsm }) => {
  const [toggled, setToggled] = useState(false);
  const handleClick = () => {
    toggleOsm(toggled);
    setToggled(!toggled);
  };

  return (
    <div className="right-menu-body icons-row">
      <div onClick={handleClick}>
        <MenuButton type="Open Street Map buildings" Icon={<BuildingsIcon />} />
      </div>

      <MenuButton type="placeholder" Icon={<AddIcon />} />
      <MenuButton type="placeholder" Icon={<AddIcon />} />
    </div>
  );
};
