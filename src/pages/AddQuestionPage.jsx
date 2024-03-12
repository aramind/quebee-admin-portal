import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../hooks/useStyles";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "../components/form/FormActionButton";
import questionSchema from "../schemas/question";

import TagSection from "./add-question-page/TagSection";
import RadioGroupsSection from "./add-question-page/RadioGroupsSection";
import DifficultySection from "./add-question-page/DifficultySection";
import CYTSection from "./add-question-page/CYTSection";
import DBSelectSection from "./add-question-page/DBSelectSection";

import AccessSection from "./add-question-page/AccessSection";
import QuestionSection from "./add-question-page/QuestionSection";
import { DevTool } from "@hookform/devtools";

const SCREEN_FLEX_PROPORTIONS = ["20%", "45%", "35%"];
const AddQuestionPage = () => {
  const styles = useStyles();

  const formatData = (originalData) => {
    const {
      database,
      courses,
      subjects,
      topics,
      tags,
      difficulty,
      type,
      nature,
      access,
      question,
      correctAnswer,
      ...choicesData
    } = originalData;

    const choices = Object.entries(choicesData).map(([key, value]) => ({
      value,
      isCorrect: key.toLowerCase() === correctAnswer.toLowerCase(),
    }));

    const formattedData = {
      database,
      courses,
      subjects,
      topics,
      tags,
      difficulty,
      type,
      nature,
      access,
      question,
      choices,
    };

    return formattedData;
  };
  // form related
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("onSubmit triggered");
    console.log("raw data:", data);

    const formattedData = formatData(data);
    console.log("Submitting question...", formattedData);

    // Convert the JavaScript object to a string
    const formattedDataString = JSON.stringify(formattedData, null, 2);

    // Display the formatted data in an alert
    alert(formattedDataString);
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
        <Stack spacing={1.5} id="all-items">
          <Stack
            spacing={1.5}
            direction={{ xs: "column", md: "row" }}
            id="all-forms"
          >
            <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[0]}>
              <DBSelectSection control={control} />
              <AccessSection control={control} />
            </Stack>
            <Stack spacing={1.5} flex={SCREEN_FLEX_PROPORTIONS[1]}>
              {/* <CourseSection control={control} />
              <STSection control={control} /> */}
              <CYTSection control={control} />
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
        <TagSection control={control} />
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
      <DevTool control={control} />
    </Container>
  );
};

export default AddQuestionPage;
