import { Slider, Typography } from "@mui/material";
import React from "react";
import constants from "../../configs/constants";

const { STEP_DIFFICULTY, MIN_DIFFICULTY, MAX_DIFFICULTY, MARKS_DIFFICULTY } =
  constants.difficultySliderConstants;

const DifficultySlider = ({ field }) => {
  const getLabel = (mark) => (
    <Typography
      fontWeight={field.value === mark?.value ? "bold" : "normal"}
      color={field.value === mark?.value ? "primary.dark" : "font.gray"}
      fontSize={{
        xs: field.value === mark?.value ? "0.8rem" : "0.7rem",
        md: field.value === mark?.value ? "1rem" : "0.8rem",
      }}
      sx={localStyle?.label}
    >
      {mark?.label}
    </Typography>
  );

  return (
    <Slider
      aria-label="Difficulty"
      value={field.value}
      onChange={(e, newValue) => field.onChange(newValue)}
      //   orientation="vertical"
      valueLabelDisplay="auto"
      shiftStep={STEP_DIFFICULTY}
      min={MIN_DIFFICULTY}
      max={MAX_DIFFICULTY}
      marks={MARKS_DIFFICULTY.map((mark) => ({
        ...mark,
        label: getLabel(mark),
      }))}
      sx={localStyle?.slider}
    />
  );
};

export default DifficultySlider;

// localStyle
const localStyle = {
  slider: {
    "& .MuiSlider-track": {
      backgroundColor: "primary.semi",
      border: 0,
      height: "0.2rem", // Set the thickness of the track
    },
    "& .MuiSlider-rail": {
      backgroundColor: "info.light", // Set the color of the rail
      height: "0.2rem", // Set the thickness of the rail
    },
    "& .MuiSlider-thumb": {
      //   backgroundColor: "transparent",
      width: "1.2rem",
      height: "1.2rem",
    },
  },
  label: {
    fontFamily: "Abel",
  },
};
