import { Typography } from "@mui/material";
import React from "react";

const Label = ({ label }) => {
  return (
    <Typography sx={{ mr: "5px" }}>
      {label && `${label.charAt(0).toUpperCase() + label.slice(1)} :`}
      {/* {label?.toUpperCase()}: */}
    </Typography>
  );
};

export default Label;
