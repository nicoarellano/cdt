import { FC, MouseEventHandler } from "react";

interface Props {
  Icon: any;
  type: string;
  handleClick?: MouseEventHandler;
  index?: number;
}

export const MenuButton: FC<Props> = ({ Icon, type, handleClick, index }) => {
  return (
    <div id={`${index}`} className="icon" title={type} onClick={handleClick}>
      {Icon}
    </div>
  );
};
