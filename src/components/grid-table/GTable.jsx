import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const GTable = ({ tableData }) => {
  const columns = [
    {
      field: "CODE",
      headerName: "code",
      minWidth: 150,
      editable: false,
    },
    {
      field: "TOPICS",
      headerName: "topics",
      minWidth: 150,
      editable: false,
    },
    {
      field: "TYPE",
      headerName: "type",
      minWidth: 150,
      editable: false,
    },
    {
      field: "QUESTION",
      headerName: "question",
      minWidth: 150,
      editable: false,
    },
    {
      field: "A",
      headerName: "A",
      minWidth: 150,
      editable: false,
    },
    {
      field: "B",
      headerName: "B",
      minWidth: 150,
      editable: false,
    },
    {
      field: "C",
      headerName: "C",
      minWidth: 150,
      editable: false,
    },
    {
      field: "D",
      headerName: "D",
      minWidth: 150,
      editable: false,
    },
    {
      field: "CORRECT_ANS",
      headerName: "correct_answer",
      minWidth: 150,
      editable: false,
    },
    {
      field: "INFORMATION",
      headerName: "information",
      minWidth: 150,
      editable: false,
    },
    {
      field: "SOURCES",
      headerName: "sources",
      minWidth: 150,
      editable: false,
    },
    {
      field: "TAGS",
      headerName: "tags",
      minWidth: 150,
      editable: false,
    },
    {
      field: "REMARKS",
      headerName: "remarks",
      minWidth: 150,
      editable: false,
    },
  ];

  const addIdToTableData = (data) => {
    const formattedTableData = data?.map((e, index) => ({ ...e, id: index }));
    return formattedTableData;
  };

  console.log(addIdToTableData(tableData));
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={addIdToTableData(tableData)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default GTable;
