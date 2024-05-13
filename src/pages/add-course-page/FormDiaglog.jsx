import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PaperComponent from "../../components/PaperComponent";

const FormDiaglog = ({ open, setOpen, title = "", data = [] }) => {
  const styles = useStyles();

  const { handleSubmit, control } = useForm({
    mode: "onTouched",
  });

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = async (data) => {
    alert("SUBMITTED");
  };

  const onError = (err) => {
    alert("Encountered an error. Try again.");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={<PaperComponent />}
        aria-labelledby="draggable-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={styles.dialog.title} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Box>
              <ElevatedSectionWrapper>
                <UserInfoSection control={control} />
              </ElevatedSectionWrapper>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormDiaglog;
