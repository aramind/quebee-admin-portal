import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../hooks/useStyles";
import FormInputLabel from "../components/form/FormInputLabel";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RenderAction from "../components/renders/RenderAction";
import RenderPassword from "../components/renders/RenderPassword";
import AddNewUserForm from "../components/AddNewUserForm";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFetchUsers from "../hooks/useFetchUsers";
import { useLocation, useNavigate } from "react-router-dom";

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

const onSuccess = () => {
  // alert("Finished fetching users");
  console.log("Finished fetching users");
};

const ManageUserPage = () => {
  const [rows, setRows] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);
  const styles = useStyles();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  const onError = (error) => {
    console.log(error.response.status);
    const status = error.response.status;
    if (status === 401 || status === 403) {
      console.log("re logging in");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      alert(error);
    }
  };

  const { data: fetchedUsers } = useFetchUsers(
    axiosPrivate,
    onSuccess,
    onError
  );

  useEffect(() => {
    if (fetchedUsers) {
      setRows(
        fetchedUsers.map((user, index) => ({
          id: index + 1,
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
      <AddNewUserForm setRenderTrigger={setRenderTrigger} />
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
