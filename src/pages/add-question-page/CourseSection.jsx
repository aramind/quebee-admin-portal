import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";
import constants from "../../components/configs/constants";

const CourseSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper>
      {/* <ControlledChipMultiSelect
                    name="courses"
                    // control={control}
                    id="controlled-multi-select"
                    label="course(s)"
                    options={constants.COURSES}
                  /> */}
      <ControlledChipMultiAutoComp
        name="courses"
        // control={control}
        id="controlled-multi-auto-comp"
        label="course(s)"
        options={constants.COURSES}
        free={false}
        // chipColor={teal["A100"]}

        textTransform="uppercase"
      />
    </ElevatedSectionWrapper>
  );
};

export default CourseSection;
