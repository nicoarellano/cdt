import { FC, PropsWithChildren } from "react";

export const TopBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <nav id="top-container">{children}</nav>
      </header>
    </>
  );
};
