import React, { useEffect, useState } from "react";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import useApiGet from "../../hooks/api/useApiGet";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Container, Stack } from "@mui/material";
import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import useFormSubmit from "../../hooks/useFormSubmit";
import { grey } from "@mui/material/colors";
import ACSandDOS from "../course/ACSandDOS";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import { DevTool } from "@hookform/devtools";
import QuestionDetails from "./QuestionDetails";
import useApiSend from "../../hooks/api/useApiSend";

const getLetterOfCorrectAnswer = (choices) => {
  const correct = choices?.find((choice) => choice.isCorrect);
  const indexOfCorrectAnswer = choices?.indexOf(correct);

  switch (indexOfCorrectAnswer) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return undefined;
  }
};

const ManageQuestionTab = () => {
  const { get } = useQuestionReq();
  const [initialValues, setInitialValues] = useState({});
  const [fetchValues, setFetchValues] = useState(null);
  const styles = useStyles();
  const { edit } = useQuestionReq();

  const { data: questionsList } = useApiGet(
    "questions",
    () => get("/trimmed"),
    {
      retry: 3,
    }
  );

  const { mutate: sendUpdate } = useApiSend();

  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const formMethods = { control, handleSubmit, reset, setValue, getValues };

  useEffect(() => {
    setInitialValues({
      ...fetchValues,
      question: fetchValues?.question?.text,
      A: fetchValues?.choices?.[0].value?.text,
      B: fetchValues?.choices?.[1].value?.text,
      C: fetchValues?.choices?.[2].value?.text,
      D: fetchValues?.choices?.[3].value?.text,
      information: fetchValues?.information?.text,
      correctAnswer: getLetterOfCorrectAnswer(fetchValues?.choices),
      isHidden: fetchValues?.isHidden ? "yes" : "no",
    });
  }, [fetchValues]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  const handleFormDataSubmit = async (rawData) => {
    const formattedData = {
      code: rawData?.code,
      access: Number(rawData?.access),
      difficulty: Number(rawData?.difficulty),
      topics: rawData?.topics?.map((topic) => topic._id),
      type: rawData?.type,
      question: { text: rawData?.question },
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
      information: { text: rawData?.information },
      isHidden: rawData?.isHidden === "yes",
      tags: rawData?.tags,
      remarks: rawData?.remarks,
      creator: rawData?.creator?._id,
      status: rawData?.status,
    };
    sendUpdate({
      id: rawData?._id,
      data: formattedData,
    });
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
              value={fetchValues}
              setValue={setFetchValues}
              options={questionsList}
              label="question"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <Stack flex={1}>
              <QuestionDetails />
            </Stack>
            <Stack spacing={1.5} justifyContent="flex-start" width="180px">
              <ACSandDOS values={initialValues} />
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
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageQuestionTab;
