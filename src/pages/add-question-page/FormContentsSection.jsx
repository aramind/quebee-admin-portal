import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import LabelledTextField from "../../components/form/LabelledTextField";
import DBSelectSection from "./DBSelectSection";
import AccessSection from "./AccessSection";
import CYTSection from "./CYTSection";
import RadioGroupsSection from "./RadioGroupsSection";
import DifficultySection from "./DifficultySection";
import { useFetchCourse } from "../../hooks/useFetchCourse";
import QuestionSection from "./QuestionSection";
import TagSection from "./TagSection";

const SCREEN_FLEX_PROPORTIONS = ["20%", "45%", "35%"];

const prepCoursesList = (courses) => {
  return courses.map((course) => `${course?.title}`);
};

const FormContentsSection = ({
  getValue,
  defaultValues,
  register,
  control,
  getValues,
  watch,
}) => {
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
              <LabelledTextField
                control={control}
                label="code"
                id="code"
                register={register}
              />
            </ElevatedSectionWrapper>
            <DBSelectSection control={control} />
            <AccessSection control={control} />
          </Stack>
          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[1]}>
            {/* <CourseSection control={control} />
              <STSection control={control} /> */}

            <CYTSection
              getValue={getValue}
              control={control}
              defaultValues={defaultValues}
              completeCoursesList={coursesList || []}
              coursesList={coursesList ? prepCoursesList(coursesList) : []}
              getValues={getValues}
              watch={watch}
            />
          </Stack>

          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[2]}>
            <RadioGroupsSection control={control} />
            <DifficultySection control={control} />
          </Stack>
        </Stack>
      </Stack>
      <br />
      <QuestionSection control={control} />
      <br />
      <ElevatedSectionWrapper fullW={true} fullH={true}>
        <LabelledTextField
          control={control}
          label="information"
          id="information"
          //   register={register}
          multiline={true}
          minRows={2}
        />
      </ElevatedSectionWrapper>
      <br />
      <TagSection
        control={control}
        getValue={getValue}
        defaultValues={defaultValues}
        watch={watch}
      />
      <br />
      <ElevatedSectionWrapper fullW={true} fullH={true}>
        <LabelledTextField
          control={control}
          label="remarks"
          id="remarks"
          register={register}
        />
      </ElevatedSectionWrapper>
    </>
  );
};

export default FormContentsSection;
