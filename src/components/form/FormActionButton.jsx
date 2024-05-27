import { Button } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useFormContext } from "react-hook-form";

const FormActionButton = ({
  label,
  type,
  onClickHandler,
  variant,
  disabled,
}) => {
  const { touchedFields } = useFormContext();

  const styles = useStyles();

  return (
    <Button
      type={type}
      onClick={onClickHandler}
      variant={variant}
      disabled={touchedFields && !Object.keys(touchedFields)?.length}
      sx={{ ...styles.form.primaryActionButton }}
    >
      {label}
    </Button>
  );
};

export default FormActionButton;
