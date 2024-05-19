import { Slider } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import DifficultySlider from "./DifficultySlider";

const ControlledSliderXX = ({
  name,
  control,
  defaultValue = 0,
  label,
  valu,
}) => {
  return (
    <Controller
      name={name}
      // control={control}
      defaultValue={defaultValue}
      render={({ field }) => <DifficultySlider field={field} />}
    />
  );
};

export default ControlledSliderXX;
