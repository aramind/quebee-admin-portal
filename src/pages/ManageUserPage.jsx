import { Container } from "@mui/material";
import React from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";

// to delete
const dummyUsers = [
  {
    username: "naruto",
    password: "123456",
    name: "Uzumaki Naruto",
    roles: ["super", "admin", "editor", "viewer"],
    status: ["active"],
  },
  {
    username: "hinata",
    password: "789012",
    name: "Hyuga Hinata",
    roles: ["editor", "viewer"],
    status: ["active"],
  },
  {
    username: "sasuke",
    password: "abcdef",
    name: "Uchiha Sasuke",
    roles: ["admin", "viewer"],
    status: ["active"],
  },
  {
    username: "sakura",
    password: "qwerty",
    name: "Haruno Sakura",
    roles: ["editor", "viewer"],
    status: ["suspended"],
  },
  {
    username: "kakashi",
    password: "pass123",
    name: "Hatake Kakashi",
    roles: ["admin", "editor", "viewer"],
    status: ["deactivated"],
  },
  {
    username: "ino",
    password: "098765",
    name: "Yamanaka Ino",
    roles: ["viewer"],
    status: ["active"],
  },
];

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
