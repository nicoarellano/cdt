import { FC, PropsWithChildren } from "react";

export const RightMenu: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav id="right-menu" className="">
      {children}
    </nav>
  );
};
