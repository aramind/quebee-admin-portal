import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";

import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormWrapper from "../../wrappers/FormWrapper";
import useFormSubmit from "../../hooks/useFormSubmit";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";
import useApiGet from "../../hooks/api/useApiGet";
import useTopicReq from "../../hooks/api/useTopicReq";
import DifficultySection from "./DifficultySection";
import constants from "../../configs/constants";
import ContRadGroup from "../../components/form-controlled/ContRadGroup";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import QSection from "./QSection";
import ChoicesSection from "./ChoicesSection";
import FormActionsSection from "../add-question-page/FormActionsSection";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import useApiSend from "../../hooks/api/useApiSend";
import { red, teal } from "@mui/material/colors";
import AddTopicDialog from "../add-course-page/AddTopicDialog";
import QuestionDetails from "./QuestionDetails";

const AddQuestionTab = () => {
  const styles = useStyles();

  const { add } = useQuestionReq();

  const { mutate: addQuestion } = useApiSend(
    add,
    () => console.log("Question submitted."),
    (err) => console.error("Error submitting question. Try again.", err)
  );

  const { control, handleSubmit, setValue, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      code: "",
      topics: [],
      access: 2,
      type: "ob",
      isHidden: false,
    },
  });

  const formMethods = { control, handleSubmit, setValue };

  const handleFormDataSubmit = async (rawData) => {
    console.log("Submitting...");
    // console.log(rawData);
    const questionData = {
      code: rawData?.code,
      access: +rawData?.access,
      difficulty: +rawData?.difficulty,
      topics: rawData?.topics?.map((topic) => topic?._id),
      type: rawData?.type,
      question: { text: rawData?.question, image: "" },
      choices: [
        {
          value: { text: rawData?.A, image: "" },
          isCorrect: rawData?.correctAnswer === "A",
        },
        {
          value: { text: rawData?.B, image: "" },
          isCorrect: rawData?.correctAnswer === "B",
        },
        {
          value: { text: rawData?.C, image: "" },
          isCorrect: rawData?.correctAnswer === "C",
        },
        {
          value: { text: rawData?.D, image: "" },
          isCorrect: rawData?.correctAnswer === "D",
        },
      ],

      information: {
        text: rawData?.information,
        image: "",
      },

      isHidden:
        typeof rawData.isHidden !== "string"
          ? rawData.isHidden
          : rawData?.isHidden === "true"
          ? true
          : false,
      tags: rawData?.tags,
      remarks: rawData?.remarks,
      status: "pending",
    };

    console.log("QD", questionData);
    addQuestion(questionData);
    alert("SUBMITTED");
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  const handleClear = () => {
    reset();
  };

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <QuestionDetails />
          <br />
          <FormActionsSection
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default AddQuestionTab;
