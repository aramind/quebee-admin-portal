import { FormControl, MenuItem, Select } from "@mui/material";

const SimpleSelect = ({ options, selectedOption, onChange }) => {
  return (
    <FormControl size="small" fullWidth>
      <Select
        labelId="simple-select"
        id="simple-select"
        value={selectedOption}
        onChange={onChange}
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
