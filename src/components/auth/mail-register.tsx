import { FC, useState, FormEvent } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useUserContext } from "../../user-provider";

export const MailRegister: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth();
  const [user, setUser] = useUserContext();

  const onRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = response.user;
    await updateProfile(newUser, { displayName: name });
    setUser(user);
  };

  return (
    <form className="right-menu-center" onSubmit={onRegister}>
      <input
        type="name"
        className="menu-input"
        value={name}
        placeholder={"Name"}
        onChange={(event) => setName(event.target.value)}
      />
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
        placeholder={"Password*"}
        onChange={(event) => setPassword(event.target.value)}
      />
      <h5>*At least 10 characters</h5>
      <button type="submit" className="menu-button">
        Sign Up
      </button>
    </form>
  );
};
