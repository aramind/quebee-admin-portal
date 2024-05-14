import { Autocomplete, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const AutocompleteSelector = ({ value, setValue, options, label = "" }) => {
  return (
    <Autocomplete
      // className="outlined"
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      options={options || []}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          placeholder={`Type here to select from ${label}...`}
          sx={{ bgcolor: grey[50] }}
        />
      )}
    />
  );
};

export default AutocompleteSelector;
