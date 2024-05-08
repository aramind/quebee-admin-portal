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
import SimpleSelect from "../SimpleSelect";
import constants from "../configs/constants";
import useStyles from "../../hooks/useStyles";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "./DialogActionButton";
import useApiSend from "../../hooks/api/useApiSend";
import useUserReq from "../../hooks/api/useUserReq";
import ControlledTextField from "../form-controlled/ControlledTextField";
import LabelledSelect from "./LabelledSelect";
import RowWrapper from "../../wrappers/RowWrapper";

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

  //   wrapper
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
                <Stack gap={1}>
                  <RowWrapper>
                    <ControlledTextField
                      name="employeeId"
                      control={control}
                      label="Employee ID"
                    />
                  </RowWrapper>
                  <RowWrapper>
                    <ControlledTextField
                      name="lastName"
                      label="last name"
                      control={control}
                    />

                    <ControlledTextField
                      label="first name"
                      name="firstName"
                      control={control}
                    />

                    <ControlledTextField
                      label="middle name"
                      name="middleName"
                      control={control}
                    />

                    <ControlledTextField
                      label="email"
                      name="email"
                      control={control}
                    />
                  </RowWrapper>

                  <RowWrapper>
                    <ControlledTextField
                      label="username"
                      name="username"
                      control={control}
                    />

                    <Controller
                      name="role"
                      id="role"
                      control={control}
                      render={({ field }) => (
                        <Stack flex={1}>
                          <LabelledSelect
                            label="role"
                            select={
                              <SimpleSelect
                                options={constants.ROLES}
                                defaultValue=""
                                selectedOption={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            }
                          />
                        </Stack>
                      )}
                    />
                    <Controller
                      name="status"
                      id="status"
                      control={control}
                      render={({ field }) => (
                        <Stack flex={1}>
                          <LabelledSelect
                            label="status"
                            select={
                              <SimpleSelect
                                options={constants.STATUS}
                                selectedOption={field.value || " "}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            }
                          />
                        </Stack>
                      )}
                    />
                    <ControlledTextField
                      label="password"
                      name="password"
                      control={control}
                    />
                  </RowWrapper>
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
