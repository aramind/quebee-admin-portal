import React from "react";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { Box, Stack, Typography } from "@mui/material";
import LabelledTextField from "./form/LabelledTextField";
import LabelledSelect from "./form/LabelledSelect";
import SimpleSelect from "./SimpleSelect";
import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "./form/FormActionButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/user";
import constants from "./configs/constants";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ControlledTextField from "./form-controlled/ControlledTextField";
import { red } from "@mui/material/colors";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;
const DEFAULT_PASSWORD = constants.DEFAULT_PASSWORD;

const AddNewUserForm = ({ setRenderTrigger }) => {
  const axiosPrivate = useAxiosPrivate();
  //   form
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const url = `${API_URL}/register`;
      const response = await axiosPrivate.post(url, data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
    setRenderTrigger((pv) => !pv);
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
      password: { DEFAULT_PASSWORD },
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
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Box flex={1}>
                {/* <LabelledTextField
                  label="employee id"
                  id="employeeId"
                  error={!!errors.name}
                  register={register}
                /> */}
                <ControlledTextField
                  name="employeeId"
                  control={control}
                  label="Employee ID"
                />
              </Box>
            </Stack>
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Box flex={1}>
                <ControlledTextField
                  name="lastName"
                  label="last name"
                  control={control}
                />
                {/* <LabelledTextField
                  label="last name"
                  id="lastName"
                  error={!!errors.name}
                  register={register}
                /> */}
              </Box>
              <Box flex={1}>
                <ControlledTextField
                  label="first name"
                  name="firstName"
                  control={control}
                />
                {/* <LabelledTextField
                  label="first name"
                  id="firstName"
                  error={!!errors.name}
                  register={register}
                /> */}
              </Box>
              <Box flex={1}>
                <ControlledTextField
                  label="middle name"
                  name="middleName"
                  control={control}
                />
                {/* <LabelledTextField
                  label="middle name"
                  id="middleName"
                  error={!!errors.name}
                  register={register}
                /> */}
              </Box>
              <Box flex={1}>
                <ControlledTextField
                  label="email"
                  name="email"
                  control={control}
                />
                {/* <LabelledTextField
                  label="email"
                  id="email"
                  // error={!!errors.email}
                  register={register}
                /> */}
              </Box>
            </Stack>
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Box flex={1}>
                <ControlledTextField
                  label="username"
                  name="username"
                  control={control}
                />
                {/* <LabelledTextField
                  label="username"
                  id="username"
                  error={!!errors.name}
                  register={register}
                /> */}
              </Box>
              <Box flex={1}>
                <Controller
                  name="role"
                  id="role"
                  control={control}
                  render={({ field }) => (
                    <LabelledSelect
                      label="role"
                      select={
                        <SimpleSelect
                          options={constants.ROLES}
                          defaultValue=""
                          selectedOption={field.value || constants?.ROLES?.[1]}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      }
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <Controller
                  name="status"
                  id="status"
                  control={control}
                  render={({ field }) => (
                    <LabelledSelect
                      label="status"
                      select={
                        <SimpleSelect
                          options={constants.STATUS}
                          defaultValue=""
                          selectedOption={field.value || constants?.STATUS?.[0]}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      }
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <ControlledTextField
                  label="password"
                  name="password"
                  control={control}
                />
                {/* <LabelledTextField
                  label="password"
                  id="password"
                  error={!!errors.password}
                  register={register}
                  // defaultValue={genInitialPassword()}
                  defaultValue={DEFAULT_PASSWORD}
                /> */}
              </Box>
            </Stack>
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
    </>
  );
};

export default AddNewUserForm;
