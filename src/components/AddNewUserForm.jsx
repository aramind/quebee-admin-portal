import React, { useState } from "react";
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
import genInitialPassword from "../utils/login/genInitialPassword";
import constants from "./configs/constants";
import { useAddUser } from "../hooks/useUserHook";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const AddNewUserForm = ({ setRenderTrigger }) => {
  const axiosPrivate = useAxiosPrivate();

  const { mutate: addUser } = useAddUser();
  //   form
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    // const user = addUser(axiosPrivate, data);
    console.log(data);
    // console.log(user);

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
      password: genInitialPassword(),
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
                <LabelledTextField
                  label="employee id"
                  id="employeeId"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
            </Stack>
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Box flex={1}>
                <LabelledTextField
                  label="last name"
                  id="lastName"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box flex={1}>
                <LabelledTextField
                  label="first name"
                  id="firstName"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box flex={1}>
                <LabelledTextField
                  label="middle name"
                  id="middleName"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box flex={1}>
                <LabelledTextField
                  label="email"
                  id="email"
                  // error={!!errors.email}
                  register={register}
                />
              </Box>
            </Stack>
            <Stack direction="row" gap={2} flexWrap="wrap">
              <Box flex={1}>
                <LabelledTextField
                  label="username"
                  id="username"
                  error={!!errors.name}
                  register={register}
                />
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
                          selectedOption={field.value || ""}
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
                          selectedOption={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      }
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <LabelledTextField
                  label="password"
                  id="password"
                  error={!!errors.password}
                  register={register}
                  defaultValue={genInitialPassword()}
                />
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
