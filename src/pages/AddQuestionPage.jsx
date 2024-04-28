import { Container, Stack } from "@mui/material";
import useStyles from "../hooks/useStyles";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "../components/form/FormActionButton";
import questionSchema from "../schemas/question";

import { DevTool } from "@hookform/devtools";

import { useAddQuestion } from "../hooks/useAddQuestion";

import FormContentsSection from "./add-question-page/FormContentsSection";
import FormActionsSection from "./add-question-page/FormActionsSection";

const onAddQuestionSucess = () => {
  alert("Question added successfully");
};

const onAddQuestionError = () => {
  alert("Error adding question.Try again!");
};

const defaultValues = {};

const AddQuestionPage = () => {
  const styles = useStyles();
  const { mutate: addQuestion } = useAddQuestion(
    onAddQuestionSucess,
    onAddQuestionError
  );

  const formatData = (originalData) => {
    const {
      code,
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
      information,
      remarks,
      ...choicesData
    } = originalData;

    const choices = Object.entries(choicesData).map(([key, value]) => ({
      value,
      isCorrect: key.toLowerCase() === correctAnswer.toLowerCase(),
    }));

    const formattedData = {
      code,
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
      information,
      remarks,
      creator: "6606cd49d6e168904285a93c",
    };

    // console.log(formattedData);
    return formattedData;
  };
  // form related
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    // console.log("onSubmit triggered");
    // console.log("raw data:", data);

    const formattedData = formatData(data);
    // console.log("Submitting question...", formattedData);

    addQuestion(formattedData);
    // Convert the JavaScript object to a string
    // const formattedDataString = JSON.stringify(formattedData, null, 2);

    // Display the formatted data in an alert
    // alert(formattedDataString);
  };

  const onError = (err) => {
    console.log("Error submitting question", err);
  };

  // handlers todo
  const handleClear = () => {
    console.log("handling clear");
  };

  // console.log("COURSES LIST", coursesList);
  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <FormContentsSection control={control} defaultValues={defaultValues} />
        <br />
        <FormActionsSection
          handleClear={handleClear}
          handleSubmit={handleSubmit}
        />
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default AddQuestionPage;
