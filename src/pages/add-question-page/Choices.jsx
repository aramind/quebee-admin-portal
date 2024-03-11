import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import QuestionFormLabel from "./QuestionFormLabel";
import { Controller } from "react-hook-form";

const Choices = ({ control }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "column" }}
      spacing={1.5}
      height="100%"
    >
      {[1, 2, 3, 4].map((choice, index) => (
        <Stack
          key={index}
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          height="100%"
        >
          <Stack
            flex={0.1}
            minWidth="50px"
            maxWidth="100px"
            justifyContent="center"
          >
            <QuestionFormLabel fullW label={`Choice ${choice}`} />
          </Stack>
          <Stack flex={1} width="100%">
            <Controller
              control={control}
              name={`choices[${index - 1}]`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  placeholder={`Type here option ${choice}...`}
                  multiline
                  onBlur={field.onBlur}
                />
              )}
            />
          </Stack>
          <Stack
            flex={1}
            minWidth="50px"
            maxWidth="100px"
            justifyContent="center"
          >
            <Button variant="outlined">Remove</Button>
          </Stack>
        </Stack>
      ))}
      {/* RG */}
      <Stack flex={1} width="100%">
        <Controller
          control={control}
          name="correctAnswer"
          render={({ field }) => (
            <RadioGroup
              aria-label="correctAnswer"
              name="correctAnswer"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              row
            >
              {[1, 2, 3, 4].map((index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio />}
                  label={`Option ${index}`}
                />
              ))}
            </RadioGroup>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default Choices;
