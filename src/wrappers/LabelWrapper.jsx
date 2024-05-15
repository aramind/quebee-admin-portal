import React from "react";
import useStyles from "../hooks/useStyles";
import { InputLabel, Stack } from "@mui/material";

const LabelWrapper = ({ children, id, label }) => {
  const styles = useStyles();
  return (
    <Stack width={1} gap={0.25}>
      <InputLabel htmlFor={id} sx={{ ...styles.form.inputLabel }}>
        {label.toUpperCase()}
        {/* {label.charAt(0).toUpperCase() + label.slice(1)} */}
      </InputLabel>
      {children}
    </Stack>
  );
};

export default LabelWrapper;
