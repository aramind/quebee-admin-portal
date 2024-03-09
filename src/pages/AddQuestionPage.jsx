import { Box, Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../hooks/useStyles";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import LabelledSelect from "../components/form/LabelledSelect";
import SimpleSelect from "../components/SimpleSelect";
import constants from "../components/configs/constants";
import ControlledSimpleSelect from "../components/form/ControlledSimpleSelect";
import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "../components/form/FormActionButton";
import questionSchema from "../schemas/question";

const AddQuestionPage = () => {
  const styles = useStyles();

  // form related
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("Submitting question...", data);
  };

  const onError = (err) => {
    console.log("Error submitting question", err);
  };

  // handlers todo
  const handleClear = () => {
    console.log("handling clear");
  };
  const handleUpload = () => {
    console.log("handling clear");
  };

  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper>
          <Box width={{ xs: 1, md: "33%" }} minWidth="300px">
            <ControlledSimpleSelect
              name="database"
              id="add-question-database"
              control={control}
              label="Choose Database"
              options={constants.DATABASES}
            />
          </Box>
        </ElevatedSectionWrapper>
        <br />
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box className="outlined" flex={{ xs: 1, md: "50%" }}>
            <ElevatedSectionWrapper></ElevatedSectionWrapper>
          </Box>
          <Box className="outlined" flex={{ xs: 1, md: "50%" }}>
            <ElevatedSectionWrapper>Hey</ElevatedSectionWrapper>
          </Box>
        </Stack>
        <br />
        <FormActionsContainer>
          <FormActionButton
            label="clear"
            onClickHandler={handleClear}
            variant="outlined"
          />
          <FormActionButton
            label="upload"
            onClickHandler={handleUpload}
            variant="outlined"
          />
          <FormActionButton type="submit" label="save" variant="contained" />
        </FormActionsContainer>
      </form>
    </Container>
  );
};

export default AddQuestionPage;
