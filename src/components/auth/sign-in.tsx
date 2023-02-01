import { FC, useState, FormEvent } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth();

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <form className="right-menu-center" onSubmit={onLogin}>
      <input
        type="email"
        className="menu-input"
        value={email}
        placeholder={"Email"}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        className="menu-input"
        value={password}
        placeholder={"Password"}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button type="submit" className="menu-button">
        Login
      </button>
    </form>
  );
};
