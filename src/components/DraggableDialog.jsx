import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import AddUser from "../pages/AddUser";
import { grey } from "@mui/material/colors";
import genInitialPassword from "../utils/login/genInitialPassword";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} sx={{ bgcolor: grey[100] }} />
    </Draggable>
  );
}

const DraggableDialog = ({ open, setOpen, title = "" }) => {
  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleSave = () => {
    console.log("saving new user");
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <AddUser />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button>Clear</Button>
          <Button onClick={() => setOpen(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableDialog;
