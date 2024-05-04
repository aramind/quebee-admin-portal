import {
  Router,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import router from "./routes";
import { useEffect } from "react";
import { useGlobalState } from "./context/ContextProvider";
import { CssBaseline } from "@mui/material";
import { useCookies } from "react-cookie";

function App() {
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
