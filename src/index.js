import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalContextProvider from "./context/ContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import auroraTheme from "./themes/auroraTheme";
import AuthProvider from "./context/AuthProvider";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalContextProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={auroraTheme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
