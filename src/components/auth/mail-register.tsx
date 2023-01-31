import { FC, useState } from "react";

export const MailRegister: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className="column">
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
        placeholder={"Password"}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button type="submit" className="menu-button">
        Register
      </button>
    </form>
  );
};
