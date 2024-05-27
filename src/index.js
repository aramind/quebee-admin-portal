import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import auroraTheme from "./themes/auroraTheme";
import AuthProvider from "./context/AuthProvider";
import GlobalStatesContextProvider from "./context/GlobalStatesContextProvider";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStatesContextProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={auroraTheme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalStatesContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
