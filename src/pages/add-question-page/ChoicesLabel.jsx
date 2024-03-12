import { InputLabel } from "@mui/material";
import React from "react";

const ChoicesLabel = ({ label, fullW, fullH }) => {
  return (
    <InputLabel
      htmlFor="question-form-label"
      sx={{
        height: fullH && "100%",
        width: fullW ? "100%" : "51px",
        display: "flex",
        justifyContent: { xs: "start", md: "center" },
        alignItems: "center",
        // fontWeight: "bold",
        fontSize: "2rem",
        color: "primary.main",
      }}
      className="centered-content"
    >
      {label?.toUpperCase()}.
    </InputLabel>
  );
};

export default ChoicesLabel;
