import { Stack } from "@mui/material";
import React from "react";
import SimpleLabelValue from "../../components/SimpleLabelValue";

const DeleteUserDialogContent = ({ userDetails }) => {
  const { employeeId, lastName, firstName, middleName, status, role } =
    userDetails;

  const user = { employeeId, lastName, firstName, middleName, status, role };
  console.log(user);
  return (
    // <Stack spacing={1.5} width="100%" direction="row" flexWrap="wrap">
    //   {user &&
    //     Object.entries(user).map(([key, value]) => {
    //       return <SimpleLabelValue label={key} values={value} />;
    //     })}
    // </Stack>
    <>
      {userDetails && (
        <Stack spacing={1}>
          {/* <ElevatedSectionWrapper> */}
          <SimpleLabelValue label="employee ID" values={employeeId} />

          <SimpleLabelValue
            label="employee name"
            values={`${lastName}, ${firstName} ${middleName}`}
          />
          <SimpleLabelValue label="status" values={status} />
          <SimpleLabelValue label="role" values={role} />
          {/* </ElevatedSectionWrapper> */}
        </Stack>
      )}
    </>
  );
};

export default DeleteUserDialogContent;
