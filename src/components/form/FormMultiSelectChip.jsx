import { Box, MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";
import FormChip from "./FormChip";

const FormMultiSelectChip = ({
  field,
  options,
  selectedOptions,
  handleChange,
}) => {
  return (
    <Select
      {...field}
      multiple
      value={selectedOptions}
      onChange={(e) => {
        handleChange(e);
        field.onChange(e);
      }}
      input={<OutlinedInput id="select-mc" />}
      renderValue={(selected) => (
        <Box sx={localStyle.box}>
          {selected.map((value) => (
            <FormChip key={value} value={value} color="tertiary.light" />
          ))}
        </Box>
      )}
      sx={localStyle.select}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FormMultiSelectChip;

// localStyles
const localStyle = {
  box: { display: "flex", flexWrap: "wrap", gap: 0.5 },
  select: {
    "& .MuiSelect-multiple": {
      py: "8.5px",
      height: "24px",
    },
  },
};
