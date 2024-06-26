import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import XLSX from "xlsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ExcelImportTool = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [table, setTable] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const fileRef = useRef();
  //   const [fileTypeError, setFileTypeError] = useState(false);
  const acceptableFileName = ["xlsx", "xls"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data);

    setSheetNames(wb?.SheetNames);
    // console.log(sheetNames);
    // loop through the sheets
    // for (let i = 0; i < wb?.SheetNames?.length; i++) {
    //   let sheetName = wb?.SheetNames?.[i];

    // }

    // console.log(wb.Sheets);
    const ws1 = wb.Sheets[wb.SheetNames[0]];
    console.log(ws1);
    const tbl = XLSX.utils.sheet_to_html(ws1);
    setTable(tbl);
    // assign data from sheet into objects
    const sheetData = XLSX.utils.sheet_to_json(ws1);
    console.log(sheetData);
  };

  const handleFile = async (e) => {
    const myFile = e.target.files[0];

    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert("Invalid File Type!");
      //   setFileTypeError((pv) => true);
      return;
    }

    // Read the xlsx metadata
    const data = await myFile.arrayBuffer();
    readDataFromExcel(data);

    setFile(myFile);
    setFileName(myFile?.name);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = "";
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        width="50%"
        sx={{
          outline: "2px solid",
          outlineColor: (theme) => theme.palette.primary.main,
        }}
        pr="0.5rem"
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          disableElevation
          borderRadius={0}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ borderRadius: 0 }}
        >
          Upload excel file
          <VisuallyHiddenInput
            type="file"
            accept="xlsx, xls"
            multiple={false}
            onChange={(e) => handleFile(e)}
            ref={fileRef}
          />
        </Button>
        <Typography>{fileName || "Please upload a file"}</Typography>
        {/* 
      {fileName &&
        (fileTypeError ? <ErrorTwoToneIcon /> : <CheckCircleTwoToneIcon />)} */}
        <Box flex={1} />
        {fileName && (
          <IconButton
            color="primary"
            aria-label="remove file"
            onClick={handleRemove}
            sx={{ p: 0 }}
          >
            <ClearTwoToneIcon />
          </IconButton>
        )}
      </Stack>
      {/* {table && (
        <Box
          dangerouslySetInnerHTML={{ __html: table }}
          sx={{
            mt: 2,
            overflow: "auto",
            maxHeight: "400px",
            border: "1px solid #ccc",
          }}
        />
      )} */}
    </>
  );
};

export default ExcelImportTool;
