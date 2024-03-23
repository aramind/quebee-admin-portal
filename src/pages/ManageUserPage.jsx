import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RenderAction from "../components/renders/RenderAction";
import RenderPassword from "../components/renders/RenderPassword";
import AddNewUserForm from "../components/AddNewUserForm";

import { useFetchUsers } from "../hooks/useUserHook";

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
  const [rows, setRows] = useState([]);

  const styles = useStyles();

  const onSuccess = (data) => {
    console.log("DATA FETCHED", data.data.data);
    setRows(
      data.data.data.map((user, index) => ({
        id: index + 1,
        employeeId: user.employeeId,
        username: user.username,
        password: user.password,
        lastName: user.name.lastName,
        firstName: user.name.firstName,
        middleName: user.name.middleName,
        role: user.role,
        status: user.status,
      }))
    );
    console.log("finished refetching");
    // window.alert("Finished fetching users");
  };

  const onError = (error) => {
    window.alert("Error fetching users.");
  };

  useFetchUsers(onSuccess, onError);

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
