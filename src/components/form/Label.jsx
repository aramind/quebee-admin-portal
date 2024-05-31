import { Typography } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";

const Label = ({ label, labelOptions }) => {
  const styles = useStyles();
  return (
    <Typography
      sx={{
        mr: "5px",
        ...styles.form.inputLabel,

        ...labelOptions,
      }}
    >
      {label && `${label.charAt(0).toUpperCase() + label.slice(1)} :`}
      {/* {label?.toUpperCase()}: */}
    </Typography>
  );
};

export default Label;
