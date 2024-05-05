import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

import { CssBaseline } from "@mui/material";
import { useGlobalState } from "./context/ContextProvider";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const { dispatch } = useGlobalState();

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_USER", payload: { name: auth.name } });
  }, [auth, dispatch]);

  return (
    <div className="App">
      <CssBaseline />
      <RouterProvider router={router.combinedRouter} />
    </div>
  );
}

export default App;
