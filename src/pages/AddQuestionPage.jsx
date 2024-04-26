import { Container, Stack } from "@mui/material";
import useStyles from "../hooks/useStyles";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import questionSchema from "../schemas/question";

import TagSection from "./add-question-page/TagSection";
import RadioGroupsSection from "./add-question-page/RadioGroupsSection";
import DifficultySection from "./add-question-page/DifficultySection";
import CYTSection from "./add-question-page/CYTSection";
import DBSelectSection from "./add-question-page/DBSelectSection";

import AccessSection from "./add-question-page/AccessSection";
import QuestionSection from "./add-question-page/QuestionSection";
import { DevTool } from "@hookform/devtools";

import { useFetchCourse } from "../hooks/useFetchCourse";
import { useAddQuestion } from "../hooks/useAddQuestion";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import LabelledTextField from "../components/form/LabelledTextField";
import FormActionsSection from "./add-question-page/FormActionsSection";
import FormContentsSection from "./add-question-page/FormContentsSection";

const SCREEN_FLEX_PROPORTIONS = ["20%", "45%", "35%"];

const prepCoursesList = (courses) => {
  return courses.map((course) => `${course?.title}`);
};

const onAddQuestionSuccess = () => {
  alert("Question added successfully");
};

const onAddQuestionError = () => {
  alert("Error adding question.Try again!");
};

const AddQuestionPage = () => {
  const styles = useStyles();
  const { mutate: addQuestion } = useAddQuestion(
    onAddQuestionSuccess,
    onAddQuestionError
  );
  const { data: coursesList } = useFetchCourse({
    reqParams: "/trimmed?fields=title,acronym,subjects",
    staleTime: Infinity,
  });

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
  const { handleSubmit, control, watch, getValues, register } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("onSubmit triggered");
    console.log("raw data:", data);

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
  const handleUpload = () => {
    console.log("handling clear");
  };

  // console.log("COURSES LIST", coursesList);
  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <FormContentsSection
          register={register}
          control={control}
          getValues={getValues}
          watch={watch}
        />

        <br />
        <FormActionsSection handleClear={handleClear} />
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default AddQuestionPage;
