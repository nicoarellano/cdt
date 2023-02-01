import { FC } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "react-google-button";

export const GoogleAuth: FC = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const onLoginClick = () => {
    signInWithPopup(auth, provider);
  };
  ///

  return (
    // <button className="menu-button" onClick={}>
    //   Login with Google
    // </button>
    <GoogleButton onClick={onLoginClick} type={"dark"} />
  );
};
