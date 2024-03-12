import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Stack } from "@mui/material";

import Question from "./Question";
import Choices from "./Choices";

// const QUESTION_SEC_PROP = ["20%"]
const QuestionSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullW>
      <Stack spacing={0.5}>
        <Question control={control} />
        <Choices control={control} />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default QuestionSection;
