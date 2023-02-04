import { FC, MouseEventHandler } from "react";

interface Props {
  Icon: any;
  type: string;
  handleClick?: MouseEventHandler;
}

export const MenuButton: FC<Props> = ({ Icon, type, handleClick }) => {
  return (
    <div
      id={`${type}-button`}
      className="icon"
      title={type}
      onClick={handleClick}
    >
      {Icon}
    </div>
  );
};
