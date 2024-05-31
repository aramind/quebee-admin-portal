import { Stack, Typography } from "@mui/material";
import React from "react";
import RowWrapper from "../../../wrappers/RowWrapper";
import ControlledTextField from "../../form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../form-controlled/ControlledSimpleSelect";
import constants from "../../../configs/constants";

const UserInfoSection = ({ title }) => {
  return (
    <Stack spacing={2}>
      {title && <Typography variant="h6">{title}</Typography>}

      <RowWrapper>
        <ControlledTextField
          name="employeeId"
          label="Employee ID**"
          flex={0.5}
        />
        <ControlledTextField label="last name**" name="lastName" />

        <ControlledTextField label="first name**" name="firstName" />

        <ControlledTextField label="middle name" name="middleName" />
      </RowWrapper>

      <RowWrapper>
        <ControlledSimpleSelect
          label="role**"
          name="role"
          options={constants?.ROLES || []}
          flex={0.5}
        />
        <ControlledSimpleSelect
          label="status**"
          name="status"
          options={constants?.STATUS || []}
          flex={0.5}
        />
        <ControlledTextField label="email**" name="email" flex={1.2} />
        <ControlledTextField label="username**" name="username" />

        <ControlledTextField label="password**" name="password" flex={0.8} />
      </RowWrapper>
    </Stack>
  );
};

export default UserInfoSection;
