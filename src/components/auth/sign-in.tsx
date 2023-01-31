import { FC } from "react";
import { GoogleAuth } from "./google-auth";
import { useUserContext } from "../../user-provider";
import { Logout } from "./logout";

export const SignIn: FC = () => {
  const [user] = useUserContext();

  return (
    <div id="sign-in" className="right-menu-form">
      {Boolean(user) ? (
        <Logout />
      ) : (
        <div>
          <h5>Welcome back</h5>
          <div>Mail Register</div>
          <div>Mail Login</div>
          <div>
            <GoogleAuth />
          </div>
        </div>
      )}
    </div>
  );
};
