import React, { Fragment } from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import Label from "./Label";
import Value from "./Value";

const QuestionAndChoicesSection = ({ questions, questionIndex }) => {
  return (
    <ElevatedSectionWrapper fullW={true}>
      <Stack spacing={1}>
        <Label label="question" />
        <Value values={questions[questionIndex]?.question} />
        <RadioGroup>
          {questions &&
            questions[questionIndex]?.choices?.map((choice) => {
              return (
                <Fragment key={choice}>
                  <FormControlLabel
                    value={choice.value}
                    control={<Radio />}
                    label={choice.value}
                    checked={choice.isCorrect}
                  />
                </Fragment>
              );
            })}
        </RadioGroup>
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default QuestionAndChoicesSection;
