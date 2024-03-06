import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import AddUser from "../pages/AddUser";
import { grey } from "@mui/material/colors";

const CustomModal = ({ open, setOpen }) => {
  console.log("rendring custom modal");
  const handleClose = (e) => {
    e.stopPropagation();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AddUser />
          <br />
          <Stack direction="row" gap={1} justifyContent="right">
            <Button variant="contained" sx={{ width: "100px" }}>
              Save
            </Button>
            <Button variant="outlined" sx={{ width: "70px" }}>
              Reset
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "70px" }}
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: grey[200],
  // border: "2px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
