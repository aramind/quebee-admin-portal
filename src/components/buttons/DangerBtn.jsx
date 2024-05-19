import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const DangerBtn = ({ label, onClick, fullWidth }) => {
  return (
    <Button fullWidth={fullWidth} sx={localStyles?.button} onClick={onClick}>
      {label}
    </Button>
  );
};

export default DangerBtn;

const localStyles = {
  button: {
    px: "1rem",
    color: red[900],
    // bgcolor: red[200],
    fontWeight: "bold",
    border: "none",
    // color: (theme) => theme?.palette?.font?.gray,
    "&:hover": {
      //   fontWeight: "bold",
      bgcolor: red[50],
      border: "none",
      color: red[900],
    },
  },
};
