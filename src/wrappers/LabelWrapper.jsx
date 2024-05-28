import React from "react";
import useStyles from "../hooks/useStyles";
import { InputLabel, Stack } from "@mui/material";
import { red } from "@mui/material/colors";

const getErrorLabel = (hasError, error) => {
  if (!hasError) return "";
  if (error === "Required") return "";
  else {
    const formattedError = `>> ${error}`;
    return formattedError.toUpperCase();
  }
};

const LabelWrapper = ({ children, id, label, hasError, error }) => {
  const styles = useStyles();

  return (
    <Stack width={1} gap={0.25}>
      <InputLabel
        htmlFor={id}
        sx={{ ...styles.form.inputLabel, color: hasError && hasErrorStyles }}
      >
        {label.toUpperCase() + " " + getErrorLabel(hasError, error)}
        {/* {label.charAt(0).toUpperCase() + label.slice(1)} */}
      </InputLabel>
      {children}
    </Stack>
  );
};

export default LabelWrapper;

const hasErrorStyles = {
  color: red[500],
  // fontWeight: "bold",
};
