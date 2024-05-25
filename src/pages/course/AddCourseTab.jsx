import React from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Container } from "@mui/material";
import useStyles from "../../hooks/useStyles";
import useFormSubmit from "../../hooks/useFormSubmit";
import useCourseReq from "../../hooks/api/useCourseReq";
import CourseDetailsSection from "./CourseDetailsSection";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import { DevTool } from "@hookform/devtools";
import useApiSend from "../../hooks/api/useApiSend";

const AddCourseTab = () => {
  const styles = useStyles();
  const { addCourse } = useCourseReq();

  const { mutate: sendAddCourse } = useApiSend(
    addCourse,
    () => alert("Course added successfully"),
    (err) => alert("Error adding course. Try again.", err),
    ["courses", "topics", "subjects"]
  );
  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: {
      topics: [],
    },
  });

  const formMethods = { control, handleSubmit };

  const handleFormDataSubmit = async (rawData) => {
    // console.log("Submitting...");
    // console.log(rawData);
    const { topics, ...selectedData } = rawData;
    const formattedData = {
      ...selectedData,
      // subjects: selectedData?.subjects.map((s) => s.title),
      subjects: [
        ...new Set(
          selectedData?.subjects?.map((s) => s.title).filter((title) => title)
        ),
      ],
    };

    sendAddCourse({ data: formattedData });
    alert("SUBMITTED");
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
          <CourseDetailsSection />
          <br />
          <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
            <FormActionButton
              label="clear"
              // onClickHandler={handleClear}
              variant="outlined"
            />
            <FormActionButton
              label="upload"
              // onClickHandler={handleUpload}
              variant="outlined"
            />
            <FormActionButton type="submit" label="save" variant="contained" />
          </FormActionsContainer>
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default AddCourseTab;
