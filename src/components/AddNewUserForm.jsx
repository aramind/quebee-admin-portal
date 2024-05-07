import React from "react";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { Stack, Typography } from "@mui/material";
import LabelledSelect from "./form/LabelledSelect";
import SimpleSelect from "./SimpleSelect";
import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "./form/FormActionButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/user";
import constants from "./configs/constants";
import ControlledTextField from "./form-controlled/ControlledTextField";
import useApiSend from "../hooks/api/useApiSend";
import useUserReq from "../hooks/api/useUserReq";
import { DevTool } from "@hookform/devtools";

const RowWrapper = ({ children }) => {
  return (
    <Stack
      direction="row"
      gap={2}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      {children}
    </Stack>
  );
};

const initialValues = {
  role: constants.ROLES?.[1], // Initial value for role select
  status: constants.STATUS?.[0], // Initial value for status select
  password: constants.DEFAULT_PASSWORD,
};

const AddNewUserForm = ({ successFn }) => {
  const { register } = useUserReq();

  const { mutate: registerUser } = useApiSend(
    register,
    () => {
      successFn();
      alert("New User added successfully");
    },
    (err) => {
      console.log(err);
      alert("Encountered an error adding the new user. Try again later", err);
    },
    ["users"],
    {}
  );
  //   form
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    console.log("CLIKED SUBMIT NEW USER", data);
    registerUser(data);
  };

  // handlers
  // todo
  const handleClear = () => {
    reset({
      lastName: "",
      firstName: "",
      middleName: "",
      userName: "",
      email: "",
      role: "",
      status: "",
      // password: genInitialPassword(),
      password: constants?.DEFAULT_PASSWORD,
    });
  };

  const onError = (error) => {
    console.log("Error submitting form", error);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper>
          <Stack gap={1}>
            <Typography variant="h6">Add New User</Typography>
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
          <br />
          <FormActionsContainer>
            <FormActionButton
              label="clear"
              onClickHandler={handleClear}
              variant="outlined"
            />
            <FormActionButton label="save" variant="contained" type="submit" />
          </FormActionsContainer>
        </ElevatedSectionWrapper>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default AddNewUserForm;
