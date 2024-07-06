import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import RenderQuestionActions from "./RenderQuestionActions";

const GTable = ({ tableData, headerData, setFetchValues }) => {
  const getColumns = () => {
    const headers = headerData?.map((e) => ({
      field: e.toUpperCase(),
      headerName: e.toUpperCase(),
      width: 200,
      editable: false,
    }));

    headers.unshift({
      field: "ACTIONS",
      headerName: "ACTIONS",
      renderCell: (params) => (
        <RenderQuestionActions
          row={params.row}
          setFetchValues={setFetchValues}
        />
      ),
    });

    return headers;
  };

  const addIdToTableData = (data) => {
    const formattedTableData = data?.map((e, index) => ({ ...e, id: index }));
    return formattedTableData;
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {tableData?.length > 0 && (
        <DataGrid
          rows={addIdToTableData(tableData)}
          columns={getColumns()}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 30, 40, 50]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default GTable;
