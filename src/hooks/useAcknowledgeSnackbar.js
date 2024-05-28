import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

const useAcknowledgeSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("infor");

  const showSnackbar = useCallback((msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: "999999" }}
    >
      <Alert
        severity={severity}
        action={
          <IconButton color="inherit" size="small" onClick={handleClose}>
            <CloseTwoToneIcon />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
  return { showSnackbar, SnackbarComponent };
};

export default useAcknowledgeSnackbar;
