import { Container } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import CourseDetailsSection from "../common-sections/CourseDetailsSection";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const ManageCoursePage = () => {
  const styles = useStyles();

  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
  });

  const onSubmit = (rawData) => {
    alert("CLICKED SUBMIT", rawData);
  };

  const onError = (err) => {
    alert("Encountered an error updating user. Please try again later", err);
  };

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.mainContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper></ElevatedSectionWrapper>
        <br />
        <CourseDetailsSection control={control} />
        <br />
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
      <DevTool control={control} />
    </Container>
  );
};

export default ManageCoursePage;
