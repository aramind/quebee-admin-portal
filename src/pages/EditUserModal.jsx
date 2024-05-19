import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/user";
import { Box, Stack } from "@mui/material";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import LabelledTextField from "../components/form/LabelledTextField";
import SimpleSelect from "../components/SimpleSelect";
import FormInputLabel from "../components/form/FormInputLabel";
import constants from "../components/configs/constants";
import useFormSubmit from "../hooks/useFormSubmit";
import FormWrapper from "../wrappers/FormWrapper";

// CONSTANT to delete todo

const EditUserModal = ({ row, setData }) => {
  console.log("ACCEPTED ROW:", row);
  //   form
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const formMethods = { register, handleSubmit };
  const { errors } = formState;

  const handleFormDataSubmit = (rawData) => {
    // console.log("Editing user...", data);
    setData(rawData);
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

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

  return (
    <FormWrapper formMethods={formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
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
                <SimpleSelect
                  options={constants.ROLES}
                  selectedOption={row.role}
                />
              </BoxWrapper>
              <BoxWrapper>
                <FormInputLabel label="status" />
                <SimpleSelect
                  options={constants.STATUS}
                  selectedOption={row.status}
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
    </FormWrapper>
  );
};

export default EditUserModal;
