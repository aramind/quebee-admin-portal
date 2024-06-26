import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const GTable = ({ tableData }) => {
  // const columns = [
  //   {
  //     field: "CODE",
  //     headerName: "code",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "TOPICS",
  //     headerName: "topics",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "TYPE",
  //     headerName: "type",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "QUESTION",
  //     headerName: "question",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "A",
  //     headerName: "A",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "B",
  //     headerName: "B",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "C",
  //     headerName: "C",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "D",
  //     headerName: "D",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "CORRECT_ANS",
  //     headerName: "correct_answer",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "INFORMATION",
  //     headerName: "information",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "SOURCES",
  //     headerName: "sources",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "TAGS",
  //     headerName: "tags",
  //     minWidth: 50,
  //     editable: false,
  //   },
  //   {
  //     field: "REMARKS",
  //     headerName: "remarks",
  //     minWidth: 50,
  //     editable: false,
  //   },
  // ];
  const getColumns = (jsonData) =>
    Object.keys(jsonData[0])?.map((e) => ({
      field: e.toUpperCase(),
      headerName: e.toUpperCase(),
      width: 200,
      editable: false,
    }));
  const addIdToTableData = (data) => {
    const formattedTableData = data?.map((e, index) => ({ ...e, id: index }));
    return formattedTableData;
  };

  // console.log(addIdToTableData(tableData));
  console.log(tableData);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {tableData?.length > 0 && (
        <DataGrid
          rows={addIdToTableData(tableData)}
          columns={getColumns(tableData)}
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
      )}
    </Box>
  );
};

export default GTable;
