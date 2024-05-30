import { Button, InputLabel, Stack, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const QSection = () => {
  const { errors } = useFormContext();

  return (
    <Stack
      direction={{ xs: "column", md: "column" }}
      spacing={1.5}
      height="100%"
    >
      <InputLabel
        sx={{
          fontWeight: "bold",
          color: errors?.["question"] ? red[700] : "primary.main",
        }}
      >
        QUESTION (Required):
      </InputLabel>
      <Stack flex={1} direction="row" spacing={1.5}>
        <Controller
          name="question"
          render={({ field }) => (
            <TextField
              fullWidth
              {...field}
              multiline
              onBlur={field.onBlur}
              minRows={3}
              error={!!errors?.["question"]}
            />
          )}
        />

        <Stack width={{ xs: "100%", md: "120px" }} justifyContent="center">
          <Button variant="outlined" sx={{ height: 1 }} disabled>
            Clear
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QSection;
