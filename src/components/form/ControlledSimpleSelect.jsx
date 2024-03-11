import React from "react";
import { Controller } from "react-hook-form";
import LabelledSelect from "./LabelledSelect";
import SimpleSelect from "../SimpleSelect";

const ControlledSimpleSelect = ({
  control,
  name,
  id,
  label,
  options,
  highlighted,
}) => {
  return (
    <Controller
      name={name}
      id={id}
      control={control}
      render={({ field }) => (
        <LabelledSelect
          label={label}
          select={
            <SimpleSelect
              options={options}
              selectedOption={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              highlighted={highlighted}
            />
          }
        />
      )}
    />
  );
};

export default ControlledSimpleSelect;
