import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React from "react";

const RadGroup = ({ field, options, row }) => {
  console.log("field.value:", field.value);
  return (
    <RadioGroup
      aria-labelledby="radio-group"
      value={field.value}
      row={row}
      onChange={(e) => field.onChange(e.target.value)}
      sx={{ pt: 0.5, pb: 0, px: 2 }}
    >
      {options.map((option) => (
        <FormControlLabel
          key={typeof option === "object" ? option.key : option}
          value={typeof option === "object" ? option.key : option}
          control={<Radio size="small" />}
          // label={typeof option === "object" ? option.value : option}
          label={
            <Typography
              sx={{
                fontSize: "0.9rem",
                color:
                  (typeof option === "object"
                    ? field.value === option.key
                    : field.value === option) && "primary.dark",
                fontWeight:
                  (typeof option === "object"
                    ? field.value === option.key
                    : field.value === option) && "bold",
              }}
            >
              {typeof option === "object" ? option.value : option}
            </Typography>
          }
        />
      ))}
    </RadioGroup>
  );
};

export default RadGroup;
