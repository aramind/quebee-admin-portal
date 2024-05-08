import React, { useEffect, useState } from "react";
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
import RowWrapper from "../wrappers/RowWrapper";
import ControlledSimpleSelect from "./form-controlled/ControlledSimpleSelect";
import UserInfoSection from "./form/form-sections/UserInfoSection";

const initialValues = {
  role: constants.ROLES?.[1], // Initial value for role select
  status: constants.STATUS?.[0], // Initial value for status select
  password: constants.DEFAULT_PASSWORD,
};

const AddNewUserForm = ({ successFn }) => {
  const { register } = useUserReq();
  const [forceRender, setForceRender] = useState(false);

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
    registerUser(data);
  };

  // handlers
  // todo
  const handleClear = () => {
    reset();
    setForceRender((prevState) => !prevState);
  };

  const onError = (error) => {
    console.log("Error submitting form", error);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper>
          <UserInfoSection control={control} title="Add New User" />
          {/* <Stack gap={1}>
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
              <ControlledSimpleSelect
                label="role"
                name="role"
                control={control}
                options={constants?.ROLES || []}
              />
              <ControlledSimpleSelect
                label="status"
                name="status"
                control={control}
                options={constants?.STATUS || []}
              />

              <ControlledTextField
                label="password"
                name="password"
                control={control}
              />
            </RowWrapper>
          </Stack> */}
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
