import { FormControl, MenuItem, Select } from "@mui/material";
import { teal } from "@mui/material/colors";

const SimpleSelect = ({
  options,
  selectedOption,
  onChange,
  disabled,
  defaultValue,
  highlighted,
}) => {
  return (
    <FormControl size="small" fullWidth>
      <Select
        disabled={disabled}
        labelId="simple-select"
        id="simple-select"
        value={selectedOption || defaultValue}
        onChange={onChange}
        sx={
          highlighted && {
            // minWidth: "140px",
            width: 1,
            "& .MuiSelect-select": {
              textTransform: "uppercase",
              fontWeight: "bold",
              backgroundColor: selectedOption ? teal["50"] : "transparent",
              color: "primary.dark",
            },
            "& .MuiSelect-select:hover": {
              backgroundColor: selectedOption ? teal["100"] : "transparent",
            },
          }
        }
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
