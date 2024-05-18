import { Stack, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";

const ControlledTextField = ({
  label = "",
  name,
  // control,
  customDefaultValue,
  tfProps,
  flex,
}) => {
  return (
    <Controller
      name={name}
      // control={control}
      render={({ field }) => (
        <Stack flex={flex || 1}>
          <LabelWrapper id={name} label={label}>
            <TextField
              {...tfProps}
              {...field}
              value={field.value || customDefaultValue}
              id={name}
              size={tfProps?.size || "small"}
              variant={tfProps?.variant || "outlined"}
              fullWidth={tfProps?.fullWidth || true}
            />
          </LabelWrapper>
        </Stack>
      )}
    />
  );
};

export default ControlledTextField;
