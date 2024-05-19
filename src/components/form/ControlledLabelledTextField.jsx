import { InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { Controller } from "react-hook-form";

const ControlledLabelledTextField = ({
  label = "",
  size = "small",
  id = "",
  variant = "outlined",
  error = false,
  focused = false,
  multiline = false,
  fullWidth = true,
  minRows = 0,
  defaultValue = "",
  disabled = false,
  control,
}) => {
  const styles = useStyles();
  return (
    <Stack width={1} gap={0.25}>
      <InputLabel
        htmlFor={label}
        sx={{ ...styles.form.inputLabel, color: error ? "red" : "font.gray" }}
      >
        {label.toUpperCase()}
      </InputLabel>
      <Controller
        name={id}
        // control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth={fullWidth}
            size={size}
            id={id}
            variant={variant}
            error={error}
            focused={focused}
            multiline={multiline}
            minRows={minRows}
            // defaultValue={defaultValue}
            // TOCHECK
            value={defaultValue}
            disabled={disabled}
          />
        )}
      />
    </Stack>
  );
};

export default ControlledLabelledTextField;
