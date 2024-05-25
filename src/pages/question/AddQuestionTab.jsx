import { Container } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import FormWrapper from "../../wrappers/FormWrapper";
import useFormSubmit from "../../hooks/useFormSubmit";

import useQuestionReq from "../../hooks/api/useQuestionReq";
import useApiSend from "../../hooks/api/useApiSend";

import QuestionDetails from "./QuestionDetails";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

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
          <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
            <FormActionButton
              label="clear"
              onClickHandler={handleClear}
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

export default AddQuestionTab;
