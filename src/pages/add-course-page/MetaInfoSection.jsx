import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import constants from "../../components/configs/constants";

const MetaInfoSection = ({ control }) => {
  return (
    <Stack spacing={1.5} direction="row">
      <ElevatedSectionWrapper width="40%">
        <Stack spacing={1.5}>
          <ControlledTextField name="code" label="code" control={control} />
          <ControlledTextField
            name="acronym"
            label="acronym"
            control={control}
          />
        </Stack>
      </ElevatedSectionWrapper>
      <ElevatedSectionWrapper width="50%">
        <Stack spacing={1.5}>
          <ControlledSimpleSelect
            label="database"
            name="database"
            control={control}
            options={constants?.DATABASES || []}
          />
          <ControlledTextField name="title" label="title" control={control} />
        </Stack>
      </ElevatedSectionWrapper>
      <ElevatedSectionWrapper fullW>
        <Stack spacing={1.5}>
          <ControlledTextField
            label="description"
            name="description"
            control={control}
            tfProps={{ multiline: true, minRows: 4 }}
          />
        </Stack>
      </ElevatedSectionWrapper>
    </Stack>
  );
};

export default MetaInfoSection;
