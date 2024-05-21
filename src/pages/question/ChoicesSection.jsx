import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import { Controller } from "react-hook-form";
import ChoicesLabel from "../add-question-page/ChoicesLabel";

const choices = ["A", "B", "C", "D"];

const ChoicesSection = ({ control, defaultValues }) => {
  return (
    <Controller
      name="correctAnswer"
      render={({ field }) => (
        <Stack height="100%">
          <RadioGroup
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            sx={{ ml: 2 }}
          >
            {choices.map((choice, index) => (
              <Stack direction="row" spacing={1.5} mt={1} key={index}>
                <FormControlLabel
                  key={choice}
                  value={choice}
                  control={<Radio />}
                  label={<ChoicesLabel label={choice} fullH />}
                />
                <Controller
                  name={choice}
                  render={({ field }) => (
                    <TextField fullWidth {...field} multiline minRows={2} />
                  )}
                />
                <Stack
                  sx={{
                    width: "135px",
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

export default ChoicesSection;
