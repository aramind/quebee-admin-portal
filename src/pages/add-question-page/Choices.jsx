import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import { Controller } from "react-hook-form";
import ChoicesLabel from "./ChoicesLabel";

// const choices = ["choice1", "choice2", "choice3", "choice4"];
const choices = ["A", "B", "C", "D"];

const Choices = ({ control, defaultValues }) => {
  return (
    <Controller
      name="correctAnswer"
      control={control}
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
              <Stack direction="row" spacing={1.5} mt={1}>
                <FormControlLabel
                  key={choice}
                  value={choice}
                  control={<Radio />}
                  label={<ChoicesLabel label={choice} fullH />}
                />
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
                <Stack
                  sx={{
                    width: "150px",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outlined" sx={{ height: 1 }}>
                    Clear
                  </Button>
                </Stack>
              </Stack>
            ))}
          </RadioGroup>
        </Stack>
      )}
    />
  );
};

export default Choices;
