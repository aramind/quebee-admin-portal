import {
  Button,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import { Controller } from "react-hook-form";

const choices = ["A", "B", "C", "D"];

const ChoiceLabel = ({ label, fullW, fullH }) => {
  return (
    <InputLabel
      htmlFor="question-form-label"
      className="centered-content"
      sx={{
        height: fullH && "100%",
        width: fullW ? "100%" : "51px",
        ...localStyles.choiceLabel,
      }}
    >
      {label?.toUpperCase()}.
    </InputLabel>
  );
};

const ChoicesSection = () => {
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
                  control={<Radio checked={choice === field.value} />}
                  label={<ChoiceLabel label={choice} fullH />}
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
                  <Button variant="outlined" sx={{ height: 1 }} disabled>
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

const localStyles = {
  choiceLabel: {
    display: "flex",
    justifyContent: { xs: "start", md: "center" },
    alignItems: "center",
    fontSize: "2rem",
    color: "primary.main",
  },
};
