import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";

const ControlledTextField = ({
  label,
  name,
  control,
  customDefaultValue,
  tfProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
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
      )}
    />
  );
};

export default ControlledTextField;
