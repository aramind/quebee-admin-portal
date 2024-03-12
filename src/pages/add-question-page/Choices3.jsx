import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import QuestionFormLabel from "./QuestionFormLabel";

// const choices = ["choice1", "choice2", "choice3", "choice4"];
const choices = ["A", "B", "C", "D"];
const Choices3 = ({ control }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "column" }}
      spacing={1.5}
      height="100%"
      className="outlined"
    >
      <Controller
        name="correctAnswer"
        control={control}
        defaultValue={choices[0]}
        render={({ field }) => (
          <RadioGroup
            aria-labelledby="radio-group"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {choices.map((choice, index) => (
              <FormControlLabel
                key={choice}
                value={choice}
                control={<Radio />}
                label={
                  <>
                    <Controller
                      control={control}
                      // name={`choices.${choice}`}
                      name={choice}
                      render={({ field }) => (
                        <>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            height="100%"
                            flex={1}
                            className="outlined2"
                          >
                            <Stack
                              flex={0.1}
                              minWidth="50px"
                              maxWidth="100px"
                              justifyContent="center"
                              direction="row"
                            >
                              <QuestionFormLabel fullW label={choice} />
                            </Stack>
                            <Stack flex={1} width="100%">
                              <TextField
                                fullWidth
                                {...field}
                                multiline
                                onBlur={field.onBlur}
                              />
                            </Stack>
                            <Stack
                              flex={0.1}
                              // className="outlined2"
                              minWidth="50px"
                              maxWidth="100px"
                              justifyContent="center"
                            >
                              <Button variant="outlined" sx={{ height: 1 }}>
                                Remove
                              </Button>
                            </Stack>
                          </Stack>
                        </>
                      )}
                    />
                  </>
                }
              />
            ))}
          </RadioGroup>
        )}
      />
    </Stack>
  );
};

export default Choices3;
