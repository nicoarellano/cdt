import { FC } from "react";
import { GoogleAuth } from "./google-auth";
import { useUserContext } from "../../user-provider";
import { Logout } from "./logout";
import { MailRegister } from "./mail-register";

export const SignIn: FC = () => {
  const [user] = useUserContext();

  return (
    <div id="sign-in">
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
          <h5>Hi stranger, please sign in!</h5>
          <div>
            <MailRegister />
          </div>
          <div>Mail Login</div>
          <div>
            <GoogleAuth />
          </div>
        </div>
      )}
    </div>
  );
};
