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
        <Stack
          direction={{ xs: "column", md: "column" }}
          spacing={1.5}
          height="100%"
          // className="outlined"
        >
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
                    <Stack
                      width="100%"
                      direction="row"
                      spacing={1.5}
                      // className="outlined"
                    >
                      <Box>
                        <ChoicesLabel label={choice} fullW fullH />
                      </Box>
                      <Controller
                        control={control}
                        // name={`choices.${choice}`}
                        name={choice}
                        render={({ field }) => (
                          <div className="choice-container">
                            <TextField
                              fullWidth
                              {...field}
                              multiline
                              onBlur={field.onBlur}
                              sx={{ pr: 1.5 }}
                            />
                            <Stack
                              // className="outlined2"
                              sx={{
                                width: "135px",
                                justifyContent: "center",
                              }}
                            >
                              <Button variant="outlined" sx={{ height: 1 }}>
                                Remove
                              </Button>
                            </Stack>
                          </div>
                        )}
                      />
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
