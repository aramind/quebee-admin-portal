import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const ControlledAutocomplete = ({
  control,
  options,
  name = "",
  label = "",
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          fullWidth
          {...field}
          value={field.value}
          onChange={(e, selected) => field.onChange(selected)}
          options={options}
          //   getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} size="small" label={label} />
          )}
        />
      )}
    />
  );
};

export default ControlledAutocomplete;
