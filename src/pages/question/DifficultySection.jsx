import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormInputLabel from "../../components/form/FormInputLabel";
import { Controller } from "react-hook-form";
import { Box } from "@mui/material";
import DifficultySlider from "../../components/form/DifficultySlider";

const DifficultySection = ({ control }) => {
  return (
    <ElevatedSectionWrapper>
      <FormInputLabel label="difficulty (required)" />
      <Controller
        id="difficulty-slider"
        name="difficulty"
        // control={control}
        defaultValue={3}
        render={({ field }) => (
          <Box
            sx={{ width: "100%", p: { xs: 1, md: 2 }, pr: { xs: 3, md: 4 } }}
          >
            <DifficultySlider field={field} />
          </Box>
        )}
      />
    </ElevatedSectionWrapper>
  );
};

export default DifficultySection;
