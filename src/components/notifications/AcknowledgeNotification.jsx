import React from "react";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

const AcknowledgeNotification = () => {
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "SHOW_ACK_NOTIFICATION",
      payload: { ...ackAlert, open: false },
    });
  };

  return (
    <Snackbar
      open={ackAlert.open}
      onClose={handleClose}
      autoHideDuration={ackAlert.autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        zIndex: "9999999",
      }}
    >
      <Alert
        severity={ackAlert.severity}
        action={
          <IconButton color="inherit" size="small" onClick={handleClose}>
            <CloseTwoToneIcon />
          </IconButton>
        }
      >
        {ackAlert.message}
      </Alert>
    </Snackbar>
  );
};

export default AcknowledgeNotification;
