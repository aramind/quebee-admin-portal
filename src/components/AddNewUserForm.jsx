import React from "react";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { Box, Stack, Typography } from "@mui/material";
import LabelledTextField from "./form/LabelledTextField";
import LabelledSelect from "./form/LabelledSelect";
import SimpleSelect from "./SimpleSelect";
import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "./form/FormActionButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/user";
import constants from "./configs/constants";
import genInitialPassword from "../utils/login/genInitialPassword";

const AddNewUserForm = () => {
  //   form
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Creating user...", data);
  };

  const onError = (err) => {
    console.log("ERROR creating user", err);
  };
  // handlers
  // todo
  const handleClear = () => {};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper>
          <Stack gap={1}>
            <Typography variant="h6">Add New User</Typography>
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
                  label="username"
                  id="username"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box flex={1}>
                <LabelledSelect
                  label="role"
                  select={<SimpleSelect options={constants.ROLES} />}
                />
              </Box>
              <Box flex={1}>
                <LabelledSelect
                  label="status"
                  select={<SimpleSelect options={constants.STATUS} />}
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
