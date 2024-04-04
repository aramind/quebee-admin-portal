import React, { useEffect, useState } from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Stack } from "@mui/material";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";
import constants from "../../components/configs/constants";
import { getCourseByParams } from "../../utils/login/apiRequests";

const CYTSection = ({ control }) => {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getCourseByParams(
          "/trimmed?fields=title,acronym"
        );
        setCoursesList(
          courses.map((course) => `${course?.title} (${course?.acronym})`)
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchCourses();
  }, []);

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
          // options={constants.COURSES}
          options={coursesList}
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
          // chipColor={cyan["A100"]}
          textTransform="capitalize"
        />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default CYTSection;
