import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import constants from "./configs/constants";
import { red } from "@mui/material/colors";

const RadGroup = ({ field, options, row }) => {
  return (
    <RadioGroup
      aria-labelledby="radio-group"
      value={field.value}
      row={row}
      onChange={(e) => field.onChange(e.target.value)}
    >
      {options.map((option) => (
        <FormControlLabel
          key={typeof option === "object" ? option.key : option}
          value={typeof option === "object" ? option.key : option}
          control={<Radio size="small" />}
          label={typeof option === "object" ? option.value : option}
        />
      ))}
    </RadioGroup>
  );
};

export default RadGroup;
