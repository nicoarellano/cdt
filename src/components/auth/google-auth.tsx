import { FC } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const GoogleAuth: FC = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const onLoginClick = () => {
    signInWithPopup(auth, provider);
  };
  ///

  return (
    <button className="menu-button" onClick={onLoginClick}>
      Google Login
    </button>
  );
};
