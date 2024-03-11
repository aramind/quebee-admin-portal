import { Button, Radio, Stack, TextField } from "@mui/material";
import React from "react";
import QuestionFormLabel from "./QuestionFormLabel";
import { Controller } from "react-hook-form";

const Choices2 = ({ control }) => {
  return (
    <Stack direction="column" spacing={1.5} height="100%">
      {[1, 2, 3, 4].map((index) => (
        <Stack key={index} direction="row" spacing={1.5} alignItems="center">
          <QuestionFormLabel
            label={`Option ${index}`}
            fullW
            fullH
            textAlign="center"
          />
          <Controller
            control={control}
            name={`choices.choice${index}`}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                placeholder={`Type here for option ${index}...`}
                multiline
                onBlur={field.onBlur}
              />
            )}
          />
          <Radio
            name="correctAnswer"
            value={`choice${index}`}
            inputProps={{ "aria-label": `Option ${index}` }}
          />
          <Button variant="outlined" sx={{ height: 1 }}>
            Remove
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};

export default Choices2;
