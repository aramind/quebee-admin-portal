import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import { red, teal } from "@mui/material/colors";
import AddTopicDialog from "./AddTopicDialog";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";
import useFetchData from "../../hooks/api/useFetchData";
import useDialog from "../../hooks/useDialog";

const SubjectInfoSection = () => {
  const { handleOpen, renderDialog } = useDialog(AddTopicDialog);

  const { topicsList } = useFetchData();

  return (
    <Stack direction="row" spacing={4}>
      <Stack flex={2} spacing={1} justifyContent="flex-start">
        <ControlledTextField name="code" label="subject code" />
        <ControlledTextField name="acronym" label="acronym" />
        <ControlledTextField name="title" label="title" />
        <ControlledTextField
          name="description"
          label="description"
          tfProps={{ multiline: true, minRows: 2 }}
        />
        <ControlledTextField
          name="remarks"
          label="remarks"
          tfProps={{ multiline: true, minRows: 2 }}
        />
        <Box height="100%" />
      </Stack>
      <Stack flex={3} direction="row" spacing={1.5}>
        <Stack flex={1} width="100%">
          <ContMultiSelectToTable
            objOptionsWithTitles={topicsList || []}
            nameForController="topics"
            label="Topic(s)"
            height="100%"
          />
        </Stack>
        <Stack alignItems="flex-end" sx={{ paddingTop: "16px" }}>
          <Typography variant="body" color={red["A100"]} fontSize="0.8rem">
            Topic not in the list?
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => handleOpen({ title: "Add New Topic" })}
            sx={{
              marginTop: "-8px",
              textDecoration: "underline",
              fontSize: "0.7rem",
              "&:hover": {
                backgroundColor: "transparent",
                color: teal[800],
                textDecoration: "underline",
              },
            }}
          >
            Create Topic
          </Button>
        </Stack>
      </Stack>
      {renderDialog()}
    </Stack>
  );
};

export default SubjectInfoSection;
