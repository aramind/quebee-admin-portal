import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";
import constants from "../../components/configs/constants";

const TagSection = ({ defaultValues, watch, control, getValue }) => {
  return (
    <Stack spacing={1.5} flex={1}>
      <ElevatedSectionWrapper fullH={true}>
        <ControlledChipMultiAutoComp
          name="tags"
          getValue={getValue}
          control={control}
          id="controlled-multi-select"
          label="select tag(s)"
          options={constants.TAGS}
          free
          defaultValues={defaultValues?.tags}
          watch={watch}
        />
      </ElevatedSectionWrapper>
    </Stack>
  );
};

export default TagSection;
