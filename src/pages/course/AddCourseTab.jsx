import React from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Container } from "@mui/material";
import useStyles from "../../hooks/useStyles";
import useCourseReq from "../../hooks/api/useCourseReq";
import CourseDetailsSection from "./CourseDetailsSection";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import useApiSend from "../../hooks/api/useApiSend";
import courseSchema from "../../schemas/course.js";
import constants from "../../configs/constants.js";

const initialValues = {
  database: constants?.DATABASES?.[0],
  code: "",
  acronym: "",
  title: "",
  description: "",
  subjects: null,
  remarks: "",
};
const AddCourseTab = () => {
  const styles = useStyles();
  const { addCourse } = useCourseReq();

  const { mutate: sendAddCourse } = useApiSend(addCourse, [
    "courses",
    "topics",
    "subjects",
  ]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(courseSchema),
    defaultValues: initialValues,
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
    dirtyFields,
  };

  const handleFormDataSubmit = async (rawData) => {
    const { topics, ...selectedData } = rawData;
    const formattedData = {
      ...selectedData,
      subjects: [
        ...new Set(
          selectedData?.subjects?.map((s) => s.title).filter((title) => title)
        ),
      ],
    };

    const cleanedFormattedData = Object.fromEntries(
      Object.entries(formattedData).filter(([key, value]) => {
        return value !== undefined && value !== null && value !== "";
      })
    );

    sendAddCourse({ data: cleanedFormattedData });
  };

  const handleClear = () => {
    reset(initialValues);
  };
  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
          <CourseDetailsSection />
          <br />
          <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
            <FormActionButton
              label="clear"
              onClickHandler={handleClear}
              variant="outlined"
              disabled={Object.keys(dirtyFields).length < 1}
            />
            <FormActionButton label="upload" disabled variant="outlined" />
            <FormActionButton
              type="submit"
              label="save"
              variant="contained"
              disabled={
                Object.keys(errors).length !== 0 ||
                !dirtyFields?.code ||
                !dirtyFields?.title
              }
            />
          </FormActionsContainer>
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default AddCourseTab;
