import React, { useState } from "react";
import { Controller } from "react-hook-form";
import LabelledSelect from "./LabelledSelect";
import FormMultiSelectChip from "./FormMultiSelectChip";

const ControlledChipMultiSelect = ({ control, name, id, label, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // console.log("From mulichipcomp:", selectedOptions);
  return (
    <Controller
      name={name}
      id={id}
      // control={control}
      render={({ field }) => (
        <LabelledSelect
          label={label}
          select={
            <FormMultiSelectChip
              field={field}
              selectedOptions={selectedOptions}
              handleChange={handleChange}
              options={options}
            />
          }
        />
      )}
    />
  );
};

export default ControlledChipMultiSelect;
