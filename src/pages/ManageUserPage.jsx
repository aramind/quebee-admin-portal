import { Container } from "@mui/material";
import React from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";

const ManageUserPage = () => {
  const styles = useStyles();

  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <FormInputLabel label="Current Users" />
      <FormInputLabel label="Add new Users" />
    </Container>
  );
};

export default ManageUserPage;
