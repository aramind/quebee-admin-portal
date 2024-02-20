import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="App">
      <RouterProvider
        router={isLoggedIn ? router.privateRouter : router.publicRouter}
      />
    </div>
  );
}

export default App;
