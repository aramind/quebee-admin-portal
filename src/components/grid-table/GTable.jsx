import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import RenderQuestionActions from "./RenderQuestionActions";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

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

    headers.unshift({
      field: "STATUS_ICON",
      headerName: "STATUS",
      renderCell: (params) => {
        if (params.row?.STATUS === "deleted") return <DeleteOutlinedIcon />;
        else if (params.row?.STATUS === "pending")
          return <RateReviewOutlinedIcon />;
        else if (params.row?.STATUS === "live")
          return <CloudDoneOutlinedIcon />;
        else return <LiveHelpOutlinedIcon />;
      },
    });
    return headers;
  };

  const addIdToTableData = (data) => {
    const formattedTableData = data?.map((e, index) => ({ ...e, id: index }));
    return formattedTableData;
  };

  return (
    <Box sx={{ width: "100%" }}>
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
