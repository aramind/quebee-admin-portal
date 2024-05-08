import { Stack, Typography } from "@mui/material";
import React from "react";
import RowWrapper from "../../../wrappers/RowWrapper";
import ControlledTextField from "../../form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../form-controlled/ControlledSimpleSelect";
import constants from "../../configs/constants";

const UserInfoSection = ({ control, title }) => {
  return (
    <Stack gap={1}>
      {title && <Typography variant="h6">{title}</Typography>}
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

        <ControlledTextField label="email" name="email" control={control} />
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
    </Stack>
  );
};

export default UserInfoSection;
