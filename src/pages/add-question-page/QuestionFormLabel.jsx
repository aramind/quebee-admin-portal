import { InputLabel } from "@mui/material";
import React from "react";

const QuestionFormLabel = ({ label, fullW, fullH }) => {
  return (
    <InputLabel
      htmlFor="question-form-label"
      sx={{
        width: fullW && "100%",
        textAlign: "center",
        fontWeight: "bold",
        color: "primary.main",
      }}
      className="centered-content"
    >
      {label?.toUpperCase()} :
    </InputLabel>
  );
};

export default QuestionFormLabel;
