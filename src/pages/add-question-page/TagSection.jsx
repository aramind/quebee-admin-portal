import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";
import constants from "../../components/configs/constants";

const TagSection = ({ control }) => {
  return (
    <Stack spacing={1.5} flex={1}>
      <ElevatedSectionWrapper fullH={true}>
        <ControlledChipMultiAutoComp
          name="tags"
          control={control}
          id="controlled-multi-select"
          label="select tag(s)"
          options={constants.TAGS}
          free={true}
          // chipColor="transparent"
          // chipColor={lime["A100"]}
        />
      </ElevatedSectionWrapper>
    </Stack>
  );
};

export default TagSection;
