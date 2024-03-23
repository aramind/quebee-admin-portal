import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RenderAction from "../components/renders/RenderAction";
import RenderPassword from "../components/renders/RenderPassword";
import AddNewUserForm from "../components/AddNewUserForm";

// todo: to delete
import { dummyUsers } from "../mockDB/dummyUsers";

const columns = [
  { field: "employeeId", headerName: "employee ID" },
  { field: "employeeId", headerName: "employee ID" },
  { field: "lastName", headerName: "last name" },
  { field: "firstName", headerName: "first name" },
  { field: "middleName", headerName: "middle name" },
  { field: "username", headerName: "username" },
  {
    field: "password",
    headerName: "password",
    // renderCell: (params) => <RenderPassword row={params.row} />,
    renderCell: RenderPassword,
  },
  { field: "role", headerName: "role", editable: false },
  { field: "status", headerName: "status", editable: false },
  {
    field: "actions",
    headerName: "Actions",

    // renderCell: (params) => <RenderAction row={params.row} />,
    renderCell: RenderAction,
  },
];

const ManageUserPage = () => {
  const styles = useStyles();
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
            width: "100%",
          }}
        >
          {col.headerName.toUpperCase()}
        </Typography>
      ),
    };
  });

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
            sx={localStyle.datagrid}
          />
        </Stack>
      </ElevatedSectionWrapper>
      <br />
      <AddNewUserForm />
      <br />
    </Container>
  );
};

export default ManageUserPage;

//local sx styles
// @type {import("@mui/material").SxProps}
const localStyle = {
  datagrid: {
    // "& .MuiDataGrid-columnHeaderTitleContainer": {
    //   border: "1px solid black",
    //   width: "100%",
    //   display: "flex",
    // },
    // "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    //   backgroundColor: "yellow",
    //   width: "80%",
    //   display: "flex",
    //   textAlign: "center",
    // },
    // "& .MuiDataGrid-iconButtonContainer": {
    //   px: 0,
    //   backgroundColor: "red",
    //   width: "20px",
    //   display: "flex",
    //   flex: "1%",
    //   justifyContent: "center",
    // },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "primary.light",
      width: "100%",
      justifyContent: "left",
    },
    "& .MuiDataGrid-columnHeader:hover": {
      backgroundColor: "tertiary.light",
    },
  },
};
