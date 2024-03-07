import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SimpleSelect = ({ options }) => {
  const [selected, setSelected] = useState("");

  console.log(options);
  const handleChange = (e) => setSelected(e.target.value);
  return (
    <FormControl size="small" fullWidth>
      <Select
        labelId="simple-select"
        id="simple-select"
        value={selected}
        onChange={handleChange}
        sx={{ minWidth: "140px", width: 1 }}
      >
        {options?.map((option, index) => {
          return (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
