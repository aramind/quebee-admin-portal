import { Box, Stack } from "@mui/material";
import React from "react";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

const TopicInfoSection = () => {
  return (
    <Stack direction="row" spacing={1.5}>
      <Stack flex={1} spacing={1.5}>
        <ControlledTextField name="code" label="topic code" />
        <ControlledTextField name="acronym" label="acronym" />
        <Box height="100%"></Box>
      </Stack>
      <Stack flex={2} spacing={1.5}>
        <ControlledTextField name="title" label="topic title" />
        <ControlledTextField
          name="description"
          label="description"
          tfProps={{ multiline: true, minRows: 3 }}
        />
        <ControlledTextField
          name="remarks"
          label="remarks"
          tfProps={{ multiline: true, minRows: 3 }}
        />
      </Stack>
    </Stack>
  );
};

export default TopicInfoSection;
