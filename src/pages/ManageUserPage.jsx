import {
  Box,
  Container,
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
// todo: to delete
import { dummyUsers } from "../mockDB/dummyUsers";
import FormActionButton from "../components/form/FormActionButton";
import FormActionsContainer from "../containers/FormActionsContainer";
import LabelledSelect from "../components/form/LabelledSelect";
const ROLES = ["admin", "editor", "viewer"];
const STATUS = ["active", "deactivated"];

const genIcons = (n) => {
  let icons = [
    <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: "font.gray" }} />,
  ];
  for (let i = 0; i < n - 1; i++) {
    icons.push(
      <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: "font.gray" }} />
    );
  }
  return icons;
};

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
      {genIcons(4).map((icon, index) => (
        <div key={index}>{icon}</div>
      ))}
    </Stack>
  );

  return (
    <>
      <Stack
        direction="row"
        height="1"
        sx={{ width: 1, justifyContent: "space-between", px: 0 }}
      >
        <Box flex={3} sx={localStyle.box.password}>
          {passwordValue}
        </Box>
        <Box flex={2} width={1} sx={localStyle.box.password}>
          <IconButton onClick={togglePWVisibility} sx={styles.iconButton}>
            {showPassword ? (
              <VisibilityOffTwoToneIcon sx={localStyle.iconButton} />
            ) : (
              <VisibilityTwoToneIcon sx={localStyle.iconButton} />
            )}
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};
const RenderAction = () => {
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

    renderCell: RenderAction,
  },
];

const ManageUserPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  //   form
  const { register, handleSubmit, formState, reset } = useForm({
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

  // Data grid
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

  // handlers
  // todo
  const handleClear = () => {};
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
            <Stack direction="row" gap={2} flexWrap="wrap">
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
              <Box flex={1}>
                <LabelledSelect
                  label="role"
                  select={<SimpleSelect options={ROLES} />}
                />
              </Box>
              <Box flex={1}>
                <LabelledSelect
                  label="status"
                  select={<SimpleSelect options={STATUS} />}
                />
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
          <FormActionsContainer>
            <FormActionButton
              label="clear"
              onClickHandler={handleClear}
              variant="outlined"
            />
            <FormActionButton label="save" variant="contained" type="submit" />
          </FormActionsContainer>
        </ElevatedSectionWrapper>
      </form>
      <br />
    </Container>
  );
};

export default ManageUserPage;

//local sx styles
// @type {import("@mui/material").SxProps}
const localStyle = {
  box: {
    password: {
      display: "flex",
      py: "auto",
      height: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  },
  iconButton: {
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "primary.main",
  },
};
