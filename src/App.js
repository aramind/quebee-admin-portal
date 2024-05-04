import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

import { CssBaseline } from "@mui/material";

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
