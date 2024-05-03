import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { useEffect, useState } from "react";
import { useGlobalState } from "./context/ContextProvider";
import { CssBaseline } from "@mui/material";

function App() {
  // const [allowed, setAllowed] = useState(false);
  const {
    globalState: { currentUserRole, currentUser },
    dispatch,
  } = useGlobalState();

  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserData) || {};
      console.log(storedUser);
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {
          username: storedUser.name,
          role: storedUser.role,
        },
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [dispatch, currentUserRole, currentUser]);

  return (
    <div className="App">
      <CssBaseline />
      <RouterProvider
        // router={
        //   +currentUserRole > 1 ? router.privateRouter : router.publicRouter
        // }
        router={router.combinedRouter}
      />
    </div>
  );
}

export default App;
