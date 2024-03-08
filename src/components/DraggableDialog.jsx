import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { grey } from "@mui/material/colors";
import EditUserModal from "../pages/EditUserModal";
import useStyles from "../hooks/useStyles";
import DialogActionsContainer from "../containers/DialogActionsContainer";
import DialogActionButton from "./form/DialogActionButton";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} sx={{ bgcolor: grey[100], width: "100%" }} />
    </Draggable>
  );
}

const DraggableDialog = ({ open, setOpen, title = "", row }) => {
  const [data, setData] = useState("");

  const styles = useStyles();
  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleSendingData = () => {
    console.log("saving new edited user", data);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle sx={styles.dialog.title} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <EditUserModal row={row} setData={setData} />
        </DialogContent>
        <DialogActions>
          <DialogActionsContainer>
            <DialogActionButton
              label="cancel"
              onClickHandler={() => setOpen(false)}
            />
            <DialogActionButton
              label="save"
              onClickHandler={handleSendingData}
            />
          </DialogActionsContainer>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableDialog;
