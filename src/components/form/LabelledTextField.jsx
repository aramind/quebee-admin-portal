import { InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";

const LabelledTextField = ({
  label = "",
  size = "small",
  id = "",
  variant = "outlined",
  error = false,
  focused = false,
  register,
  multiline = false,
  fullWidth = true,
  minRows = 0,
  defaultValue = "",
}) => {
  const styles = useStyles();
  return (
    <Stack width={1} gap={0.25}>
      <InputLabel
        htmlFor={label}
        sx={{ ...styles.form.inputLabel, color: error ? "red" : "black" }}
      >
        {label.toUpperCase()}
      </InputLabel>
      <TextField
        fullWidth={fullWidth}
        size={size}
        id={id}
        variant={variant}
        error={error}
        focused={focused}
        multiline={multiline}
        {...register(id)}
        minRows={minRows}
        defaultValue={defaultValue}
      />
    </Stack>
  );
};

export default LabelledTextField;
