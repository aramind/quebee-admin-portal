import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import LabelledSelect from "../form/LabelledSelect";
import FormMultiAutoComp from "../form/FormMultiAutoComp";

const ControlledChipMultiAutoComp = ({
  name,
  id,
  label,
  options,
  free,
  chipColor,
  textTransform,
  defaultValue,
}) => {
  const { control } = useFormContext();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(control?._options?.defaultValues?.[name] || []);
  }, [control?._options?.defaultValues, name]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  const { errors } = useFormContext();
  return (
    <Controller
      name={name}
      id={id}
      render={({ field }) => (
        <LabelledSelect
          label={label}
          hasError={!!errors?.[name]}
          select={
            <FormMultiAutoComp
              field={field}
              selectedOptions={selectedOptions}
              handleChange={handleChange}
              options={options}
              free={free}
              chipColor={chipColor}
              textTransform={textTransform}
              name={name}
            />
          }
        />
      )}
    />
  );
};

export default ControlledChipMultiAutoComp;
