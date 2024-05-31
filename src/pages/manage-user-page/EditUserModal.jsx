import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
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
import useFormSubmit from "../../hooks/useFormSubmit";
import FormWrapper from "../../wrappers/FormWrapper";

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
  // console.log(row);
  const { mutate: updateUser } = useApiSend(edit, ["users"]);

  // form

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    defaultValues: { ...row },
  });

  const formMethods = { handleSubmit, control, errors };

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleFormDataSubmit = async (rawData) => {
    updateUser({ data: rawData, id: row?.id });
  };

  return (
    <>
      <FormWrapper formMethods={formMethods}>
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
            <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
              <Stack spacing={1}>
                <ElevatedSectionWrapper>
                  <UserInfoSection />
                </ElevatedSectionWrapper>
                <Typography pl={1} variant="caption" color={grey[700]}>
                  All fields marked with are required.
                </Typography>
              </Stack>
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
                  handleSubmit(handleFormDataSubmit)();
                  setOpen(false);
                }}
              />
            </DialogActionsContainer>
          </DialogActions>
        </Dialog>
        {/* <DevTool control={control} /> */}
      </FormWrapper>
    </>
  );
};

export default EditUserModal;
