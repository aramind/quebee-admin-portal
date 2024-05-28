import { Button } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";

const FormActionButton = ({
  label,
  type,
  onClickHandler,
  variant,
  disabled,
}) => {
  const styles = useStyles();

  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClickHandler}
      sx={{ ...styles.form.primaryActionButton }}
    >
      {label}
    </Button>
  );
};

export default FormActionButton;
