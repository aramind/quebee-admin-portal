import { useForm } from "react-hook-form";
import useStyles from "../../hooks/useStyles";
import questionSchema from "../../schemas/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@mui/material";
import FormContentsSection from "./FormContentsSection";
import FormActionsSection from "./FormActionsSection";
import { DevTool } from "@hookform/devtools";

import { useAddQuestion } from "../../hooks/useAddQuestion";
import constants from "../../components/configs/constants";
import useApiGet from "../../hooks/api/useApiGet";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import LoadingPage from "../LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import RequestErrorPage from "../RequestErrorPage";

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
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
    defaultValues: {
      database: constants?.DATABASES?.[0],
      access: constants?.ACCESS?.[1],
    },
  });

  //
  const { mutate: addQuestion } = useAddQuestion(
    onAddQuestionSuccess,
    onAddQuestionError
  );

  const {
    data: fetchedQuestions,
    isLoading,
    error,
  } = useApiGet("questions", get, {
    // refetchOnWindowFocus: true,
    retry: 3,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    console.log(error?.response?.status);
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      console.log("re logging in");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      return <RequestErrorPage error={error} />;
    }
  }

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
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters>
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
