import React from "react";
import useStyles from "../../hooks/useStyles";

import { useForm } from "react-hook-form";
import { Box, Container } from "@mui/material";

import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import useCourseReq from "../../hooks/api/useCourseReq";

import CourseDetailsSection from "../common-sections/CourseDetailsSection";

const AddCoursePage = () => {
  const styles = useStyles();

  const { addCourse } = useCourseReq();

  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const finalData = { ...data, subjects: data?.subjects.map((s) => s.title) };
    // console.log("COURSE", finalData);
    addCourse({ data: finalData });
    alert("SUBMITTED");
  };

  const onError = (err) => {
    console.log("Error in form", err);
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.tabContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <CourseDetailsSection control={control} />
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
  );
};

export default AddCoursePage;
