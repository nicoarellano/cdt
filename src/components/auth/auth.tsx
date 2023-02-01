import { FC, useState } from "react";
import { GoogleAuth } from "./google-auth";
import { useUserContext } from "../../user-provider";
import { Logout } from "./logout";
import { MailRegister } from "./mail-register";
import { SignIn } from "./sign-in";

export const Auth: FC = () => {
  const [user] = useUserContext();
  const [signedUp, setSignedUp] = useState(false);

  const toggleAuth = () => {
    setSignedUp(!signedUp);
  };

  return (
    <div id="auth">
      {Boolean(user) ? (
        <div className="right-menu-center">
          <h5>
            Hi {user?.displayName}.
            <br /> Lets explore Canada!
          </h5>
          <Logout />
        </div>
      ) : (
        <div className="right-menu-center">
          {Boolean(signedUp) ? (
            <div>
              <h5>Welcome back, please sign in!</h5>
              <SignIn />
              <h5 className="effect pointer" onClick={toggleAuth}>
                Register new account
              </h5>
            </div>
          ) : (
            <div>
              <h5>Hello stranger, please sign up!</h5>
              <MailRegister />
              <h5 className="effect pointer" onClick={toggleAuth}>
                Sign in with existing account
              </h5>
            </div>
          )}
          <div>
            <GoogleAuth />
          </div>
        </div>
      )}
    </div>
  );
};
