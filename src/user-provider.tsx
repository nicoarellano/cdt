import { User } from "firebase/auth";
import {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

export const userContext = createContext<
  [User | null, (user: User | null) => void]
>([null, () => {}]);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider value={[user, setUser]}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
