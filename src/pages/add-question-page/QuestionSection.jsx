import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Box, Button, Stack, TextField } from "@mui/material";
import QuestionFormLabel from "./QuestionFormLabel";
import { Controller } from "react-hook-form";
import Question from "./Question";
import Choices from "./Choices";
import Choices2 from "./Choices2";
import Choices3 from "./Choices3";

// const QUESTION_SEC_PROP = ["20%"]
const QuestionSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullW>
      <Stack spacing={0.5}>
        <Question control={control} />
        <Choices3 control={control} />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default QuestionSection;
