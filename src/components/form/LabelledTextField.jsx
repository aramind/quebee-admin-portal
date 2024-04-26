import { InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { Controller } from "react-hook-form";

const LabelledTextField = ({
  control,
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
  disabled = false,
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
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            size={size}
            id={id}
            variant={variant}
            error={error}
            focused={focused}
            multiline={multiline}
            minRows={minRows}
            disabled={disabled}
            {...field}
          />
        )}
      />
      {/* <TextField
        fullWidth={fullWidth}
        size={size}
        id={id}
        variant={variant}
        error={error}
        focused={focused}
        multiline={multiline}
        {...(controlled ? { ...register(id) } : {})}
        minRows={minRows}
        defaultValue={defaultValue}
        disabled={disabled}
      /> */}
    </Stack>
  );
};

export default LabelledTextField;
