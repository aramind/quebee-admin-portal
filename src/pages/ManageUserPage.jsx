import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DraggableDialog from "../components/DraggableDialog";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import LabelledTextField from "../components/form/LabelledTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/user";
import { useForm } from "react-hook-form";
import SimpleSelect from "../components/SimpleSelect";
import genInitialPassword from "../utils/login/genInitialPassword";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import { blue, grey, red } from "@mui/material/colors";
// to delete
const dummyUsers = [
  {
    id: 1,
    username: "naruto",
    password: "123456",
    lastName: "Uzumaki",
    firstName: "Naruto",
    role: "super",
    status: "active",
  },
  {
    id: 2,
    username: "hinata",
    password: "789012",
    lastName: "Hinata",
    firstName: "Hinata",
    role: "editor",
    status: "active",
  },
  {
    id: 3,
    username: "sasuke",
    password: "abcdef",
    lastName: "Uchiha",
    firstName: "Sasuke",
    role: "admin",
    status: "active",
  },
  {
    id: 4,
    username: "sakura",
    password: "qwerty",
    lastName: "Haruno",
    firstName: "Sakura",
    role: "viewer",
    status: "deactivated",
  },
  {
    id: 5,
    username: "kakashi",
    password: "pass123",
    lastName: "Hatake",
    firstName: "Kakashi",
    role: "editor",
    status: "deactivated",
  },
  {
    id: 6,
    username: "ino",
    password: "098765",
    lastName: "Yamanaka",
    firstName: "Ino",
    role: "viewer",
    status: "active",
  },
];

const ROLES = ["admin", "editor", "viewer"];
const STATUS = ["active", "deactivated"];

const RenderPassword = ({ row }) => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();

  const togglePWVisibility = () => {
    setShowPassword((prevPW) => !prevPW);
  };

  const passwordValue = showPassword ? (
    row.password
  ) : (
    <Stack direction="row" sx={{ justifyContent: "left" }}>
      <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: grey[700] }} />
      <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: grey[700] }} />
      <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: grey[700] }} />
      <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: grey[700] }} />
    </Stack>
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{ width: 1, justifyContent: "space-between", px: 0 }}
      >
        <Box flex={1}></Box>
        <Box className="centered-content" flex={1}>
          {passwordValue}
        </Box>
        <Box
          className="centered-content"
          flex={1}
          width={1}
          sx={{ alignItems: "center" }}
        >
          <IconButton onClick={togglePWVisibility} sx={styles.iconButton}>
            {showPassword ? (
              <VisibilityOffTwoToneIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "primary.main",
                }}
              />
            ) : (
              <VisibilityTwoToneIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "primary.main",
                }}
              />
            )}
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};
const RenderDate = () => {
  const [openDialogEditUser, setOpenDialogEditUser] = useState(false);

  const styles = useStyles();

  return (
    <>
      <IconButton
        aria-label="edit"
        sx={styles.iconButton}
        onClick={() => setOpenDialogEditUser(true)}
      >
        <EditTwoToneIcon />
      </IconButton>

      <IconButton aria-label="delete" sx={styles.iconButton}>
        <DeleteTwoToneIcon />
      </IconButton>
      <DraggableDialog
        open={openDialogEditUser}
        setOpen={setOpenDialogEditUser}
        title="Edit User Information"
      />
    </>
  );
};

const columns = [
  { field: "lastName", headerName: "last name" },
  { field: "firstName", headerName: "first name" },
  { field: "username", headerName: "username" },
  { field: "password", headerName: "password", renderCell: RenderPassword },
  { field: "role", headerName: "role", editable: false },
  { field: "status", headerName: "status", editable: false },
  {
    field: "actions",
    headerName: "Actions",

    renderCell: RenderDate,
  },
];

const ManageUserPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [openDialogNewUser, setOpenDialogNewUser] = useState(false);
  //   form
  const { register, control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Creating user...", data);
  };

  const onError = (err) => {
    console.log("ERROR creating user", err);
  };

  // Datagrid
  const [rows, setRows] = useState(dummyUsers);

  const colsWithWidth = columns.map((col, index) => {
    return {
      ...col,
      align: "center",
      headerAlign: "center",
      editable: false,
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
            slots={{ toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-columnHeader:hover": {
                backgroundColor: theme.palette.tertiary.light,
              },
            }}
          />
        </Stack>
      </ElevatedSectionWrapper>
      <br />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper>
          <Stack gap={1}>
            <Typography variant="h6">Add New User</Typography>
            <Stack direction="row" spacing={2}>
              <Box flex={1}>
                <LabelledTextField
                  label="last name"
                  id="lastName"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box flex={1}>
                <LabelledTextField
                  label="first name"
                  id="firstName"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box flex={1}>
                <LabelledTextField
                  label="username"
                  id="username"
                  error={!!errors.name}
                  register={register}
                />
              </Box>
              <Box>
                <FormInputLabel label="role" />
                <SimpleSelect options={ROLES} />
              </Box>
              <Box>
                <FormInputLabel label="status" />
                <SimpleSelect options={STATUS} />
              </Box>

              <Box flex={1}>
                <LabelledTextField
                  label="password"
                  id="password"
                  error={!!errors.password}
                  register={register}
                  defaultValue={genInitialPassword()}
                />
              </Box>
            </Stack>
          </Stack>
          <br />
          <Stack
            direction="row"
            gap={2}
            sx={{ justifyContent: "flex-end", py: 0 }}
          >
            <Button
              variant="outlined"
              sx={{ ...styles.form.primaryActionButton.small, px: 4 }}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...styles.form.primaryActionButton.small, px: 4 }}
            >
              Save
            </Button>
          </Stack>
        </ElevatedSectionWrapper>
      </form>
      <br />
    </Container>
  );
};

export default ManageUserPage;
