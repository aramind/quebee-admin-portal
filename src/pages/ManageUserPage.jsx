import {
  Box,
  Button,
  ButtonGroup,
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
import { DataGrid } from "@mui/x-data-grid";
import CustomModal from "../components/CustomModal";
import GrowTransitionWrapper from "../wrappers/GrowTransitionWrapper";
import DraggableDialog from "../components/DraggableDialog";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TooltipWrapper from "../wrappers/TooltipWrapper";
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

const EDIT_ICON = <EditTwoToneIcon />;

function RenderDate(props) {
  const styles = useStyles();
  return (
    <>
      <ButtonGroup
        disableElevation
        variant="text"
        aria-label="user-table-actions"
      >
        <IconButton aria-label="edit" sx={styles.iconButton}>
          <EditTwoToneIcon />
        </IconButton>

        <IconButton aria-label="delete" sx={styles.iconButton}>
          <DeleteTwoToneIcon />
        </IconButton>
      </ButtonGroup>
      {/* <IconButton aria-label="edit"></IconButton>
      <Button
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        onKeyDown={(event) => {
          if (event.key === " ") {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
      >
        Open
      </Button> */}
    </>
  );
}
const columns = [
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
  { field: "password", headerName: "Password" },
  { field: "role", headerName: "Role", editable: false },
  { field: "status", headerName: "Status", editable: false },
  {
    field: "actions",
    headerName: "Actions",

    renderCell: RenderDate,
  },
];

const ManageUserPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [rows, setRows] = useState(dummyUsers);

  const colsWithWidth = columns.map((col, index) => {
    return {
      ...col,
      align: "center",
      headerAlign: "center",
      editable: false,
      flex: 1,
      // flex: index === columns.length - 1 ? 0 : 1, // Set flex to 0 for the last column (fixed width), and 1 for the others (flexible width)
      // width: index === columns.length - 1 ?  : undefined,
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
            rows={rows.map((row) => ({
              ...row,
              edit: <EditTwoToneIcon sx={styles.iconButton} />,
            }))}
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
            // onClick={() => setOpenModal(true)}
            onClick={() => setOpenDialog(true)}
            sx={{
              ...styles.form.primaryActionButton,
              fontSize: "1rem",
              width: "fit-content",
            }}
          >
            Add New User
          </Button>
          {/* <CustomModal open={openModal} setOpen={setOpenModal} /> */}
          <DraggableDialog
            open={openDialog}
            setOpen={setOpenDialog}
            title="New User"
          />
        </Stack>
      </ElevatedSectionWrapper>
      <br />
    </Container>
  );
};

export default ManageUserPage;
