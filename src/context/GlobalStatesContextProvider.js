import { createContext, useContext, useReducer } from "react";
import globalReducer from "./globalReducer";

const initialGlobalState = {
  currentUser: null,
  currentUserRole: 0,
  alert: { open: false, severity: "info", message: "" },
  ackAlert: {
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000,
  },
};

const GlobalStateContext = createContext(initialGlobalState);

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

const GlobalStatesContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStatesContextProvider;
