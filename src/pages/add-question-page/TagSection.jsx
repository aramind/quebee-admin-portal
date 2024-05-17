import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import constants from "../../configs/constants";

const TagSection = ({ control, getValues }) => {
  // console.log(getValues("tags"));
  return (
    <Stack spacing={1.5} flex={1}>
      <ElevatedSectionWrapper fullH={true}>
        <ControlledChipMultiAutoComp
          name="tags"
          control={control}
          id="controlled-multi-select"
          label="select tag(s)"
          options={constants.TAGS}
          free
          // defaultValue={getValues("tags")}
        />
      </ElevatedSectionWrapper>
    </Stack>
  );
};

export default TagSection;

// TODO: (3) fetch tags in the database
