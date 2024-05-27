import { useEffect } from "react";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";

import { useSnackbar } from "notistack";
import { Alert } from "@mui/material";

const MinorNotification = () => {
  const {
    globalState: { alert },
  } = useGlobalState();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (alert.open) {
      enqueueSnackbar(alert.message, {
        content: () => <Alert severity={alert.severity}>{alert.message}</Alert>,
        autoHideDuration: 2000,
      });
    }
  }, [alert.message, alert.open, alert.severity, enqueueSnackbar]);

  return null;
};

export default MinorNotification;
