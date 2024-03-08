import React from "react";
import useStyles from "../hooks/useStyles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/user";
import { Box, Stack } from "@mui/material";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import LabelledTextField from "../components/form/LabelledTextField";
import SimpleSelect from "../components/SimpleSelect";
import FormInputLabel from "../components/form/FormInputLabel";
import genInitialPassword from "../utils/login/genInitialPassword";

// CONSTANT to delete todo
const ROLES = ["admin", "editor", "viewer"];
const STATUS = ["active", "deactivated"];

const EditUserModal = ({ row }) => {
  console.log("ACCEPTED ROW:", row);
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

  console.log(row.role);
  return (
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
                label="username"
                id="username"
                error={!!errors.name}
                register={register}
                defaultValue={row.username}
              />
            </BoxWrapper>
            <BoxWrapper>
              <FormInputLabel label="role" />
              <SimpleSelect options={ROLES} selectedOption={row.role} />
            </BoxWrapper>
            <BoxWrapper>
              <FormInputLabel label="status" />
              <SimpleSelect options={STATUS} selectedOption={row.status} />
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
  );
};

export default EditUserModal;
