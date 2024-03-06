import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SimpleSelect = ({ options }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => setSelected(e.target.value);
  return (
    <FormControl size="small">
      <Select
        labelId="simple-select"
        id="simple-select"
        value={selected}
        onChange={handleChange}
        sx={{ minWidth: "140px" }}
      >
        <MenuItem value={options?.[0]}>{options?.[0]}</MenuItem>
        <MenuItem value={options?.[1]}>{options?.[1]}</MenuItem>
        <MenuItem value={options?.[2]}>{options?.[2]}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
