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
      onClick={onClickHandler}
      variant={variant}
      disabled={disabled}
      sx={{ ...styles.form.primaryActionButton }}
    >
      {label}
    </Button>
  );
};

export default FormActionButton;
