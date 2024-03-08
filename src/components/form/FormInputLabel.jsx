import { InputLabel } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";

const FormInputLabel = ({ label, styling }) => {
  const styles = useStyles();
  return (
    <InputLabel htmlFor={label} sx={{ ...styles.form.inputLabel, ...styling }}>
      {label.toUpperCase()}
    </InputLabel>
  );
};

export default FormInputLabel;
