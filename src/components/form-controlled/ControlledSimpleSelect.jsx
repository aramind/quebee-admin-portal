import { Stack } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import LabelledSelect from "../form/LabelledSelect";
import SimpleSelect from "../SimpleSelect";

const ControlledSimpleSelect = ({ label, name, control, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack flex={1}>
          <LabelledSelect
            label={label}
            select={
              <SimpleSelect
                options={options}
                selectedOption={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            }
          />
        </Stack>
      )}
    />
  );
};

export default ControlledSimpleSelect;
