import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import DBSelectSection from "./DBSelectSection";
import AccessSection from "./AccessSection";
import DifficultySection from "./DifficultySection";
import ControlledLabelledTextField from "../../components/form/ControlledLabelledTextField";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import useApiGet from "../../hooks/api/useApiGet";
import useCourseReq from "../../hooks/api/useCourseReq";
import LoadingPage from "../LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import RequestErrorPage from "../RequestErrorPage";
import CSTSection from "./CSTSection";
import TypeSection from "./TypeSection";
import NatureSection from "./NatureSection";
import QuestionSection from "./QuestionSection";
const SCREEN_FLEX_PROPORTIONS = ["20%", "45%", "35%"];

const prepCoursesList = (courses) => {
  return courses.map((course) => `${course?.title}`);
};

const FormContentsSection = ({ control }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { get } = useCourseReq();

  const {
    data: coursesList,
    isLoading,
    error,
  } = useApiGet(
    "courses",
    () => get("/trimmed?fields=title,acronym,subjects"),
    {
      refetchOnWindowFocus: true,
      retry: 3,
      staleTime: Infinity,
    }
  );

  // const { data: coursesList } = useFetchCourse({
  //   reqParams: "/trimmed?fields=title,acronym,subjects",
  //   staleTime: Infinity,
  // });

  useEffect(() => {
    console.log("CLIST", coursesList);
  }, [coursesList]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    console.log(error?.response?.status);
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      console.log("re logging in");
      navigate("/login", { state: { from: location }, replace: true });
      return;
    } else {
      return <RequestErrorPage error={error} />;
    }
  }

  return (
    <>
      {/* {coursesList && <p>Has LIST Already</p>} */}
      <Stack spacing={1.5} id="all-items">
        <Stack
          spacing={1.5}
          direction={{ xs: "column", md: "row" }}
          id="all-forms"
        >
          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[0]}>
            <ElevatedSectionWrapper fullW={true} fullH={true}>
              <ControlledTextField label="code" name="code" control={control} />
            </ElevatedSectionWrapper>
            <DBSelectSection control={control} />
            <AccessSection control={control} />
          </Stack>
          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[1]}>
            <CSTSection
              control={control}
              completeCoursesList={coursesList || []}
              coursesList={coursesList ? prepCoursesList(coursesList) : []}
            />
          </Stack>
          <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[2]}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
              <TypeSection control={control} />
              <NatureSection control={control} />
            </Stack>
            <DifficultySection control={control} />
          </Stack>
        </Stack>
      </Stack>
      <br />
      <QuestionSection control={control} />
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
