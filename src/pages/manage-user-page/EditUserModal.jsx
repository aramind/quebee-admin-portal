import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import Draggable from "react-draggable";
import useStyles from "../../hooks/useStyles";
import useUserReq from "../../hooks/api/useUserReq";
import useApiSend from "../../hooks/api/useApiSend";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../../schemas/user";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import UserInfoSection from "../../components/form/form-sections/UserInfoSection";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "../../components/form/DialogActionButton";

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

const EditUserModal = ({ open, setOpen, title = "", row }) => {
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

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    defaultValues: { ...row },
  });

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = async (data) => {
    updateUser(data);
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
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default EditUserModal;
