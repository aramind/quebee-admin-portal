import React, { useEffect, useMemo, useState } from "react";
import RenderPassword from "../../components/renders/RenderPassword";
import RenderAction from "../../components/renders/RenderAction";
import useStyles from "../../hooks/useStyles";
import useFetchData from "../../hooks/api/useFetchData";
import { Stack, Typography } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormInputLabel from "../../components/form/FormInputLabel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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
    renderCell: (params) => <RenderPassword row={params.row} />,
    // renderCell: RenderPassword,
  },
  { field: "role", headerName: "role", editable: false },
  { field: "status", headerName: "status", editable: false },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => <RenderAction row={params.row} />,
    // renderCell: RenderAction,
  },
];

console.log("RENDERS TABLE");
const EmployeeListTable = () => {
  const [rows, setRows] = useState([]);

  const { usersList } = useFetchData();

  const processedRows = useMemo(() => {
    if (!usersList) return [];

    const filtered = usersList.data.filter((user) => user.role !== "super");

    return filtered.map((user, index) => ({
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
    }));
  }, [usersList]);

  useEffect(() => {
    setRows(processedRows);
  }, [processedRows]);

  //   const colsWithWidth = columns.map((col, index) => {
  //     return {
  //       ...col,
  //       align: "center",
  //       headerAlign: "center",
  //       editable: false,
  //       flex: 1,
  //       headerClassName: "users-table__header",
  //       renderHeader: () => (
  //         <Typography
  //           sx={{
  //             fontWeight: "bold",
  //             width: "100%",
  //           }}
  //         >
  //           {col.headerName.toUpperCase()}
  //         </Typography>
  //       ),
  //     };
  //   });
  // Memoizing columns to avoid unnecessary re-renders
  const colsWithWidth = useMemo(() => {
    return columns.map((col) => ({
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
    }));
  }, []);
  return (
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
  );
};

export default EmployeeListTable;

//local sx styles
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
