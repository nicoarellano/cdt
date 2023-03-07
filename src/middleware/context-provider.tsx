import { executeCore } from "./core-handler";
import { Action } from "./actions";
import { reducer } from "./state-handler";
import { initialState, State } from "./state";
import {
  FC,
  PropsWithChildren,
  useReducer,
  createContext,
  Dispatch,
  useContext,
} from "react";

const appContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState);

  const dispatch = (value: Action) => {
    setState(value);
    executeCore(value);
  };
  return (
    <appContext.Provider value={[state, dispatch]}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
