import { Box, Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import constants from "../../configs/constants";

const MetaInfoSection = ({ control }) => {
  return (
    <>
      <Stack direction="row" spacing={1.5} alignItems="start">
        <ElevatedSectionWrapper>
          <Stack direction="row" spacing={1.5}>
            <ControlledSimpleSelect
              label="database"
              name="database"
              control={control}
              options={constants?.DATABASES || []}
            />
            <ControlledTextField name="code" label="code" control={control} />
          </Stack>
        </ElevatedSectionWrapper>

        <ElevatedSectionWrapper flex={1.5}>
          <Stack direction="row" spacing={1.5}>
            <ControlledTextField
              name="acronym"
              label="acronym"
              control={control}
            />

            <ControlledTextField
              name="title"
              label="title"
              control={control}
              flex={2.5}
            />
          </Stack>
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper flex={1.5}>
          <ControlledTextField
            label="description"
            name="description"
            control={control}
            tfProps={{ multiline: true, minRows: 1 }}
          />
        </ElevatedSectionWrapper>
      </Stack>
    </>
  );
};

export default MetaInfoSection;
