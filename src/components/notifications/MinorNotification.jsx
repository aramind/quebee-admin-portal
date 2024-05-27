import React from "react";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import { Alert, Snackbar } from "@mui/material";

const MinorNotification = () => {
  const {
    globalState: { alert },
    dispatch,
  } = useGlobalState();

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    dispatch({ type: "SHOW_MINOR_ALERT", payload: { ...alert, open: false } });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{ zIndex: 1000 }}
    >
      <Alert
        // onClose={handleClose}
        severity={alert.severity}
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default MinorNotification;
