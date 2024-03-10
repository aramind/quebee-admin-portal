import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Box, Stack } from "@mui/material";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";
import constants from "../../components/configs/constants";

const CYTSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullH={true}>
      <Stack spacing={1.5}>
        {/* <ControlledChipMultiSelect
                    name="courses"
                    control={control}
                    id="controlled-multi-select"
                    label="course(s)"
                    options={constants.COURSES}
                  /> */}

        <ControlledChipMultiAutoComp
          name="courses"
          control={control}
          id="controlled-multi-auto-comp"
          label="course(s)"
          options={constants.COURSES}
          free={false}
          // chipColor={teal["A100"]}

          textTransform="uppercase"
        />

        {/* <ControlledChipMultiSelect
                    name="subjects"
                    control={control}
                    id="controlled-multi-select"
                    label="subject(s)"
                    options={constants.SUBJECTS}
                  /> */}

        <ControlledChipMultiAutoComp
          name="subjects"
          control={control}
          id="controlled-multi-auto-comp"
          label="subject(s)"
          options={constants.SUBJECTS}
          free={false}
          // chipColor={amber["A100"]}
          textTransform="uppercase"
        />

        {/* <ControlledChipMultiSelect
                    name="topics"
                    control={control}
                    id="controlled-multi-select"
                    label="select topic(s)"
                    options={constants.TOPICS}
                  /> */}

        <ControlledChipMultiAutoComp
          name="topics"
          control={control}
          id="controlled-multi-auto-comp"
          label="topic(s)"
          options={constants.TOPICS}
          free={false}
          // chipColor={cyan["A100"]}
          textTransform="capitalize"
        />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default CYTSection;
