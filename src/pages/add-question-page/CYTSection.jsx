import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Stack } from "@mui/material";
import ControlledChipMultiAutoComp from "../../components/form/ControlledChipMultiAutoComp";

const CYTSection = ({
  defaultValues,
  control,
  coursesList = [],
  completeCoursesList = [],
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
        <ControlledChipMultiAutoComp
          name="courses"
          control={control}
          id="controlled-multi-auto-comp"
          label="course(s)"
          options={coursesList || []}
          textTransform="uppercase"
          defaultValues={defaultValues?.courses}
        />

        <ControlledChipMultiAutoComp
          name="subjects"
          control={control}
          id="controlled-multi-auto-comp"
          label="subject(s)"
          options={getSubjects(completeCoursesList) || []}
          textTransform="uppercase"
          defaultValues={defaultValues?.subjects}
        />

        <ControlledChipMultiAutoComp
          name="topics"
          control={control}
          id="controlled-multi-auto-comp"
          label="topic(s)"
          options={getTopics(completeCoursesList) || []}
          textTransform="capitalize"
          defaultValues={defaultValues?.topics}
        />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default CYTSection;
