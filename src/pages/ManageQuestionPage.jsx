import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import useStyles from "../hooks/useStyles";
import { useForm } from "react-hook-form";
import questionSchema from "../schemas/question";
import { zodResolver } from "@hookform/resolvers/zod";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";

import Label from "./manage-question-page/Label";
import Value from "./manage-question-page/Value";
import { useFetchQUestions } from "../hooks/useFetchQuestions";
import { formatDate } from "../utils/formatDate";
import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "../components/form/FormActionButton";
import { useState } from "react";

const SCREEN_FLEX_PROPORTIONS = ["60%", "20%", "20%"];

const ManageQuestionPage = () => {
  const styles = useStyles();
  const [questionIndex, setQuestionIndex] = useState(0);

  const { data: questions } = useFetchQUestions({
    params: "?status=pending",
    staleTime: Infinity,
  });

  // console.log("QUESTIONS", questions);
  const { handleSubmit } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });
  const onSubmit = (data) => {
    console.log("Submitting Question:", data);
  };

  const onError = (error) => {
    console.log("Error submitting question:", error);
  };

  // onClickHandlers
  const handleNext = () => {
    setQuestionIndex((prevIndex) => (prevIndex + 1) % questions?.length);
  };

  return (
    <Container maxWidth="xl" sx={styles.mainContainer}>
      {questions && (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Stack spacing={1.5}>
            <ElevatedSectionWrapper fullW={true}>
              <Stack direction="row">
                <Label label="code" />
                <Value values={questions[questionIndex]?.code} />
              </Stack>
            </ElevatedSectionWrapper>
            <ElevatedSectionWrapper fullW={true}>
              <Stack spacing={1}>
                <Label label="question" />
                <Value values={questions[questionIndex]?.question} />
                <RadioGroup>
                  {questions[questionIndex]?.choices?.map((choice) => {
                    return (
                      <FormControlLabel
                        value={choice.value}
                        control={<Radio />}
                        label={choice.value}
                        checked={choice.isCorrect}
                      />
                    );
                  })}
                </RadioGroup>
              </Stack>
            </ElevatedSectionWrapper>
            <ElevatedSectionWrapper>
              <Stack spacing={1}>
                <Label label="information" />
                <Value
                  values={questions[questionIndex]?.information || "----------"}
                />
              </Stack>
            </ElevatedSectionWrapper>
            <ElevatedSectionWrapper>
              <Stack spacing={1} direction="row">
                <Label label="tags" />
                <Value values={questions[questionIndex]?.tags} inChip />
              </Stack>
            </ElevatedSectionWrapper>
            <Stack direction="row" spacing={1}>
              <Stack flex={SCREEN_FLEX_PROPORTIONS[0]}>
                <ElevatedSectionWrapper fullW fullH>
                  <Stack spacing={1}>
                    <Stack direction="row">
                      <Label label="database" />
                      <Value values={questions[questionIndex]?.database} />
                    </Stack>
                    <Stack direction="row">
                      <Label label="course(s)" />
                      <Value
                        values={questions[questionIndex]?.courses}
                        inChip
                      />
                    </Stack>
                    <Stack direction="row">
                      <Label label="subject(s)" />
                      <Value
                        values={questions[questionIndex]?.subjects}
                        inChip
                      />
                    </Stack>
                    <Stack direction="row">
                      <Label label="topic(s)" />
                      <Value values={questions[questionIndex]?.topics} inChip />
                    </Stack>
                  </Stack>
                </ElevatedSectionWrapper>
              </Stack>
              <Stack flex={SCREEN_FLEX_PROPORTIONS[1]}>
                <ElevatedSectionWrapper fullW fullH>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                      <Label label="access" />
                      <Value values={questions[questionIndex]?.access} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="difficulty" />
                      <Value
                        values={`${questions[questionIndex]?.difficulty}/5`}
                      />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="nature" />
                      <Value values={questions[questionIndex]?.nature} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="type" />
                      <Value values={questions[questionIndex]?.type} />
                    </Stack>
                  </Stack>
                </ElevatedSectionWrapper>
              </Stack>
              <Stack flex={SCREEN_FLEX_PROPORTIONS[2]}>
                <ElevatedSectionWrapper fullW fullH>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                      <Label label="encoder" />
                      <Value values="abc31" />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="encoded" />
                      <Value
                        values={formatDate(questions[questionIndex]?.createdAt)}
                      />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="status" />
                      <Value values={questions[questionIndex]?.status} />
                    </Stack>
                  </Stack>
                </ElevatedSectionWrapper>
              </Stack>
            </Stack>
          </Stack>
          <br />
          <FormActionsContainer justify={{ sm: "center", xs: "center" }}>
            <FormActionButton
              label="previous"
              // onclickHandler={handlePrevious}
              variant="outlined"
            />
            <FormActionButton
              label="delete question"
              // onClickHandler={handleDelete}
              variant="contained"
            />
            <FormActionButton
              label="edit question"
              // onClickHandler={handleEdit}
              variant="contained"
            />
            <FormActionButton
              type="submit"
              label="upload question"
              variant="contained"
            />
            <FormActionButton
              label="next"
              onClickHandler={handleNext}
              variant="outlined"
            />
          </FormActionsContainer>
        </form>
      )}
    </Container>
  );
};

export default ManageQuestionPage;
