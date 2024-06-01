import { Container } from "@mui/material";
import React from "react";
import AddNewUserForm from "./AddNewUserForm";
import useStyles from "../../hooks/useStyles";
import EmployeeListTable from "./EmployeeListTable";

const ManageUserPage = () => {
  const styles = useStyles();

  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters>
      <EmployeeListTable />
      <br />
      <AddNewUserForm />
      <br />
    </Container>
  );
};

export default ManageUserPage;
