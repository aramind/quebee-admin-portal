import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Stack } from "@mui/material";

import Question from "./Question";
import Choices from "./Choices";

// const QUESTION_SEC_PROP = ["20%"]
const QuestionSection = ({ control, defaultValues }) => {
  return (
    <ElevatedSectionWrapper fullW>
      <Stack>
        <Question control={control} />
        <Choices control={control} defaultValues={defaultValues} />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default QuestionSection;
