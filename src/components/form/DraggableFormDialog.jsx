import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { grey } from "@mui/material/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../../schemas/user";
import { Controller, useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import LabelledTextField from "./LabelledTextField";
import FormInputLabel from "./FormInputLabel";
import SimpleSelect from "../SimpleSelect";
import constants from "../configs/constants";
import useStyles from "../../hooks/useStyles";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "./DialogActionButton";
import { useEditUser } from "../../hooks/useUserHook";

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

  // hooks
  const { mutate: editUser } = useEditUser();
  //   form
  const { register, handleSubmit, formState, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const { errors } = formState;

  const onError = (err) => {
    console.log("ERROR creating user", err);
  };

  //   wrapper
  const BoxWrapper = ({ children }) => {
    return (
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          flex: "1 1 auto",
        }}
      >
        {children}
      </Box>
    );
  };
  const handleClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = (data) => {
    editUser(data);
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
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Box width="100%">
              <ElevatedSectionWrapper>
                <Stack
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <BoxWrapper>
                    <LabelledTextField
                      label="employee id"
                      id="employeeId"
                      error={!!errors.employeeId}
                      register={register}
                      defaultValue={row.employeeId}
                      disabled
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <FormInputLabel label="role" />
                    <Controller
                      name="role"
                      control={control}
                      defaultValue={row.role || ""}
                      render={({ field }) => (
                        <SimpleSelect
                          options={constants.ROLES}
                          selectedOption={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <FormInputLabel label="status" />
                    <Controller
                      name="status"
                      control={control}
                      defaultValue={row.status || ""}
                      render={({ field }) => (
                        <SimpleSelect
                          options={constants.STATUS}
                          selectedOption={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <LabelledTextField
                      label="last name"
                      id="lastName"
                      error={!!errors.lastName}
                      register={register}
                      defaultValue={row.lastName}
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <LabelledTextField
                      label="first name"
                      id="firstName"
                      error={!!errors.firstName}
                      register={register}
                      defaultValue={row.firstName}
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <LabelledTextField
                      label="middle name"
                      id="middleName"
                      error={!!errors.middleName}
                      register={register}
                      defaultValue={row.middleName}
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <LabelledTextField
                      label="username"
                      id="username"
                      error={!!errors.name}
                      register={register}
                      defaultValue={row.username}
                    />
                  </BoxWrapper>

                  <BoxWrapper>
                    <LabelledTextField
                      label="password"
                      id="password"
                      error={!!errors.password}
                      register={register}
                      defaultValue={row.password}
                    />
                  </BoxWrapper>
                </Stack>
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
