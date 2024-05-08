import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import DBSelectSection from "./DBSelectSection";
import AccessSection from "./AccessSection";
import CYTSection from "./CYTSection";
import { useFetchCourse } from "../../hooks/useFetchCourse";
import RadioGroupsSection from "./RadioGroupsSection";
import DifficultySection from "./DifficultySection";
import ControlledLabelledTextField from "../../components/form/ControlledLabelledTextField";
const SCREEN_FLEX_PROPORTIONS = ["20%", "45%", "35%"];

const prepCoursesList = (courses) => {
  return courses.map((course) => `${course?.title}`);
};

const FormContentsSection = ({ control }) => {
  const { data: coursesList } = useFetchCourse({
    reqParams: "/trimmed?fields=title,acronym,subjects",
    staleTime: Infinity,
  });

  return (
    <>
      <Stack spacing={1.5} id="all-items">
        <Stack
          spacing={1.5}
          direction={{ xs: "column", md: "row" }}
          id="all-forms"
        >
          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[0]}>
            <ElevatedSectionWrapper fullW={true} fullH={true}>
              <ControlledLabelledTextField
                label="code"
                name="code"
                control={control}
              />
            </ElevatedSectionWrapper>
            <DBSelectSection control={control} />
            <AccessSection control={control} />
          </Stack>
          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[1]}>
            {/* <CourseSection control={control} />
              <STSection control={control} /> */}

            <CYTSection
              control={control}
              completeCoursesList={coursesList || []}
              coursesList={coursesList ? prepCoursesList(coursesList) : []}
              // defaultValues={defaultValues}
            />
          </Stack>

          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[2]}>
            <RadioGroupsSection control={control} />
            <DifficultySection control={control} />
          </Stack>
        </Stack>
      </Stack>
      {/* <br />
      <QuestionSection control={control} defaultValues={defaultValues} /> */}
      <br />
      <ElevatedSectionWrapper fullW={true}>
        <ControlledLabelledTextField
          label="information"
          id="information"
          control={control}
          multiline={true}
          minRows={2}
        />
      </ElevatedSectionWrapper>
      <br />
      {/* <TagSection control={control} defaultValues={defaultValues?.tags} /> */}
      <br />
      <ElevatedSectionWrapper fullW={true}>
        <ControlledLabelledTextField
          label="remarks"
          id="remarks"
          control={control}
        />
      </ElevatedSectionWrapper>
    </>
  );
};

export default FormContentsSection;
