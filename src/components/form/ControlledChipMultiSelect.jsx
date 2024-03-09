import React, { useState } from "react";
import { Controller } from "react-hook-form";
import LabelledSelect from "./LabelledSelect";
import {
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";

import constants from "../configs/constants";
import auroraTheme from "../../themes/auroraTheme";

const ControlledChipMultiSelect = ({ control, name, id, label, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //   console.log("From mulichipcomp:", selectedOptions);
  return (
    <Controller
      name={name}
      id={id}
      control={control}
      render={({ field }) => (
        <LabelledSelect
          label={label}
          select={
            <Select
              {...field}
              multiple
              value={selectedOptions}
              onChange={(e) => {
                handleChange(e);
                field.onChange(e);
              }}
              input={<OutlinedInput id="select-mc" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      //   size="small"
                      sx={{ minWidth: "50px", bgcolor: "tertiary.light" }}
                    />
                  ))}
                </Box>
              )}
            >
              {constants.COURSES.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          }
        />
      )}
    />
  );
};

export default ControlledChipMultiSelect;
