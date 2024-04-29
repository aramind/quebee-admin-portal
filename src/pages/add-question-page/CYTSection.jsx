import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Stack } from "@mui/material";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";
import { useState } from "react";

const CYTSection = ({
  control,
  coursesList = [],
  completeCoursesList = [],
  defaultValues,
}) => {
  const getSubjects = (coursesList) => {
    const subjects = Array.from(
      new Set(
        coursesList.flatMap((course) =>
          course.subjects.map((subject) => subject.longTitle)
        )
      )
    ).sort((a, b) => a.localeCompare(b));
    return subjects;
  };

  const getTopics = (coursesList) => {
    const topics = Array.from(
      new Set(
        coursesList.flatMap((course) =>
          course.subjects.flatMap((subject) => subject.topics)
        )
      )
    )
      .flat()
      .sort((a, b) => a.localeCompare(b));
    return topics;
  };

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
          defaultValues={defaultValues?.courses}
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
          options={getSubjects(completeCoursesList) || []}
          // chipColor={amber["A100"]}
          textTransform="uppercase"
          defaultValues={defaultValues?.subjects}
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
          options={getTopics(completeCoursesList) || []}
          // chipColor={cyan["A100"]}
          textTransform="capitalize"
          defaultValues={defaultValues?.topics}
        />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default CYTSection;
