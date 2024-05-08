import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import QuestionFormLabel from "./QuestionFormLabel";
import { Controller } from "react-hook-form";

const Question = ({ control }) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} height="100%">
      <Stack width="99px" justifyContent="center">
        <QuestionFormLabel fullW label="question" />
      </Stack>
      <Stack flex={1}>
        <Controller
          control={control}
          name="question"
          render={({ field }) => (
            <TextField fullWidth {...field} multiline onBlur={field.onBlur} />
          )}
        />
      </Stack>
      <Stack
        // className="outlined2"
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
  );
};

export default Question;
