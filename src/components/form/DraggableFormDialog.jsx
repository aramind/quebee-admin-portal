import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { grey } from "@mui/material/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../../schemas/user";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import useStyles from "../../hooks/useStyles";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "./DialogActionButton";
import useApiSend from "../../hooks/api/useApiSend";
import useUserReq from "../../hooks/api/useUserReq";
import UserInfoSection from "./form-sections/UserInfoSection";

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
const DraggableFormDialog = ({ open, setOpen, title = "", row }) => {
  const styles = useStyles();

  const { edit } = useUserReq();
  // hooks

  const { mutate: updateUser } = useApiSend(
    edit,
    () => {
      alert("Update successful");
    },
    (err) => {
      alert("Updating encountered a problem. Please Try again later.");
    },
    ["users"],
    {}
  );

  // form

  const { handleSubmit, formState, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    defaultValues: { ...row },
  });

  const { errors } = formState;
  console.log(errors);

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = (data) => {
    alert("CLICKED ON SUBMIT");
    console.log(data);
    updateUser(data, data?.employeeId);
  };

  const onError = (err) => {
    alert("Encountered an error updating user. Please try again later");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
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
        <DialogActions>
          <DialogActionsContainer>
            <DialogActionButton
              label="cancel"
              onClickHandler={() => setOpen(false)}
            />
            <DialogActionButton
              label="save"
              onClickHandler={() => {
                handleSubmit(onSubmit, onError)();
                setOpen(false);
              }}
            />
          </DialogActionsContainer>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableFormDialog;
