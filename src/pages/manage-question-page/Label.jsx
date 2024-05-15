import { Typography } from "@mui/material";
import React from "react";

const Label = ({ label, labelOptions }) => {
  return (
    <Typography sx={{ mr: "5px", ...labelOptions }}>
      {label && `${label.charAt(0).toUpperCase() + label.slice(1)} :`}
      {/* {label?.toUpperCase()}: */}
    </Typography>
  );
};

export default Label;
