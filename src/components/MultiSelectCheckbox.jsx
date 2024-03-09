import { CheckBox } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelectCheckbox = ({ options, label, field, selectedValues }) => {
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    field.onChange(typeof value === "string" ? value.split(",") : value);
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  console.log(selected);
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel size="small">{label}</InputLabel>
        <Select
          size="small"
          sx={{ my: "auto" }}
          id="database"
          multiple
          value={selectedValues || []}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          // renderValue={(selected) => selected.join(", ")}
          renderValue={(selected) => (selected || []).join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {/* <CheckBox checked={selected.includes(option)} /> */}
                <ListItemText primary={option} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectCheckbox;
