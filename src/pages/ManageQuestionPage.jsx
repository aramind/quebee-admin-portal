import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "../hooks/useStyles";
import { useForm } from "react-hook-form";
import questionSchema from "../schemas/question";
import { zodResolver } from "@hookform/resolvers/zod";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";

import Label from "./manage-question-page/Label";
import Value from "./manage-question-page/Value";
import { useFetchQUestions } from "../hooks/useFetchQuestions";
import { formatDate } from "../utils/formatDate";

const SCREEN_FLEX_PROPORTIONS = ["60%", "20%", "20%"];

const ManageQuestionPage = () => {
  const styles = useStyles();

  const { data: questions } = useFetchQUestions({
    params: "?status=pending",
    staleTime: Infinity,
  });

  console.log("QUESTIONS", questions);
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
  return (
    <Container maxWidth="xl" sx={styles.mainContainer}>
      {questions && (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Stack spacing={1.5}>
            <ElevatedSectionWrapper fullW={true}>
              <Stack direction="row">
                <Label label="code" />
                <Value values={questions[0]?.code} />
              </Stack>
            </ElevatedSectionWrapper>
            <ElevatedSectionWrapper fullW={true}>
              <Stack spacing={1}>
                <Label label="question" />
                <Value values={questions[0]?.question} />
                <RadioGroup>
                  {questions[0]?.choices?.map((choice) => {
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
                <Value values={questions[0]?.information || "----------"} />
              </Stack>
            </ElevatedSectionWrapper>
            <ElevatedSectionWrapper>
              <Stack spacing={1} direction="row">
                <Label label="tags" />
                <Value values={questions[0]?.tags} inChip />
              </Stack>
            </ElevatedSectionWrapper>
            <Stack direction="row" spacing={1}>
              <Stack flex={SCREEN_FLEX_PROPORTIONS[0]}>
                <ElevatedSectionWrapper fullW fullH>
                  <Stack spacing={1}>
                    <Stack direction="row">
                      <Label label="database" />
                      <Value values={questions[0]?.database} />
                    </Stack>
                    <Stack direction="row">
                      <Label label="course(s)" />
                      <Value values={questions[0]?.courses} inChip />
                    </Stack>
                    <Stack direction="row">
                      <Label label="subject(s)" />
                      <Value values={questions[0]?.subjects} inChip />
                    </Stack>
                    <Stack direction="row">
                      <Label label="topic(s)" />
                      <Value values={questions[0]?.topics} inChip />
                    </Stack>
                  </Stack>
                </ElevatedSectionWrapper>
              </Stack>
              <Stack flex={SCREEN_FLEX_PROPORTIONS[1]}>
                <ElevatedSectionWrapper fullW fullH>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                      <Label label="access" />
                      <Value values={questions[0]?.access} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="difficulty" />
                      <Value values={`${questions[0]?.difficulty}/5`} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="nature" />
                      <Value values={questions[0]?.nature} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="type" />
                      <Value values={questions[0]?.type} />
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
                      <Value values={formatDate(questions[0]?.createdAt)} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Label label="status" />
                      <Value values={questions[0]?.status} />
                    </Stack>
                  </Stack>
                </ElevatedSectionWrapper>
              </Stack>
            </Stack>
          </Stack>
        </form>
      )}
    </Container>
  );
};

export default ManageQuestionPage;
