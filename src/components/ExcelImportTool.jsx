import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import XLSX from "xlsx";
import GTable from "./grid-table/GTable";
import useFetchTopics from "../hooks/api/useFetchTopics";
import useApiSend from "../hooks/api/useApiSend";
import useQuestionReq from "../hooks/api/useQuestionReq";
import { grey } from "@mui/material/colors";
import questionSchemaForBulkQuestions from "../schemas/questionSchemaForBulkQuestions";

import { useGlobalState } from "../context/GlobalStatesContextProvider";
import { showAckNotification } from "../utils/showAckNotification";

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

const validateExcelData = async (data, code) => {
  try {
    await questionSchemaForBulkQuestions.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error) {
    return {
      isValid: false,
      field: error.inner?.[0]?.path,
      error: error.inner?.[0]?.errors,
      code,
    };
  }
};

const ExcelImportTool = () => {
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();
  // const {}
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  // const [table, setTable] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  // const [sheetData, setSheetData] = useState([]);
  const fileRef = useRef();
  //   const [fileTypeError, setFileTypeError] = useState(false);
  const acceptableFileName = ["xlsx", "xls"];
  const { topicsList } = useFetchTopics("liveTopics", `/trimmed`);
  const { addBulk } = useQuestionReq();
  const { mutate: addBulkQuestions } = useApiSend(addBulk, [
    "questions",
    "tags",
  ]);

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

    // console.log(Object.keys(wb.Sheets));
    const ws1 = wb.Sheets[wb.SheetNames[0]];
    // console.log(ws1);
    // const tbl = XLSX.utils.sheet_to_html(ws1);
    // setTable(tbl);
    // assign data from sheet into objects
    const jsonData = XLSX.utils.sheet_to_json(ws1);
    const headers = XLSX.utils.sheet_to_json(ws1, { header: 1 });
    setTableData((pv) => jsonData);
    setHeaderData((pv) => headers[0]);
  };

  const getTopicsId = (arrayOfTopicIds) => {
    const codesArray = arrayOfTopicIds;
    const objectsArray = topicsList?.data;

    const idsArray = codesArray.map((code) => {
      const foundObject = objectsArray.find((obj) => obj.code === code);
      return foundObject ? foundObject._id : null;
    });

    return idsArray;
  };

  const handleFile = async (e) => {
    const myFile = e.target.files[0];

    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      showAckNotification({
        dispatch,
        success: false,
        data: { message: "Invalid File type" },
        ackAlert,
        autoHideDuration: null,
      });
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
    setTableData();
    fileRef.current.value = "";
  };

  const handleBulkQuestionUpload = async () => {
    const validationResults = await Promise.all(
      tableData.map((data) => validateExcelData(data, data?.CODE))
    );

    const invalidData = validationResults.filter((result) => !result.isValid);

    if (invalidData?.length > 0) {
      showAckNotification({
        dispatch,
        success: false,
        data: {
          message: `ERROR in 
            ${invalidData?.[0]?.code}
         ${invalidData?.[0]?.field}'s field : ${invalidData?.[0]?.error?.[0]}`,
        },
        ackAlert,
        autoHideDuration: null,
      });
      return;
    }

    const bulkFormattedData = tableData.map((data) => ({
      code: data?.CODE,
      access: +data?.ACCESS,
      difficulty: +data?.DIFFICULTY,
      type: data?.TYPE,
      topics: getTopicsId(data?.TOPICS?.split(",")),
      question: { text: data?.QUESTION_TEXT, image: data?.QUESTION_IMAGE },
      choices: [
        {
          value: { text: data?.A_TEXT, image: data?.A_IMAGE },
          isCorrect: data?.CORRECT_ANS === "A",
        },
        {
          value: { text: data?.B_TEXT, image: data?.B_IMAGE },
          isCorrect: data?.CORRECT_ANS === "B",
        },
        {
          value: { text: data?.C_TEXT, image: data?.C_IMAGE },
          isCorrect: data?.CORRECT_ANS === "C",
        },
        {
          value: { text: data?.D_TEXT, image: data?.D_IMAGE },
          isCorrect: data?.CORRECT_ANS === "D",
        },
      ],

      information: {
        text: data?.INFO_TEXT,
        image: data?.INFO_IMAGE,
      },
      sources: data?.SOURCES?.split(","),

      tags: data?.TAGS?.split(","),
      remarks: data?.REMARKS,
    }));

    addBulkQuestions(bulkFormattedData);
  };

  return (
    <>
      <Stack direction="row" mb="1rem">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          // sx={{
          //   outline: "2px solid",
          //   outlineColor: (theme) => theme.palette.primary.main,
          // }}
          pr="0.5rem"
          minWidth="50%"
        >
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            disableElevation
            tabIndex={-1}
            startIcon={<UploadFileIcon />}
            sx={{ borderRadius: 0 }}
          >
            Import file (.xlsx, .xls)
            <VisuallyHiddenInput
              type="file"
              accept="xlsx, xls"
              multiple={false}
              onChange={(e) => handleFile(e)}
              ref={fileRef}
            />
          </Button>

          <Typography
            sx={{
              color: fileName
                ? (theme) => theme.palette.primary.dark
                : grey[400],
            }}
          >
            {fileName}
          </Typography>

          {/* 
      {fileName &&
        (fileTypeError ? <ErrorTwoToneIcon /> : <CheckCircleTwoToneIcon />)} */}

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
        <Box flex={1} />

        <Button
          variant="contained"
          onClick={handleBulkQuestionUpload}
          disableElevation
          endIcon={<CloudUploadOutlinedIcon />}
          disabled={!tableData}
        >
          UPLOAD
        </Button>
      </Stack>
      <GTable tableData={tableData} headerData={headerData} />
    </>
  );
};

export default ExcelImportTool;
