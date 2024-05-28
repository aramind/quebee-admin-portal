import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import SelectDb from "../../components/form-finished/SelectDb";

const MetaInfoSection = () => {
  return (
    <>
      <Stack direction="row" spacing={1.5} alignItems="start">
        <ElevatedSectionWrapper>
          <Stack direction="row" spacing={1.5}>
            <SelectDb />
            <ControlledTextField name="code" label="code (required)" />
          </Stack>
        </ElevatedSectionWrapper>

        <ElevatedSectionWrapper flex={1.5}>
          <Stack direction="row" spacing={1.5}>
            <ControlledTextField name="acronym" label="acronym" />
            <ControlledTextField
              name="title"
              label="title (required)"
              flex={2.5}
            />
          </Stack>
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper flex={1.5}>
          <ControlledTextField
            label="description"
            name="description"
            tfProps={{ multiline: true, minRows: 1 }}
          />
        </ElevatedSectionWrapper>
      </Stack>
    </>
  );
};

export default MetaInfoSection;
