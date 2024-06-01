import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import Draggable from "react-draggable";
import useStyles from "../hooks/useStyles";
import DialogActionsContainer from "../containers/DialogActionsContainer";
import DialogActionButton from "./form/DialogActionButton";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root]'}
    >
      <Paper {...props} sx={{ bgcolor: grey[100], width: "100%" }} />
    </Draggable>
  );
};
const ConfirmActionDialog = ({
  open,
  setOpen,
  title = "",
  content = "",
  handleConfirm,
  row,
}) => {
  const styles = useStyles();

  const handleClose = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog"
    >
      <DialogTitle sx={styles?.dialog?.title}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <DialogActionsContainer>
          <DialogActionButton
            label="cancel"
            onClickHandler={() => setOpen(false)}
          />
          <DialogActionButton
            label="confirm"
            onClickHandler={() => {
              console.log("Confirm button clicked");
              // handleConfirm();
              console.log(row);
              setOpen(false);
            }}
          />
        </DialogActionsContainer>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;
