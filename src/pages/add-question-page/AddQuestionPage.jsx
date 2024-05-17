import { useForm } from "react-hook-form";
import useStyles from "../../hooks/useStyles";
import questionSchema from "../../schemas/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Typography } from "@mui/material";
import FormContentsSection from "./FormContentsSection";
import FormActionsSection from "./FormActionsSection";
import { DevTool } from "@hookform/devtools";

import { useAddQuestion } from "../../hooks/useAddQuestion";
import useApiGet from "../../hooks/api/useApiGet";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import LoadingPage from "../LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import RequestErrorPage from "../RequestErrorPage";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import constants from "../../configs/constants";
import { red } from "@mui/material/colors";

const onAddQuestionSuccess = () => {
  alert("Question added successfully");
};

const onAddQuestionError = () => {
  alert("Error adding question.Try again!");
};

const AddQuestionPage = () => {
  const styles = useStyles();
  const { get } = useQuestionReq();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  // console.log(auth);

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
    defaultValues: {
      database: constants?.DATABASES?.[0],
      access: constants?.ACCESS?.[0],
      type: constants?.TYPE[0]?.key,
      nature: constants?.NATURE[0]?.key,
    },
  });

  //
  const { mutate: addQuestion } = useAddQuestion(
    onAddQuestionSuccess,
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
      creator: auth?._id,
    };

    console.log(formattedData);
    return formattedData;
  };
  // form related

  const onSubmit = (data) => {
    const formattedData = formatData(data);

    addQuestion(formattedData);
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
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters>
      <Typography color={red[500]}>OLD ADD QUESTION PAGE</Typography>
      <br />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <FormContentsSection control={control} />
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
