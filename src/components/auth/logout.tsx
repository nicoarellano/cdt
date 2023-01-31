import { FC } from "react";
import { getAuth, signOut } from "firebase/auth";

export const Logout: FC = () => {
  const auth = getAuth();
  const onLogoutClick = () => {
    signOut(auth);
  };
  return (
    <button className="menu-button" onClick={onLogoutClick}>
      Logout
    </button>
  );
};
