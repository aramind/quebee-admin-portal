import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SimpleSelect = () => {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => setSelected(e.target.value);
  return (
    <FormControl sx={{ width: 1 }} size="small">
      <Select
        labelId="simple-select"
        id="simple-select"
        value={selected}
        onChange={handleChange}
        sx={{ width: "120px" }}
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="editor">Editor</MenuItem>
        <MenuItem value="viewer">Viewer</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
