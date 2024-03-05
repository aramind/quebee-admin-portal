import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { DataGrid } from "@mui/x-data-grid";
import CustomModal from "../components/CustomModal";

// to delete
const dummyUsers = [
  {
    id: 1,
    username: "naruto",
    password: "123456",
    name: "Uzumaki Naruto",
    role: "super",
    status: "active",
  },
  {
    id: 2,
    username: "hinata",
    password: "789012",
    name: "Hyuga Hinata",
    role: "editor",
    status: "active",
  },
  {
    id: 3,
    username: "sasuke",
    password: "abcdef",
    name: "Uchiha Sasuke",
    role: "admin",
    status: "active",
  },
  {
    id: 4,
    username: "sakura",
    password: "qwerty",
    name: "Haruno Sakura",
    role: "viewer",
    status: "suspended",
  },
  {
    id: 5,
    username: "kakashi",
    password: "pass123",
    name: "Hatake Kakashi",
    role: "editor",
    status: "deactivated",
  },
  {
    id: 6,
    username: "ino",
    password: "098765",
    name: "Yamanaka Ino",
    role: "viewer",
    status: "active",
  },
];

const columns = [
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
  { field: "password", headerName: "Password" },
  { field: "role", headerName: "Role" },
  { field: "status", headerName: "Status" },
];

const ManageUserPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const [rows, setRows] = useState(dummyUsers);

  const colsWithWidth = columns.map((col) => {
    return {
      ...col,
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 1,
      headerClassName: "users-table__header",
      renderHeader: () => (
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {col.headerName.toUpperCase()}
        </Typography>
      ),
    };
  });

  const handleClose = () => setOpenModal(false);

  console.log(rows);
  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <ElevatedSectionWrapper>
        <Stack gap={1}>
          <FormInputLabel label="Current Users" />
          <DataGrid
            editMode="row"
            rows={rows}
            columns={colsWithWidth}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-columnHeader:hover": {
                backgroundColor: theme.palette.tertiary.light,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            sx={{
              ...styles.form.primaryActionButton,
              fontSize: "1rem",
              width: "fit-content",
            }}
          >
            Add New User
          </Button>
          <CustomModal open={openModal} setOpen={setOpenModal} />
        </Stack>
      </ElevatedSectionWrapper>
      <br />
    </Container>
  );
};

export default ManageUserPage;
