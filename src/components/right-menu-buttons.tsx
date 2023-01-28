import { FC, PropsWithChildren } from "react";

export const RightMenuButtons: FC<PropsWithChildren> = ({ children }) => {
  return <nav id="right-menu-buttons">{children}</nav>;
};
