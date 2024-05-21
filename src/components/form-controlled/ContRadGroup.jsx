import React from "react";
import { Controller } from "react-hook-form";
import LabelWrapper from "../../wrappers/LabelWrapper";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const stringValue = (item) => {
  return typeof item === "string" ? item : item.toString();
};
const ContRadGroup = ({ label, name, options, isRow }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <LabelWrapper id={label} label={label}>
          <RadioGroup
            value={field.value || options[0]}
            row={isRow}
            onChange={(e) => {
              console.log(field);
              field.onChange(e.target.value);
            }}
          >
            {options?.map((option, i) => (
              <FormControlLabel
                key={i}
                value={typeof option === "object" ? option.value : option}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color:
                        (typeof option === "object"
                          ? field.value === stringValue(option.value)
                          : field.value === stringValue(option)) &&
                        "primary.dark",
                      fontWeight:
                        (typeof options === "object"
                          ? field.value === stringValue(option.value)
                          : field.value === stringValue(option)) && "bold",
                    }}
                  >
                    {typeof option === "object" ? option?.label : option}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </LabelWrapper>
      )}
    />
  );
};

export default ContRadGroup;
