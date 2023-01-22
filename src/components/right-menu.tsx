import { FC, PropsWithChildren } from "react";

export const RightMenu: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <aside>
        <nav id="right-menu" className="right-menu">
          {children}
        </nav>
      </aside>
    </>
  );
};
