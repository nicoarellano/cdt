import { FC, PropsWithChildren } from "react";

export const TopBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div id="top-gradient"></div>
      <header>
        <nav id="top-bar" className="top-bar">
          {children}
        </nav>
      </header>
    </>
  );
};
