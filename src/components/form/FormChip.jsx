import { Chip } from "@mui/material";
import React from "react";

const FormChip = ({ value, color }) => {
  return (
    <Chip
      label={value}
      size="small"
      sx={{ minWidth: "50px", bgcolor: color }}
    />
  );
};

export default FormChip;
