import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Controller } from "react-hook-form";
import ChoicesLabel from "./ChoicesLabel";
import { getKeyOfCorrectAnswer } from "../../utils/getKeyOfCorrectAnswer";

// const choices = ["choice1", "choice2", "choice3", "choice4"];
const choices = ["A", "B", "C", "D"];

const Choices = ({ control, defaultValues }) => {
  console.log(getKeyOfCorrectAnswer(defaultValues));
  return (
    <Controller
      name="correctAnswer"
      control={control}
      // defaultValue={getKeyOfCorrectAnswer(defaultValues)}
      // defaultValue={defaultValues?.correctAnswer}
      render={({ field }) => (
        <Stack height="100%">
          <RadioGroup
            aria-labelledby="radio-group"
            value={field.value}
            // value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            sx={{ ml: 2 }}
          >
            {choices.map((choice, index) => (
              <FormControlLabel
                key={choice}
                value={choice}
                control={<Radio />}
                label={
                  <>
                    <Stack
                      width="100%"
                      direction={{ xs: "column", md: "row" }}
                      spacing={1.5}
                      justifyContent={{ xs: "start" }}
                    >
                      <Box>
                        <ChoicesLabel label={choice} fullH />
                      </Box>
                      <Stack flex={1}>
                        <Controller
                          control={control}
                          // name={`choices[${choice}]`}
                          name={choice}
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              {...field}
                              multiline
                              // onBlur={field.onBlur}
                            />
                          )}
                        />
                      </Stack>
                      <Stack
                        sx={{
                          width: "120px",
                          justifyContent: "center",
                        }}
                      >
                        <Button variant="outlined" sx={{ height: 1 }}>
                          Clear
                        </Button>
                      </Stack>
                    </Stack>
                  </>
                }
              />
            ))}
          </RadioGroup>
        </Stack>
      )}
    />
  );
};

export default Choices;
