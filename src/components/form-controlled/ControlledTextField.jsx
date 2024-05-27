import { Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";
const ControlledTextField = ({
  label = "",
  name,

  customDefaultValue,
  tfProps,
  flex,
}) => {
  const { errors, dirtyFields } = useFormContext();

  const touchedStyles = {
    "& fieldset": {
      borderWidth: "1.5px",
      borderColor: "primary.main",
    },
  };

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Stack flex={flex || 1}>
          <LabelWrapper
            id={name}
            label={label}
            hasError={!!errors?.[name]}
            error={errors?.[name]?.message}
          >
            <TextField
              {...tfProps}
              {...field}
              value={field.value || customDefaultValue}
              id={name}
              size={tfProps?.size || "small"}
              variant={tfProps?.variant || "outlined"}
              fullWidth={tfProps?.fullWidth || true}
              error={!!errors?.[name]}
              sx={dirtyFields?.[name] ? { ...touchedStyles } : {}}
            />
          </LabelWrapper>
        </Stack>
      )}
    />
  );
};

export default ControlledTextField;
