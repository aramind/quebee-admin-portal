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

const MultiSelectCheckbox = ({ options, register, formState, label }) => {
  const [selected, setSelected] = useState([]);
  const { errors, dirtyFields } = formState;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelected(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel size="small">{label}</InputLabel>
        <Select
          size="small"
          sx={{ my: "auto" }}
          id="database"
          // focused={dirtyFields.database && !errors.database}
          // error={!!errors.database}
          multiple
          value={selected}
          onChange={handleChange}
          input={
            <OutlinedInput
              label={label}
              focused={dirtyFields.database && !errors.database}
              error={!!errors.database}
              {...register("database")}
            />
          }
          renderValue={(selected) => selected.join(", ")}
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
