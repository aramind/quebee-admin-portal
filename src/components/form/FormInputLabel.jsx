import { InputLabel } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";

const FormInputLabel = ({ label, hasError, styling }) => {
  const styles = useStyles();
  return (
    <InputLabel
      htmlFor={label}
      sx={{
        ...styles.form.inputLabel,
        ...(hasError && { color: "red" }),
        ...styling,
      }}
    >
      {label && label.toUpperCase()}
    </InputLabel>
  );
};

export default FormInputLabel;
