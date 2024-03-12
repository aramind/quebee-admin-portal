import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import { Controller } from "react-hook-form";
import { red } from "@mui/material/colors";
import ChoicesLabel from "./ChoicesLabel";

// const choices = ["choice1", "choice2", "choice3", "choice4"];
const choices = ["A", "B", "C", "D"];

const Choices = ({ control }) => {
  return (
    <Controller
      name="correctAnswer"
      control={control}
      defaultValue={choices[0]}
      render={({ field }) => (
        <Stack height="100%">
          <RadioGroup
            aria-labelledby="radio-group"
            value={field.value}
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
                          // name={`choices.${choice}`}
                          name={choice}
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              {...field}
                              multiline
                              onBlur={field.onBlur}
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
