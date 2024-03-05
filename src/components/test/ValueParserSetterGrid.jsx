import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

function getFullName(params) {
  return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
}

function setFullName(params) {
  const [firstName, lastName] = params.value.toString().split(" ");
  return { ...params.row, firstName, lastName };
}

function parseFullName(value) {
  return String(value)
    .split(" ")
    .map((str) => (str.length > 0 ? str[0].toUpperCase() + str.slice(1) : ""))
    .join(" ");
}

export default function ValueParserSetterGrid() {
  const [newRows, setNewRows] = React.useState(defaultRows);

  const handleEditCellChange = React.useCallback(
    ({ id, field, props }) => {
      const editedRows = newRows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: props.value };
        }
        return row;
      });

      setNewRows((prevRows) => {
        console.log(prevRows); // Log the previous state
        return editedRows; // Return the updated state
      });
      console.log(newRows);
    },
    [newRows]
  );

  console.log(newRows);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={newRows}
        columns={columns}
        onEditCellChange={() => console.log("editing")}
      />
      <p>{Object.entries(newRows).map(([key, value]) => `${key}: ${value}`)}</p>
    </div>
  );
}

const columns = [
  { field: "firstName", headerName: "First name", width: 130, editable: true },
  { field: "lastName", headerName: "Last name", width: 130, editable: true },
  {
    field: "fullName",
    headerName: "Full name",
    width: 160,
    editable: true,
    valueGetter: getFullName,
    valueSetter: setFullName,
    valueParser: parseFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
];

const defaultRows = [
  { id: 1, lastName: "", firstName: "" },
  { id: 2, lastName: "", firstName: "" },
  { id: 3, lastName: "", firstName: "" },
  { id: 4, lastName: "", firstName: "" },
  { id: 5, lastName: "", firstName: "" },
];
