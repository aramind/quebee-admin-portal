import { Autocomplete, Box, Chip, MenuItem, TextField } from "@mui/material";
import React from "react";
import FormChip from "./FormChip";
import { cyan, grey, purple, red, teal } from "@mui/material/colors";

const FormMultiAutoComp = ({
  field,
  options,
  selectedOptions,
  handleChange,
  textTransform = "none",
  chipColor = "tertiary.lightest",
}) => {
  return (
    <Autocomplete
      {...field}
      multiple
      freeSolo
      disableCloseOnSelect
      limitTags={40}
      size="small"
      id="free-solo-auto-complete"
      options={options}
      value={selectedOptions}
      onChange={(e, newValue) => {
        handleChange({ target: { value: newValue } });
        field.onChange(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
      renderValue={(selected) => (
        <Box sx={localStyle.box}>
          {selected.map((value) =>
            // <FormChip key={value} value={value} color="tertiary.light" />
            ({ value })
          )}
        </Box>
      )}
      sx={{
        ...localStyle.autocomplete,
        "& .MuiChip-label": {
          textTransform: textTransform,
          fontFamily: (theme) => theme.typography.chip,
          color: "black",
          fontSize: { xs: "0.8rem", md: "1rem" },
        },
        "& .MuiChip-root": {
          bgcolor: chipColor,
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Autocomplete>
  );
};

export default FormMultiAutoComp;

// localStyles
const localStyle = {
  box: { display: "flex", flexWrap: "wrap", gap: 0.5 },
  autocomplete: {
    "& .MuiChip-root:hover": {
      bgcolor: red[100],
      color: grey[900],
      borderColor: red[100],
      cursor: "default",
    },
    // "& .MuiChip-deleteIcon": {
    //   mr: "6px",
    // },
    "& .MuiChip-deleteIcon:hover": {
      // mr: "1px",
      color: "red",
      // fontSize: "1.3rem",
    },
  },
};
