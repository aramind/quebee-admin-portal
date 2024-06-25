import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";

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
  const fileRef = useRef();
  //   const [fileTypeError, setFileTypeError] = useState(false);
  const acceptableFileName = ["xlsx", "xls"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const handleFile = (e) => {
    const myFile = e.target.files[0];

    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert("Invalid File Type!");
      //   setFileTypeError((pv) => true);
      return;
    }

    setFile(myFile);
    setFileName(myFile?.name);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = "";
  };
  return (
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
  );
};

export default ExcelImportTool;
