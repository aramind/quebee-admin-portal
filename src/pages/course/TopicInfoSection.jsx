import { Box, Stack } from "@mui/material";
import React from "react";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

const TopicInfoSection = ({ control }) => {
  return (
    <Stack direction="row" spacing={1.5}>
      <Stack flex={1} spacing={1.5}>
        <ControlledTextField control={control} name="code" label="topic code" />
        <ControlledTextField control={control} name="acronym" label="acronym" />
        <Box height="100%"></Box>
      </Stack>
      <Stack flex={2} spacing={1.5}>
        <ControlledTextField
          control={control}
          name="title"
          label="topic title"
        />
        <ControlledTextField
          control={control}
          name="description"
          label="description"
          tfProps={{ multiline: true, minRows: 3 }}
        />
      </Stack>
    </Stack>
  );
};

export default TopicInfoSection;
