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
import { grey, teal } from "@mui/material/colors";
import genInitialPassword from "../utils/login/genInitialPassword";
import AddUserModal from "../pages/AddUserModal";

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
        <DialogTitle
          sx={{
            cursor: "move",
            fontWeight: "bold",
            borderBottom: "2px solid",
            borderColor: "primary.light",
            mb: 2,
            py: 1,
          }}
          id="draggable-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <AddUserModal />
        </DialogContent>
        <DialogActions>
          <Button>Clear</Button>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableDialog;
