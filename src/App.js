import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { useEffect, useState } from "react";
import { useGlobalState } from "./context/ContextProvider";

function App() {
  const {
    globalState: { isLoggedIn },
    dispatch,
  } = useGlobalState();

  console.log(isLoggedIn);
  return (
    <div className="App">
      <RouterProvider
        router={isLoggedIn ? router.privateRouter : router.publicRouter}
      />
    </div>
  );
}

export default App;
