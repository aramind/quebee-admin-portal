import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import useCourseReq from "../../hooks/api/useCourseReq";
import useApiGet from "../../hooks/api/useApiGet";
import { grey } from "@mui/material/colors";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import ACSandDOS from "../course/ACSandDOS";
import CourseDetailsSection from "../course/CourseDetailsSection";
import useFormSubmit from "../../hooks/useFormSubmit";
import FormWrapper from "../../wrappers/FormWrapper";

const ManageCoursePage = () => {
  const [value, setValue] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();
  const { get } = useCourseReq();

  const {
    data: coursesList,
    // isLoading,
    // error,
  } = useApiGet("courses", () => get("/trimmed"), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  const { control, handleSubmit, reset } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const formMethods = { control, reset };
  // console.log("COURSES", coursesList);

  useEffect(() => {
    setInitialValues({
      code: value?.code,
      acronym: value?.acronym,
      database: value?.database,
      title: value?.title,
      description: value?.description,
      remarks: value?.remarks,
      subjects: value?.subjects,
      status: value?.status,
      isHidden: value?.isHidden ? "yes" : "no",
      creator: value?.creator,
      createdAt: value?.createdAt,
      version: value?.version,
    });
  }, [value]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormDataSubmit = (rawData) => {
    alert("CLICKED SUBMIT", rawData);
  };

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={value}
              setValue={setValue}
              options={coursesList}
              label="courses"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <Stack flex={1}>
              <CourseDetailsSection
              // control={control}
              />
            </Stack>
            <Stack spacing={1.5} justifyContent="flex-start" width="180px">
              <ACSandDOS
                // control={control}
                values={initialValues}
              />
            </Stack>
          </Stack>

          <br />

          {/* <DevTool control={control} /> */}
          <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
            <FormActionButton
              label="undo changes"
              onClickHandler={handleUndo}
              variant="outlined"
            />
            <FormActionButton
              type="submit"
              label="save changes"
              variant="contained"
            />
          </FormActionsContainer>
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageCoursePage;
