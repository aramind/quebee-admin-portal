import React, { Fragment } from "react";
import useStyles from "../../hooks/useStyles";
import { zodResolver } from "@hookform/resolvers/zod";
import courseSchema from "../../schemas/course";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import constants from "../../components/configs/constants";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import MetaInfoSection from "./MetaInfoSection";
import SubjectSection from "./SubjectSection";

const dummySubjects = [
  { code: "A001", name: "Engineering" },
  { code: "A002", name: "Science and Tech" },
  { code: "A003", name: "Humanities" },
];

const AddCoursePage = () => {
  const styles = useStyles();

  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    alert("CLICKED");
    console.log("COURSE", data);
  };

  const onError = (err) => {
    console.log("Error in form", err);
  };
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.mainContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <MetaInfoSection control={control} />
        <br />
        <Stack flex={2} width="100%" direction="row" justifyContent="flex-end">
          <Typography>Not on the list?</Typography>
          <Stack width="150px">
            <Button variant="outlined" size="small">
              Add a subject
            </Button>
            <Button variant="outlined" size="small">
              Add a topic
            </Button>
          </Stack>
        </Stack>

        <br />

        <SubjectSection control={control} />

        <br />
        <ElevatedSectionWrapper>
          <ControlledTextField
            name="remarks"
            label="remarks"
            control={control}
          />
        </ElevatedSectionWrapper>
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
