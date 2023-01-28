import { FC, PropsWithChildren } from "react";

export const RightBox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav id="right-box" className="">
      {children}
    </nav>
  );
};
