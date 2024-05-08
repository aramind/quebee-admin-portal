import React from "react";
import { Controller } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";
import RadGroup from "../RadGroup";

const ControlledRadioGroup = ({ label, name, control, options, row }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LabelWrapper id={label} label={label}>
          <RadGroup field={field} options={options} row={row} />
        </LabelWrapper>
      )}
    />
  );
};

export default ControlledRadioGroup;
