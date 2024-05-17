import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import LabelledSelect from "../form/LabelledSelect";
import FormMultiAutoComp from "../form/FormMultiAutoComp";

const ControlledChipMultiAutoComp = ({
  control,
  name,
  id,
  label,
  options,
  free,
  chipColor,
  textTransform,
  defaultValue,
}) => {
  // console.log(defaultValue);
  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);

  // useEffect(() => {
  //   setSelectedOptions(defaultValues || []);
  // }, [defaultValues]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Controller
      name={name}
      id={id}
      control={control}
      render={({ field }) => (
        <LabelledSelect
          label={label}
          select={
            <FormMultiAutoComp
              field={field}
              selectedOptions={selectedOptions}
              handleChange={handleChange}
              options={options}
              free={free}
              chipColor={chipColor}
              textTransform={textTransform}
            />
          }
        />
      )}
    />
  );
};

export default ControlledChipMultiAutoComp;
