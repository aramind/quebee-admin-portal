import { Button } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";

const DialogActionButton = ({
  label,
  type,
  disabled,
  onClickHandler,
  onSubmit,
  variant = "text",
  otherStyles = {},
}) => {
  const styles = useStyles();

  return (
    <Button
      disabled={disabled}
      onClick={onClickHandler}
      variant={variant}
      sx={{ ...styles.dialog.actionButton, ...otherStyles }}
    >
      {label}
    </Button>
  );
};

export default DialogActionButton;
