import { FC, PropsWithChildren } from "react";

export const TopBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <div id="top-gradient"></div>
        <nav id="top-bar" className="top-bar">
          {children}
        </nav>
      </header>
    </>
  );
};
