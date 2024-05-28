import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RenderAction from "../../components/renders/RenderAction";
import RenderPassword from "../../components/renders/RenderPassword";
import AddNewUserForm from "./AddNewUserForm";
import useRefreshToken from "../../hooks/useRefreshToken";

import useApiGet from "../../hooks/api/useApiGet";
import useUserReq from "../../hooks/api/useUserReq";

import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormInputLabel from "../../components/form/FormInputLabel";
import useErrorHandlerUnAuthReq from "../../hooks/api/useErrorHandlerUnAuthReq";
import LoadingPage from "../LoadingPage";

const setId = (user, index) => {
  return user?._id || index + 1;
};

const columns = [
  { field: "employeeId", headerName: "employee ID" },
  { field: "lastName", headerName: "last name" },
  { field: "firstName", headerName: "first name" },
  { field: "middleName", headerName: "middle name" },
  { field: "email", headerName: "email" },
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
  const refresh = useRefreshToken();
  const { get } = useUserReq();
  const handleUnAuthError = useErrorHandlerUnAuthReq();

  const {
    data: fetchedUsers,
    isLoading,
    error,
    refetch: refetchUsers,
  } = useApiGet("users", get, {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  useEffect(() => {
    if (fetchedUsers) {
      const filtered = fetchedUsers?.data.filter(
        (user) => user.role !== "super"
      );

      setRows(
        filtered.map((user, index) => ({
          id: setId(user, index),
          employeeId: user.employeeId,
          email: user.email,
          username: user.username,
          password: user.password,
          lastName: user.name.lastName,
          firstName: user.name.firstName,
          middleName: user.name.middleName,
          role: user.role,
          status: user.status,
        }))
      );
    }
  }, [fetchedUsers]);

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

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    handleUnAuthError(error);
  }

  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters>
      <Button onClick={() => refresh()}>Refresh</Button>
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
      <AddNewUserForm successFn={refetchUsers} />
      <br />
    </Container>
  );
};

export default ManageUserPage;

//local sx styles
// @type {import("@mui/material").SxProps}
const localStyle = {
  datagrid: {
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
