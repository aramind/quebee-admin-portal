import { createContext, useContext, useReducer } from "react";
import globalReducer from "./globalReducer";

const initialGlobalState = {
  currentUser: null,
  isLoggedIn: true,
};

const GlobalStateContext = createContext(initialGlobalState);

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

const GlobalContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
