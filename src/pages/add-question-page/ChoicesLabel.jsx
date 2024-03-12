import { InputLabel } from "@mui/material";
import React from "react";

const ChoicesLabel = ({ label, fullW, fullH }) => {
  return (
    <InputLabel
      htmlFor="question-form-label"
      sx={{
        height: fullH && "100%",
        width: fullW && "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // fontWeight: "bold",
        fontSize: "1.5rem",
      }}
      className="centered-content"
    >
      {label?.toUpperCase()}.
    </InputLabel>
  );
};

export default ChoicesLabel;
