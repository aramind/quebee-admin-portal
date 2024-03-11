import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalContextProvider from "./context/ContextProvider";
import { ThemeProvider } from "@mui/material";
import auroraTheme from "./themes/auroraTheme";
import pupTheme from "./themes/pupTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <ThemeProvider theme={auroraTheme}>
        <App />
      </ThemeProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
