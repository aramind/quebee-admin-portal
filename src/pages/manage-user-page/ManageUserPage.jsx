import { Container } from "@mui/material";
import React from "react";

import AddNewUserForm from "./AddNewUserForm";
import useStyles from "../../hooks/useStyles";

import useFetchData from "../../hooks/api/useFetchData";
import EmployeeListTable from "./EmployeeListTable";

const ManageUserPage = () => {
  const styles = useStyles();

  const { refetchUsers } = useFetchData();

  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters>
      <EmployeeListTable />
      <br />
      <AddNewUserForm successFn={refetchUsers} />
      <br />
    </Container>
  );
};

export default ManageUserPage;
