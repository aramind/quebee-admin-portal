import { Stack, Typography } from "@mui/material";
import React from "react";
import RowWrapper from "../../../wrappers/RowWrapper";
import ControlledTextField from "../../form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../form-controlled/ControlledSimpleSelect";
import constants from "../../configs/constants";

const UserInfoSection = ({ control, title }) => {
  return (
    <Stack spacing={2}>
      {title && <Typography variant="h6">{title}</Typography>}

      <RowWrapper>
        <ControlledTextField
          name="employeeId"
          control={control}
          label="Employee ID"
          flex={0.5}
        />
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
      </RowWrapper>

      <RowWrapper>
        <ControlledSimpleSelect
          label="role"
          name="role"
          control={control}
          options={constants?.ROLES || []}
          flex={0.5}
        />
        <ControlledSimpleSelect
          label="status"
          name="status"
          control={control}
          options={constants?.STATUS || []}
          flex={0.5}
        />
        <ControlledTextField
          label="email"
          name="email"
          control={control}
          flex={1.2}
        />
        <ControlledTextField
          label="username"
          name="username"
          control={control}
        />

        <ControlledTextField
          label="password"
          name="password"
          control={control}
          flex={0.8}
        />
      </RowWrapper>
    </Stack>
  );
};

export default UserInfoSection;
