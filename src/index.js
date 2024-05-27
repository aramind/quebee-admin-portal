import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import auroraTheme from "./themes/auroraTheme";
import AuthProvider from "./context/AuthProvider";
import GlobalStatesContextProvider from "./context/GlobalStatesContextProvider";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={5}>
        <GlobalStatesContextProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={auroraTheme}>
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </GlobalStatesContextProvider>
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
